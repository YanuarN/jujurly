import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'submit';
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  to?: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  icon, 
  text, 
  onClick, 
  to,
  className = ''
}) => {
  const baseClasses = "relative px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 transform group flex items-center justify-center gap-3";
  
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white" 
    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white";
    // For submit variant, we can add a different style if needed
  if (variant === 'submit') {
    return (
      <button
        type="submit"
        className={`${baseClasses} ${variantClasses} hover:scale-[1.03] shadow-lg hover:shadow-xl ${className}`}
      >
        {icon}
        <span>{text}</span>
      </button>
    );
  }

  const content = (
    <>
      {icon}
      <span>{text}</span>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"></div>
    </>
  );

  if (to) {
    return (
      <a
        href={to}
        className={`${baseClasses} ${variantClasses} hover:scale-[1.03] shadow-lg hover:shadow-xl ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} hover:scale-[1.03] shadow-lg hover:shadow-xl ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;