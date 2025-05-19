import React from 'react';

const InlineSpinner: React.FC = () => (
  <span className="inline-block w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin align-middle ml-2" aria-label="Loading" />
);

export default InlineSpinner; 