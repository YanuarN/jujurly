// src/pages/FeedbackPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';
import ApiRequest from '../lib/ApiRequest';

const FeedbackPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setUserExists(false);
      return;
    }
    setChecking(true);
    ApiRequest.userLookup(userId)
      .then(data => {
        if (data && data.user_identifier) {
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      })
      .catch(() => setUserExists(false))
      .finally(() => setChecking(false));
  }, [userId]);

  useEffect(() => {
    if (userExists === false) {
      navigate('/ke', { state: { userNotFound: true } });
    }
  }, [userExists, navigate]);

  if (!userId) {
    console.warn("No userId found in URL, redirecting to landing page.");
    return <Navigate to="/" replace />;
  }
  if (checking) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>Mengecek pengguna...</div>;
  }
  if (userExists === false) {
    return null; // Will redirect
  }
  return (
    <FeedbackForm userId={userId} />
  );
};

export default FeedbackPage;
