import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserTypeForm from '../components/Dashboard/UserTypeForm';
import ResumeUpload from '../components/Dashboard/ResumeUpload';
import AnalysisResults from '../components/Dashboard/AnalysisResults';
import WelcomePanel from '../components/Dashboard/WelcomePanel';

export default function Dashboard() {
  const location = useLocation();
  const [step, setStep] = useState(0); // Start with step 0 (WelcomePanel)
  const [userInfo, setUserInfo] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    console.log('Dashboard mounted, location.state:', location.state);
    // If coming from registration, stay on welcome panel (step 0),
    // otherwise skip welcome panel to step 1.
    if (location.state?.fromRegistration) {
      setStep(0); 
      console.log('From registration detected, setting step 0 (WelcomePanel)');
    } else {
      setStep(1);
      console.log('Not from registration, skipping welcome to step 1');
    }
  }, [location]);

  // Optional: Add keyboard or component debug info for safety
  console.log('Dashboard render - step:', step, 'userInfo:', userInfo, 'analysis:', analysis);

  const handleUserTypeComplete = (info) => {
    setUserInfo(info);
    setStep(2); // Move to ResumeUpload
  };

  const handleAnalysisComplete = (result) => {
    setAnalysis(result);
    setStep(3); // Move to AnalysisResults
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
    setStep(1); // Go back to UserTypeForm
  };

  // Render the corresponding component per step with debug fallback
  return (
    <div className="container mx-auto px-4 py-8 min-h-[400px]">
      {step === 0 && (
        <WelcomePanel onStart={() => setStep(1)} />
      )}
      {step === 1 && (
        <UserTypeForm onComplete={handleUserTypeComplete} />
      )}
      {step === 2 && userInfo ? (
        <ResumeUpload 
          userInfo={userInfo}
          onAnalysisComplete={handleAnalysisComplete}
        />
      ) : step === 2 ? (
        <p className="text-center text-red-600">Loading user information...</p>
      ) : null}
      {step === 3 && analysis ? (
        <AnalysisResults 
          analysis={analysis}
          onNewAnalysis={handleNewAnalysis}
        />
      ) : step === 3 ? (
        <p className="text-center text-red-600">No analysis data available.</p>
      ) : null}
    </div>
  );
}

