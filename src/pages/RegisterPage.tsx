// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
// import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // This is a placeholder for your own backend email/password registration
      // You would typically send a request to your backend here
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal mendaftar.');
      }
      // Handle successful registration (e.g., redirect to login or dashboard)
      navigate('/dashboard'); 
    } catch (err : any) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Daftar Jujurly</h1>
        <p>Bikin akun buat ngumpulin feedback jujur!</p>
      </header>
      <main className="register-main">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleEmailRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username unik ini bakal keliatan"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@kamu.com"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Daftar dengan Email</button>
        </form>
        
        <p className="login-link">
          Udah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </main>
      <footer className="register-footer">
        <p>&copy; {new Date().getFullYear()} Jujurly</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
