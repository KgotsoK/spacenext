import React, { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 bg-red-700 text-white px-6 py-3 rounded shadow-lg animate-fade-in">
      {message}
    </div>
  );
};

export default Snackbar; 