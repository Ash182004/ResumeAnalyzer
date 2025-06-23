import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
   if (darkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]); // ✅ watch for changes

  // Hide on auth pages
  if (!user && ['/login', '/register'].includes(location.pathname)) return null;

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <nav className="bg-[#F0F4F8] dark:bg-[#0A1045] shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-[#0A1045] dark:text-white font-extrabold text-2xl tracking-tight"
          >
            Resume<span className="text-sky-500 dark:text-sky-300">Analyzer</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-[#0A1045] dark:text-white hover:text-sky-600 dark:hover:text-sky-400 px-4 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 text-sm rounded-lg font-semibold shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-[#0A1045] dark:text-white hover:text-sky-600 dark:hover:text-sky-400 px-4 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="text-[#0A1045] dark:text-white hover:text-sky-600 dark:hover:text-sky-400 px-4 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 text-sm rounded-lg font-semibold shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="text-xl px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
