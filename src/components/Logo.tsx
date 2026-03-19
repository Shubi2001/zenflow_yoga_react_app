import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Unique ZenFlow Logo: Abstract Flowing Lotus */}
      <path d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" strokeOpacity="0.2" />
      <path d="M12 17c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4z" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 3v4" />
      <path d="M12 19v2" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M18.364 5.636l-2.828 2.828" />
      <path d="M8.464 15.536l-2.828 2.828" />
      <path d="M18.364 18.364l-2.828-2.828" />
      <path d="M8.464 8.464l-2.828-2.828" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};

export default Logo;
