import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full 
        bg-white dark:bg-[#0A1045] border-4 border-[#0A1045] dark:border-transparent 
        flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight leading-tight">
          <span className="text-[#0A1045] dark:text-white">Resume </span>
          <span className="text-sky-500 dark:text-sky-400">Analyzer</span>
        </h1>

        {isAuthenticated ? (
          <Link 
            to="/dashboard"
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md transition-all duration-300"
          >
            🚀 Go to Dashboard
          </Link>
        ) : (
          <div className="flex flex-col gap-2">
            <Link 
              to="/login"
              className="bg-white dark:bg-white/10 text-[#0A1045] dark:text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
