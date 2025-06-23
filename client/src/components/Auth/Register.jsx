import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/dashboard', { state: { fromRegistration: true } });
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#f0f4ff] to-[#e4ebff] dark:from-[#0A1045] dark:to-[#1b224e] transition-all duration-500">
      <div className="w-full max-w-lg p-8 sm:p-10 bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-[#0A1045] dark:text-white">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Get started with{' '}
          <span className="font-semibold text-sky-600 dark:text-sky-400">ResumeAnalyzer</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-300/20 text-red-700 dark:text-red-400 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1c2331] text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1c2331] text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              required
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1c2331] text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white text-sm bg-sky-600 hover:bg-sky-700 shadow-md transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-sky-600 dark:text-sky-400 hover:underline">
            Login
          </a>
        </p>
      </div>
      
    </div>
  );
}
