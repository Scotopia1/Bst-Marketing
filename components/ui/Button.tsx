import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:pointer-events-none transform active:scale-95";
  
  const variants = {
    // Red/Orange Gradient - Direct Response Style
    primary: "bg-gradient-to-r from-red-600 to-orange-600 text-white hover:brightness-110 shadow-lg shadow-red-600/20 border border-transparent",
    
    // High contrast white
    secondary: "bg-white text-black hover:bg-neutral-200 shadow-lg",
    
    // Subtler outline
    outline: "border-2 border-neutral-700 text-neutral-300 hover:border-red-500 hover:text-white bg-transparent",
    
    ghost: "text-neutral-400 hover:text-white hover:bg-neutral-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-16 px-10 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};