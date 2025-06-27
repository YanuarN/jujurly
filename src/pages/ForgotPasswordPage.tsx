// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email) {
      setError('Email jangan lupa diisi ya.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format emailnya kayaknya salah deh.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Permintaan reset password telah dikirim. Silakan cek email kamu.');
        setEmail('');
      } else {
        setError(data.message || 'Gagal mengirim permintaan reset password. Coba lagi ya.');
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-500 mb-2">Lupa Password?</h1>
        <p className="text-gray-500 mb-6 text-center">Gak apa-apa, kita bantu reset password kamu.</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Kamu
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          {message && (
            <p className="text-green-500 text-sm mb-2">{message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-500">
          Inget passwordnya?{' '}
          <Link to="/login" className="text-indigo-500 hover:underline font-medium">
            Balik ke Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
