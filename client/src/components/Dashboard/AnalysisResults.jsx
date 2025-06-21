// client/src/components/Dashboard/AnalysisResults.jsx
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function AnalysisResults({ analysis, onNewAnalysis }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
      @media print {
        body {
          color: black;
          background: white;
        }
        .no-print {
          display: none;
        }
      }
    `,
    documentTitle: 'Resume Analysis Report',
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="no-print flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-light-blue-600">Your Resume Analysis</h2>
        <button
          onClick={handlePrint}
          className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Save as PDF
        </button>
      </div>

      <div ref={componentRef} className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-light-blue-700 mb-3">Summary</h3>
          <p className="text-gray-700">{analysis.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-light-blue-700 mb-3">Strengths</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {analysis.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-light-blue-700 mb-3">Areas for Improvement</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {analysis.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-light-blue-700 mb-3">Recommended Job Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.jobRoles.map((role, index) => (
              <div key={index} className="bg-light-blue-100 p-4 rounded-lg">
                <h4 className="font-medium text-light-blue-800">{role}</h4>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-light-blue-700 mb-3">Sentiment Analysis</h3>
          <p className="text-gray-700">
            Your resume has a {analysis.sentiment.toLowerCase()} tone. {
              analysis.sentiment === 'POSITIVE' 
                ? 'Great job highlighting your achievements!'
                : 'Consider adding more positive action words to strengthen your resume.'
            }
          </p>
        </div>
      </div>

      <div className="no-print mt-8 text-center">
        <button
          onClick={onNewAnalysis}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
}