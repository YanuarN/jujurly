// src/pages/LoginPage.tsx
import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      headerText="Feedback jujur, biar makin mujur."
      title="Masuk ke Akun"
      subtitle="Silakan masuk untuk melanjutkan"
      linkText="Belum punya akun?" // Mengubah teks tautan
      linkTo="/register"
      footerContent={
        <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
          Platform Honesty as a Service (HaaS) pertama di Indonesia!
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;