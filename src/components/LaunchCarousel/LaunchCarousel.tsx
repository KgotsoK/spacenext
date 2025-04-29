import React, { useState, useEffect } from 'react';
import { Launch } from '@/types/launchTypes';
import LaunchCard from './LaunchCard';
import CarouselNav from './CarouselNav';

interface LaunchCarouselProps {
  launches: Launch[];
}

const LaunchCarousel: React.FC<LaunchCarouselProps> = ({ launches }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Media query breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Constants for Coverflow effect - adjusted based on screen size
  const MAX_VISIBLE_ITEMS = isMobile ? 3 : 5;
  const SPACING = isMobile ? 30 : isTablet ? 50 : 70;
  const ROTATE_Y_DEGREES = isMobile ? 25 : 35;
  const SCALE_FACTOR = isMobile ? 0.85 : 0.75;
  const Z_INDEX_BASE = 100;
  const Z_TRANSLATION = isMobile ? 20 : 40;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % launches.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + launches.length) % launches.length);
  };

  if (!launches || launches.length === 0) {
    return <p className="text-center text-gray-400">No upcoming launches to display.</p>;
  }

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto my-4 md:my-8 px-4" 
      style={{ perspective: '1200px' }}
    >
      <div 
        className="relative w-full h-80 sm:h-96 flex items-center justify-center overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {launches.map((launch, index) => {
          const offset = ((index - activeIndex + launches.length) % launches.length);
          const normalizedOffset = offset > launches.length / 2 
            ? offset - launches.length 
            : offset;

          const isVisible = Math.abs(normalizedOffset) <= Math.ceil(MAX_VISIBLE_ITEMS / 2);
          
          if (!isVisible) return null;

          let translateX = normalizedOffset * SPACING;
          let rotateY = 0;
          let scale = 1;
          let zIndex = Z_INDEX_BASE - Math.abs(normalizedOffset);
          let opacity = 1;
          let translateZ = 0;

          if (normalizedOffset !== 0) {
            // Cards to the side
            rotateY = normalizedOffset > 0 ? -ROTATE_Y_DEGREES : ROTATE_Y_DEGREES;
            scale = SCALE_FACTOR;
            opacity = 0.8 - Math.min(0.3, Math.abs(normalizedOffset) * 0.1);
            translateZ = -Z_TRANSLATION;
          } else {
            // Active card - bring it forward
            scale = 1.05;
            opacity = 1;
            translateZ = 20; // Slightly forward to emphasize the active card
          }

          const transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          
          const cardStyle: React.CSSProperties = {
            position: 'absolute',
            transform,
            zIndex,
            opacity,
            transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: index === activeIndex ? 'auto' : 'none'
          };

          return (
            <LaunchCard 
              key={launch.id || index} 
              launch={launch} 
              isActive={index === activeIndex}
              style={cardStyle}
            />
          );
        })}
      </div>
      
      <CarouselNav 
        onNext={handleNext} 
        onPrev={handlePrev} 
      />
    </div>
  );
};

export default LaunchCarousel; 