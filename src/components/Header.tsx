import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-wider">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 shimmer-effect">
            SpaceNext
          </span>{" "}
          <span className="text-white">Launch Tracker</span>
        </h1>
        <p className="text-gray-400 text-center mt-2 text-sm md:text-base">
          Explore upcoming space missions
        </p>
      </div>
    </header>
  );
};

export default Header;