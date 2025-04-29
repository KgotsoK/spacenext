import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div 
        className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-400"
        style={{ boxShadow: '0 0 15px rgba(96, 165, 250, 0.5)' }}
        role="status" 
        aria-live="polite"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4 text-gray-300 animate-pulse">Fetching launch data...</p>
    </div>
  );
};

export default LoadingSpinner; 