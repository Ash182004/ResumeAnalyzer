import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#f0f4ff] to-[#e4ebff] dark:from-[#0A1045] dark:to-[#1b224e] transition-all duration-500">
      <div className="w-full max-w-lg p-8 sm:p-10 bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-[#0A1045] dark:text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign in to continue your journey with{' '}
          <span className="font-semibold text-sky-600 dark:text-sky-400">ResumeAnalyzer</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-300/20 text-red-700 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1b224e] text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1b224e] text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              required
              minLength="6"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-sky-600 dark:text-sky-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-white text-sm transition ${
              isLoading
                ? 'bg-sky-400 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-700 shadow-md'
            }`}
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-sky-600 dark:text-sky-400 hover:underline"
            state={{ from: location.state?.from }}
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
