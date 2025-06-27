// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './ForgotPasswordPage.css'; // You'll create this CSS file next

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

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
        setEmail(''); // Clear the input field
      } else {
        // Even if backend always returns 200 for this endpoint for security,
        // handle potential network errors or unexpected backend responses.
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
    <div className="forgot-password-page-container">
      <div className="forgot-password-form-container">
        <h1>Lupa Password?</h1>
        <p className="subtitle">Gak apa-apa, kita bantu reset password kamu.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Kamu</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>
        <p className="back-to-login-text">
          Inget passwordnya? <Link to="/login">Balik ke Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
