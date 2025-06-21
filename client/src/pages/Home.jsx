// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Resume Analyzer</h1>
      
      {isAuthenticated ? (
        <Link 
          to="/dashboard"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link 
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
          <Link 
            to="/register"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}