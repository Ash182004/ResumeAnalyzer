// client/src/components/Dashboard/UserTypeForm.jsx
import { useState } from 'react';

export default function UserTypeForm({ onComplete }) {
  const [userType, setUserType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType && experienceLevel) {
      onComplete({ userType, experienceLevel });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-light-blue-600 mb-6">Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-3">I am a:</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="student"
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
                className="mr-2"
              />
              Student
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="professional"
                checked={userType === 'professional'}
                onChange={() => setUserType('professional')}
                className="mr-2"
              />
              Working Professional
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-3">Experience Level:</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="experienceLevel"
                value="fresher"
                checked={experienceLevel === 'fresher'}
                onChange={() => setExperienceLevel('fresher')}
                className="mr-2"
              />
              Fresher (0-1 years)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experienceLevel"
                value="experienced"
                checked={experienceLevel === 'experienced'}
                onChange={() => setExperienceLevel('experienced')}
                className="mr-2"
              />
              Experienced (1+ years)
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!userType || !experienceLevel}
          className={`w-full py-2 px-4 rounded-md transition duration-200 ${
            userType && experienceLevel
              ? 'bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
}