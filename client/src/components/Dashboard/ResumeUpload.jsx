import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { analyzeResume } from '../../utils/api';
import { PDFDocument } from 'pdf-lib';

export default function ResumeUpload({ userInfo, onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ['application/pdf', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Reset previous state
    setError('');
    setProgress(0);

    // Validate file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Only PDF and TXT files are allowed');
      resetFileInput();
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 5MB');
      resetFileInput();
      return;
    }

    // For text files, just set the file
    if (selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      return;
    }

    // For PDF files, validate
    validatePdf(selectedFile)
      .then(() => setFile(selectedFile))
      .catch((err) => {
        console.error('PDF validation error:', err);
        setError('Invalid PDF file. Please try another file.');
        resetFileInput();
      });
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFile(null);
  };

  const validatePdf = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.onload = async () => {
        try {
          const typedArray = new Uint8Array(fileReader.result);
          await PDFDocument.load(typedArray);
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      
      fileReader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting with:', {
    file: file ? {
      name: file.name,
      type: file.type,
      size: file.size
    } : null,
    userInfo,
    hasToken: !!user?.token,
    token: user?.token ? '***' + user.token.slice(-4) : null
  });
    if (!file || !userInfo || !user?.token) {
      setError('Please complete all required steps');
      return;
    }

    setIsLoading(true);
    setError('');
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userType', userInfo.userType);
      formData.append('experienceLevel', userInfo.experienceLevel);

      const config = {
        headers: {
         
          'Content-Type': 'multipart/form-data',
          //  'Authorization': `Bearer ${user.token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      };

      const result = await analyzeResume(formData, config);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(result.data);
      } else {
        navigate('/analysis-results', { 
          state: { 
            analysis: result.data,
            resumeName: file.name 
          } 
        });
      }
      
    } catch (err) {
      let errorMessage = 'Analysis failed. Please try again.';
       console.error('Full error details:', {
    message: err.message,
    code: err.code,
    response: err.response ? {
      status: err.response.status,
      data: err.response.data,
      headers: err.response.headers
    } : null,
    request: err.request,
    config: err.config
  });
      
      if (err.response) {
        if (err.response.status === 413) {
          errorMessage = 'File too large. Maximum 5MB allowed.';
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Upload Your Resume</h2>
        <p className="text-gray-600">Get personalized feedback on your resume</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Resume File
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF or TXT (MAX. 5MB)
                </p>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pdf,.txt" 
                onChange={handleFileChange}
                className="hidden" 
                required
              />
            </label>
          </div>
          {file && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              {file.name} ({Math.round(file.size / 1024)} KB)
            </div>
          )}
        </div>

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-md transition-colors ${
            !file || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </form>

      <div className="mt-6 text-xs text-gray-500">
        <p>Your resume will be analyzed for:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Key skills and qualifications</li>
          <li>Experience level assessment</li>
          <li>Suggested improvements</li>
          <li>Job role recommendations</li>
        </ul>
      </div>
    </div>
  );
}