// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, MessageCircle, Calendar, User, Heart, Meh, Frown, LogOut, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';
import ApiRequest from '../lib/ApiRequest';

// Placeholder for actual authentication and data fetching logic
const isAuthenticated = true; // Assume user is logged in for now

interface FeedbackItem {
  id: number;
  timestamp: string; // ISO 8601 string from backend
  sender: string;
  context: string;
  sentiment: string; // Includes emoji from backend
  summary: string;
  constructiveCriticism: string;
}

// Function to format ISO date string to a more readable format
const formatTimestamp = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

// Function to get sentiment icon and color
const getSentimentStyle = (sentimentString: string) => {
  const lowerSentiment = sentimentString.toLowerCase();
  if (lowerSentiment.includes('positif')) {
    return { 
      icon: <Heart className="w-5 h-5" />, 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    };
  }
  if (lowerSentiment.includes('negatif')) {
    return { 
      icon: <Frown className="w-5 h-5" />, 
      bgColor: 'bg-red-100', 
      textColor: 'text-red-700',
      borderColor: 'border-red-200'
    };
  }
  return { 
    icon: <Meh className="w-5 h-5" />, 
    bgColor: 'bg-yellow-100', 
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  };
};

// Updated API function to fetch data from the backend
const fetchFeedbacksForUser = async (user: string): Promise<FeedbackItem[]> => {
  try {
    console.log(`Fetching feedback for ${user} from backend...`);
    const data = await ApiRequest.feedbackForUser(user) as FeedbackItem[];
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching feedbacks:", err);
    throw new Error("Failed to fetch feedbacks. Please try again later.");
  }
};

const DashboardPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  // Function to copy feedback link
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      setError(null);
      const userData = JSON.parse(localStorage.getItem('userData') || '{"username": "iganarendra"}'); // Default untuk preview
      const username = userData.username;
      if (username) {
        fetchFeedbacksForUser(username)
          .then(data => {
            setFeedbacks(data);
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Failed to fetch feedbacks:", err);
            setError(err.message || "Duh, gagal ngambil feedback nih. Coba lagi nanti ya.");
            setIsLoading(false);
          });
      } else {
        setError("Username tidak ditemukan. Silakan login kembali.");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Jujurly Dashboard</h1>
            <p className="text-gray-600 mb-6">Waduh, kayaknya kamu belum login nih. Login dulu ya!</p>
            <button 
              onClick={() => console.log('Navigate to login')} // Mock untuk preview
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userData = JSON.parse(localStorage.getItem('userData') || '{}'); // Default untuk preview
  const username = userData.username;
  const feedbackLink = `https://jujur.ly/ke/${username}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-blue-500">
                Dashboard {username}
              </h1>
              <p className="text-gray-600 text-sm mt-1">Kelola feedback kamu dengan mudah</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-3xl shadow-xl p-8 mb-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Bagikan Link Feedback Kamu</h2>
            <p className="text-blue-100 mb-6">Kirim link ini ke teman, kolega, atau siapa saja untuk dapat feedback jujur!</p>
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-left">
                  <code className="text-white text-sm md:text-base font-mono break-all">
                    {feedbackLink}
                  </code>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyLink(feedbackLink)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
                  >
                    {copiedLink ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <a
                    href={feedbackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            {copiedLink && (
              <p className="text-green-200 text-sm mt-3">
                ✨ Link berhasil disalin!
              </p>
            )}
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-3xl shadow-xl p-8 my-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <MessageCircle className="w-7 h-7 text-blue-500" />
            Feedback Untuk Kamu
          </h2>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="bg-gray-200 rounded-full w-12 h-12 mx-auto mb-4"></div>
                <p className="text-gray-500">Lagi ngambil feedback, sabar ya...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <p>{error}</p>
              </div>
            </div>
          )}
          
          {!isLoading && !error && feedbacks.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Belum ada feedback nih</p>
              <p className="text-gray-400">Coba sebarin link kamu ke teman-teman!</p>
            </div>
          )}
          
          {!isLoading && !error && feedbacks.length > 0 && (
            <div className="space-y-6">
              {feedbacks.map(fb => {
                const sentimentStyle = getSentimentStyle(fb.sentiment);
                return (
                  <div key={fb.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {fb.sender || 'Anonim'}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatTimestamp(fb.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${sentimentStyle.bgColor} ${sentimentStyle.textColor} border ${sentimentStyle.borderColor}`}>
                        {sentimentStyle.icon}
                        <span className="text-sm font-medium">{fb.sentiment}</span>
                      </div>
                    </div>

                    {/* Context */}
                    {fb.context && fb.context !== '-' && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Konteks:</p>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                          {fb.context}
                        </p>
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📝 Ringkasan Feedback</h4>
                        <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-200 leading-relaxed">
                          {fb.summary}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">💡 Saran Konstruktif</h4>
                        <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-200 leading-relaxed">
                          {fb.constructiveCriticism}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default DashboardPage;