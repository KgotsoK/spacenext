import React from 'react';
import { Launch } from '@/types/launchTypes';

interface LaunchCardProps {
  launch: Launch;
  isActive: boolean; // Is this the centered card?
  // Add style props later for Coverflow transforms if needed
  style?: React.CSSProperties;
}

const LaunchCard: React.FC<LaunchCardProps> = ({ launch, isActive, style }) => {
  // Extract data safely using the updated Launch type
  const missionName = launch.name || launch.missions?.[0]?.name || 'Unnamed Mission';
  // Prioritize specific dates, fallback to date_str
  const launchDate = launch.win_open || launch.t0 || launch.sort_date;
  const vehicleName = launch.vehicle?.name || 'Unknown Vehicle';
  const providerName = launch.provider?.name || 'Unknown Provider';
  const locationName = launch.pad?.location?.name || 'Unknown Location';
  const padName = launch.pad?.name || '';

  // TODO: Apply dynamic styles based on isActive and potentially other props for Coverflow

  const cardClasses = `
    bg-gray-800 
    rounded-lg 
    shadow-xl 
    p-4 
    text-left 
    w-64 h-auto min-h-[24rem] /* Adjust size, use min-height */
    flex flex-col
    mx-2 /* Add some margin between cards */
    border border-gray-700
    ${isActive ? 'border-blue-500' : ''} /* Removed scale and z-index, kept active border */
  `;

  // Use date_str for display if available and specific dates aren't, otherwise format the specific date
  let formattedDate: string;
  if (launch.win_open || launch.t0) {
    // If we have a precise ISO date string
    const preciseDate = launch.win_open || launch.t0;
    formattedDate = new Date(preciseDate!).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
    });
  } else if (launch.sort_date) {
    // If we only have the sort_date timestamp string
    try {
      const timestamp = parseInt(launch.sort_date, 10);
      if (!isNaN(timestamp)) {
        formattedDate = new Date(timestamp * 1000).toLocaleString(undefined, {
          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
        });
      } else {
        // Fallback if sort_date is not a valid number string
        formattedDate = launch.date_str || 'Date TBC';
      }
    } catch (e) {
      // Fallback in case of parsing error
      formattedDate = launch.date_str || 'Date TBC';
    }
  } else {
    // Fallback to the user-friendly string if no other date is available
    formattedDate = launch.date_str || 'Date TBC';
  }

  return (
    <div className={cardClasses} style={style}>
      {/* Top Section: Image */}
      <div className="h-36 bg-gray-700 rounded mb-3 flex items-center justify-center overflow-hidden">
        {launch.links?.patch?.small ? (
          <img 
            src={launch.links.patch.small} 
            alt={`${missionName} patch`} 
            className="h-full w-full object-contain p-2" 
            loading="lazy"
          />
        ) : (
          <span className="text-gray-500 text-sm">No Patch</span>
        )}
      </div>

      {/* Middle Section: Core Info */}
      <div className="flex-grow mb-3">
        <h3 className="text-lg font-semibold mb-1.5 truncate" title={missionName}>
          {missionName}
        </h3>
        <p className="text-sm text-blue-400 mb-1" title={formattedDate}>
          🗓️ {formattedDate}
        </p>
        <p className="text-sm text-gray-300 mb-1" title={vehicleName}>
          🚀 {vehicleName}
        </p>
      </div>

      {/* Bottom Section: Provider & Location */}
      <div className="mt-auto pt-2 border-t border-gray-600 text-xs text-gray-400">
        <p className="truncate" title={providerName}>🏢 {providerName}</p>
        <p className="truncate" title={`${locationName}${padName ? ` (${padName})` : ''}`}>
            📍 {locationName}{padName ? ` (${padName})` : ''}
        </p>
      </div>
    </div>
  );
};

export default LaunchCard; 