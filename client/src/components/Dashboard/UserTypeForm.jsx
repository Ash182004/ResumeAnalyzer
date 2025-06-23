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
    <div className="max-w-md mx-auto p-8 mt-12 bg-[#FFFAFF] dark:bg-[#0A1045] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-2xl font-bold text-center text-[#0A1045] dark:text-white mb-8">
        Tell Us About Yourself
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Type */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-3">
            I am a:
          </label>
          <div className="space-y-3">
            <label className="flex items-center text-gray-800 dark:text-gray-100">
              <input
                type="radio"
                name="userType"
                value="student"
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
                className="mr-3 accent-sky-500"
              />
              Student
            </label>
            <label className="flex items-center text-gray-800 dark:text-gray-100">
              <input
                type="radio"
                name="userType"
                value="professional"
                checked={userType === 'professional'}
                onChange={() => setUserType('professional')}
                className="mr-3 accent-sky-500"
              />
              Working Professional
            </label>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-3">
            Experience Level:
          </label>
          <div className="space-y-3">
            <label className="flex items-center text-gray-800 dark:text-gray-100">
              <input
                type="radio"
                name="experienceLevel"
                value="fresher"
                checked={experienceLevel === 'fresher'}
                onChange={() => setExperienceLevel('fresher')}
                className="mr-3 accent-sky-500"
              />
              Fresher (0-1 years)
            </label>
            <label className="flex items-center text-gray-800 dark:text-gray-100">
              <input
                type="radio"
                name="experienceLevel"
                value="experienced"
                checked={experienceLevel === 'experienced'}
                onChange={() => setExperienceLevel('experienced')}
                className="mr-3 accent-sky-500"
              />
              Experienced (1+ years)
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!userType || !experienceLevel}
          className={`w-full py-3 px-4 rounded-md text-sm font-semibold transition duration-200
            ${userType && experienceLevel
              ? 'bg-sky-500 hover:bg-sky-600 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'}`}
        >
          Continue
        </button>
      </form>
      
    </div>
  );
}
