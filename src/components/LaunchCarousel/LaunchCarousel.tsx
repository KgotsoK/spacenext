import React, { useState } from 'react';
import { Launch } from '@/types/launchTypes';
import LaunchCard from './LaunchCard';
import CarouselNav from './CarouselNav';

interface LaunchCarouselProps {
  launches: Launch[];
}

const LaunchCarousel: React.FC<LaunchCarouselProps> = ({ launches }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Constants for Coverflow effect
  const MAX_VISIBLE_ITEMS = 5; // Show center + 2 on each side
  const CARD_WIDTH = 256; // approx width of LaunchCard in px (w-64)
  const SPACING = 100; // Spacing between centers of cards when side-by-side
  const ROTATE_Y_DEGREES = 45;
  const SCALE_FACTOR = 0.7;
  const Z_INDEX_BASE = 10;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % launches.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + launches.length) % launches.length);
  };

  if (!launches || launches.length === 0) {
    return <p>No upcoming launches to display.</p>; // Handle empty/null data
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 perspective-1000 transform-style-preserve-3d">
      {/* Placeholder for the carousel items - Now the actual items container */}
      {/* <p>Carousel will go here ({launches.length} items)</p> */}
      {/* TODO: Need a container for the cards themselves to apply transforms relative to the perspective container */} 
      <div className="relative w-full h-96 flex items-center justify-center transform-style-preserve-3d">
        {/* This inner container will hold the cards and handle the actual card positioning/transforms */} 
        {launches.map((launch, index) => {
          const offset = index - activeIndex;
          const isVisible = Math.abs(offset) < MAX_VISIBLE_ITEMS / 2;

          let translateX = offset * SPACING;
          let rotateY = 0;
          let scale = 1;
          let zIndex = Z_INDEX_BASE - Math.abs(offset);
          let opacity = 1;

          if (offset !== 0) {
            // Cards to the side
            rotateY = offset > 0 ? -ROTATE_Y_DEGREES : ROTATE_Y_DEGREES;
            scale = SCALE_FACTOR;
            opacity = 0.7; 
            // Adjust translateX for tilted cards to appear closer/further
            // This creates the overlapping effect
            translateX = offset * SPACING - (offset > 0 ? CARD_WIDTH * 0.3 : -CARD_WIDTH * 0.3);
          } else {
            // Active card slightly larger
            scale = 1.05; 
            opacity = 1; 
          }

          const transform = `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`;
          
          // Apply styles absolutely positioned within the inner container
          const cardStyle: React.CSSProperties = {
            position: 'absolute',
            transform: transform,
            zIndex: zIndex,
            opacity: isVisible ? opacity : 0, // Hide cards far away
            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out' // Add transition here for now
          };

          return (
            <LaunchCard 
              key={launch.id || index} 
              launch={launch} 
              isActive={index === activeIndex}
              style={cardStyle} // Apply dynamic styles
            />
          );
        })}
      </div>
      
      {/* Placeholder for Navigation */}
      <CarouselNav onNext={handleNext} onPrev={handlePrev} />
    </div>
  );
};

export default LaunchCarousel; 