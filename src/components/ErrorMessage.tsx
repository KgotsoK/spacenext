import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div 
      className="bg-red-900/30 border border-red-500 text-red-200 px-6 py-4 rounded-lg shadow-lg my-8 max-w-2xl mx-auto"
      role="alert"
    >
      <div className="flex items-center">
        <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <strong className="font-bold text-red-300">Error Fetching Data</strong>
      </div>
      <p className="mt-2 ml-9 text-red-200">{message}</p>
      <p className="mt-3 ml-9 text-red-300 text-sm">Please try again later or check your connection.</p>
    </div>
  );
};

export default ErrorMessage; 