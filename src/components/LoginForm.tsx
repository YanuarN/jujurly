// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ApiRequest from '../lib/ApiRequest';


const LoginForm: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!emailOrUsername || !password) {
      setError('Email/Username dan password tidak boleh kosong.');
      setLoading(false);
      return;
    }

    try {
      const data = await ApiRequest.loginUser({ emailOrUsername, password });

      setLoading(false);

      console.log('Login successful:', data);
      localStorage.setItem('userData', JSON.stringify(data));
      // Jika "Ingat saya" dicentang, bisa simpan token lebih lama atau sesuai kebutuhan
      // if (rememberMe) { /* logic to save token longer */ }
      navigate('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) { // Tangkap error yang dilempar dari ApiRequest
      setLoading(false);
      const errorMessage = err.message || 'Terjadi kesalahan. Coba lagi nanti ya.';
      setError(errorMessage);
      console.error('Login error:', err);
    }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Ikon email */}
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.5a2.5 2.5 0 005 0V12" />
            </svg>
          </div>
          <input
            type="email"
            id="email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="nama@email.com"
            required
            className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Ikon kunci */}
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm0-11V7a4 4 0 018 0v2" />
            </svg>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            required
            className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
               onClick={() => setShowPassword(!showPassword)}>
            {/* Ikon mata untuk toggle password */}
            {showPassword ? (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.025m3.295-4.417L10.5 7.252M2.25 12h1.5m10.25 0h1.5M16.05 7.95l1.405-1.405M6.25 16.25l-1.405 1.405M4.75 4.75l14.5 14.5" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">
          Lupa password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        disabled={loading}
      >
        {loading ? 'Lagi diproses...' : 'Masuk'}
      </button>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-x-0 h-px bg-gray-200"></div>
        <div className="relative bg-white px-4 text-sm text-gray-500">atau</div>
      </div>
    </form>
  );
};

export default LoginForm;