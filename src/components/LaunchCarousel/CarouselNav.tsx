import React from 'react';

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
  
  // Basic button styling - can be refined
  const buttonBaseClasses = "absolute top-1/2 transform -translate-y-1/2 px-4 py-2 font-bold text-white bg-black bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <>
      <button 
        onClick={onPrev}
        // disabled={prevDisabled}
        className={`${buttonBaseClasses} left-2 sm:left-4 md:left-8`}
        aria-label="Previous Launch"
      >
        &lt;
      </button>
      <button 
        onClick={onNext}
        // disabled={nextDisabled}
        className={`${buttonBaseClasses} right-2 sm:right-4 md:right-8`}
        aria-label="Next Launch"
      >
        &gt;
      </button>
    </>
  );
};

export default CarouselNav; 