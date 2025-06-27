// src/components/AuthLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  footerContent?: React.ReactNode; 
  headerText?: string; 
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo,
  footerContent,
  headerText,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-blue-600 text-3xl font-bold mb-2">Jujurly</h1>
          <p className="text-gray-600 text-sm">{headerText}</p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">{title}</h2>
        <p className="text-gray-600 text-center text-sm mb-6">{subtitle}</p>

        {children}

        <p className="mt-6 text-center text-gray-600 text-sm">
          {linkText}{' '}
          <Link to={linkTo} className="text-blue-600 hover:underline font-medium">
            {linkTo === '/register' ? 'Daftar sekarang' : 'Login'}
          </Link>
        </p>

        {footerContent && (
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;