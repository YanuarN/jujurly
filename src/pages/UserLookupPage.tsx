// src/pages/UserLookupPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Loader2, Send } from 'lucide-react';
import Button from '../components/Button';
import Footer from '../components/Footer';

const UserLookupPage: React.FC = () => {
  const [targetUser, setTargetUser] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Hanya set error jika benar-benar ada state userNotFound dari navigasi sebelumnya
    if (location.state?.userNotFound) {
      setError('Pengguna tidak ditemukan. Silakan coba lagi dengan username atau ID yang benar.');
      // Clear location state setelah menampilkan error
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!targetUser.trim()) {
      setError('Username atau ID pengguna jangan lupa diisi ya.');
      return;
    }
    
    setError(''); // Clear error sebelum submit
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/user/lookup/${targetUser.trim()}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.user_identifier) {
          navigate(`/ke/${data.user_identifier}`);
        } else {
          setError("Gagal mendapatkan link feedback untuk pengguna ini.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Pengguna tidak ditemukan atau terjadi kesalahan.");
      }
    } catch (err) {
      console.error("User lookup error:", err);
      setError('Terjadi kesalahan saat menghubungi server. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetUser(e.target.value);
    // Clear error ketika user mulai mengetik
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#88d5ec] via-[#efefeb] to-[#48f6ad] flex flex-col">
      {/* Header */}
      <header className="text-center pt-16 pb-10">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-blue-500 mb-4">
          Jujurly
        </h1>
        <p className="text-gray-600 text-lg font-medium">
          Feedback jujur, biar makin mujur.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 w-full flex-grow">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16 border border-gray-100 backdrop-blur-sm bg-opacity-80">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-full mb-4">
              <User className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Mau Kasih Feedback ke Siapa Nih?
            </h1>
            <p className="text-gray-600 text-center">
              Tulis username atau ID unik orang yang mau kamu kasih feedback.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message - hanya tampil jika ada error */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="targetUser" className="block text-gray-700 font-medium">
                Username atau ID Pengguna
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="targetUser"
                  value={targetUser}
                  onChange={handleInputChange}
                  placeholder="cth: iganarendra atau user123abc"
                  disabled={isLoading}
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                icon={isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                text={isLoading ? 'Mencari...' : 'Lanjut Kasih Feedback'}
                disabled={isLoading}
                className="w-full justify-center"
              />
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-center text-sm">
              Pastikan kamu tau username atau ID yang bener ya, biar feedbacknya nyampe ke orang yang tepat.
            </p>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default UserLookupPage;