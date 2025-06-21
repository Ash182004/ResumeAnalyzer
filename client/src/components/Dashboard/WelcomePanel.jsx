// src/components/Dashboard/WelcomePanel.jsx
export default function WelcomePanel({ onStart }) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        Get started by analyzing your resume to discover your strengths and ideal job matches.
      </p>
      <button
        onClick={onStart}
        className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200"
      >
        Start Resume Analysis
      </button>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Upload Resume" 
          icon="📄"
          description="Get personalized feedback on your resume"
        />
        <DashboardCard 
          title="View Analysis" 
          icon="🔍"
          description="See your strengths and weaknesses"
        />
        <DashboardCard 
          title="Job Matches" 
          icon="💼"
          description="Discover roles that fit your profile"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, icon, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}