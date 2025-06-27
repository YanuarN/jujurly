// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!emailOrUsername || !password) {
      setError('Email/Username dan password tidak boleh kosong.');
      setLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'; 

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send 'identifier' instead of 'emailOrUsername' to match backend
        body: JSON.stringify({ identifier: emailOrUsername, password }), 
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // In a real app, you would store a token and user info in a global state/context
        // For example, using localStorage (ensure to handle security implications):
        localStorage.setItem('userData', JSON.stringify(data)); 
        // localStorage.setItem('userToken', data.token); // If backend returns a token
        navigate('/dashboard'); 
      } else {
        let errorDisplayMessage = 'Login gagal. Periksa kembali email/username dan password kamu.';
        // Log the raw response status
        console.error(`Login API request failed with status: ${response.status}`);
        try {
          const errorData = await response.json();
          // Log the detailed error from the backend if available
          console.error('Backend error details:', errorData);
          if (errorData && errorData.message) {
            errorDisplayMessage = errorData.message;
          }
        } catch (jsonParseError) {
          // This catch block handles errors if response.json() fails (e.g., empty response or not JSON)
          console.error('Failed to parse backend error response as JSON:', jsonParseError);
          // You could try to get text from the response if JSON parsing fails:
          // try {
          //   const textError = await response.text();
          //   console.error('Backend error response text:', textError);
          //   if (textError) errorDisplayMessage = textError;
          // } catch (textParseError) {
          //   console.error('Failed to get text from backend error response:', textParseError);
          // }
        }
        setError(errorDisplayMessage);
      }
      
    } catch (err) {
      setLoading(false);
      setError('Terjadi kesalahan. Coba lagi nanti ya.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Masuk ke Jujurly</h1>
        <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        <p className="forgot-password-text">
          Lupa password? <Link to="/forgot-password">Reset di sini</Link>
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email atau Username</label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Masukkan email atau username kamu"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password kamu"
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Lagi diproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
