export default function WelcomePanel({ onStart }) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] dark:bg-[#0A1045] transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          Welcome to Your Dashboard
        </h1>

        <p className="text-lg md:text-xl leading-relaxed font-semibold text-gray-800 dark:text-gray-200 mb-10">
          🚀 Get started by analyzing your resume to discover your strengths and ideal job matches.
        </p>

        <button
          onClick={onStart}
          className="bg-[#2a3ce0] hover:bg-[#1c2a6d] text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200 shadow-lg"
        >
          Start Resume Analysis
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
    <div className="bg-white dark:bg-[#1b224e] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-all duration-300">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
