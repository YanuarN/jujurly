// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Shield, Copy, Check, MessageCircle, Send } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Footer from '../components/Footer';


const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [copiedLink, setCopiedLink] = useState(false);
  const feedbackLink = "https://jujurly.space/ke/username";

  // Placeholder for authentication check. 
  // In a real app, this would check a token, context, or an auth service.
  const isAuthenticated = () => {
    // For now, let's assume the user is not logged in by default.
    // You can change this to true to test the logged-in scenario.
    // e.g., return localStorage.getItem('userToken') !== null;
    return false; 
  };

  const handleCollectFeedbackClick = () => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(feedbackLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
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
      <main className="max-w-4xl mx-auto px-6">
        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
            Mau ngapain nih?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="primary"
              icon={<MessageCircle className="w-6 h-6" />}
              text="Kumpulin Feedback"
              onClick={handleCollectFeedbackClick}
            />
            <Button 
              variant="secondary"
              icon={<Send className="w-6 h-6" />}
              text="Mau Kasih Feedback"
              to="/ke/username"
            />
          </div>
        </div>

        {/* Highlight Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16 border border-gray-100 backdrop-blur-sm bg-opacity-80">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full mb-4">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Platform Honesty as a Service (HaaS) pertama di Indonesia!
            </h3>
          </div>
          
          <p className="text-gray-600 text-center mb-8 text-lg">
            Kalau mau kasih feedback, pastiin kamu punya link unik dari orangnya, atau tau username-nya ya!
          </p>

          {/* Link Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-3 text-center">Format link:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 w-full max-w-md flex items-center">
                <code className="text-blue-600 text-sm md:text-base font-mono truncate">
                  {feedbackLink}
                </code>
              </div>
              <button
                onClick={handleCopyLink}
                className={`flex-shrink-0 p-3 rounded-xl transition-colors duration-200 ${
                  copiedLink 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                title="Copy link"
              >
                {copiedLink ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copiedLink && (
              <p className="text-green-600 text-sm text-center mt-3">
                Link berhasil disalin!
              </p>
            )}
          </div>
        </div>

        <Card/>
      </main>
      
      <Footer/>
    </div>
  );
};

export default LandingPage;
