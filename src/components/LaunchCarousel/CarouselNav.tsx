import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselNavProps {
  onPrev: () => void;
  onNext: () => void;
  // Add props to disable buttons if needed (e.g., at start/end)
  // prevDisabled?: boolean;
  // nextDisabled?: boolean;
}

const CarouselNav: React.FC<CarouselNavProps> = ({ 
  onPrev,
  onNext,
  // prevDisabled = false, 
  // nextDisabled = false 
}) => {
  
  // Enhanced button styling with responsive design
  const buttonBaseClasses = `
    absolute top-1/2 transform -translate-y-1/2 
    w-10 h-10 sm:w-12 sm:h-12 
    flex items-center justify-center
    font-bold text-white 
    bg-gray-800/80 hover:bg-blue-600/80 active:bg-blue-700/80
    rounded-full shadow-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500 
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    backdrop-blur-sm
    border border-gray-700 hover:border-blue-500
    z-20
  `;

  return (
    <>
      <button 
        onClick={onPrev}
        className={`${buttonBaseClasses} left-1 sm:left-4 md:left-8`}
        aria-label="Previous Launch"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={onNext}
        className={`${buttonBaseClasses} right-1 sm:right-4 md:right-8`}
        aria-label="Next Launch"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      {/* Added mobile swipe indicator */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 sm:hidden">
        <div className="text-xs text-gray-400 bg-gray-800/60 px-3 py-1 rounded-full backdrop-blur-sm">
          Swipe to navigate
        </div>
      </div>
    </>
  );
};

export default CarouselNav; 