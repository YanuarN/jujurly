// src/pages/RegisterPage.tsx
import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      headerText="Feedback jujur, biar makin mujur."
      title="Daftar Akun Jujurly" // Sesuaikan judul untuk registrasi
      subtitle="Buat akun buat ngumpulin feedback jujur!" // Sesuaikan subjudul
      linkText="Udah punya akun?" // Mengubah teks tautan
      linkTo="/login"
      footerContent={
        <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
          Platform Honesty as a Service (HaaS) pertama di Indonesia!
        </div>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;