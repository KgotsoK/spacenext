import React from 'react';
import { Launch } from '@/types/launchTypes';
import { FaCalendarAlt, FaRocket, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

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
    ${isActive 
      ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
      : 'bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-sm'
    }
    rounded-lg 
    shadow-xl 
    p-4 
    text-left 
    w-56 sm:w-64 h-auto min-h-[20rem] sm:min-h-[24rem]
    flex flex-col
    mx-2
    border ${isActive ? 'border-blue-500 shadow-blue-500/30 shadow-lg' : 'border-gray-700'}
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
      <div className={`h-28 sm:h-36 ${isActive ? 'bg-gray-800' : 'bg-gray-800/50'} rounded mb-3 flex items-center justify-center overflow-hidden`}>
        {launch.links?.patch?.small ? (
          <img 
            src={launch.links.patch.small} 
            alt={`${missionName} patch`} 
            className="h-full w-full object-contain p-2" 
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Middle Section: Core Info */}
      <div className="flex-grow mb-3">
        <h3 className={`${isActive ? 'text-blue-300' : 'text-white'} text-base sm:text-lg font-semibold mb-1.5 truncate`} title={missionName}>
          {missionName}
        </h3>
        <p className="text-xs sm:text-sm text-blue-400 mb-2 flex items-center" title={formattedDate}>
          <FaCalendarAlt className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>{formattedDate}</span>
        </p>
        <p className="text-xs sm:text-sm text-gray-300 mb-2 flex items-center" title={vehicleName}>
          <FaRocket className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>{vehicleName}</span>
        </p>
      </div>

      {/* Bottom Section: Provider & Location */}
      <div className="mt-auto pt-2 border-t border-gray-700 text-xs text-gray-400">
        <p className="truncate mb-1 flex items-center" title={providerName}>
          <FaBuilding className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>{providerName}</span>
        </p>
        <p className="truncate flex items-center" title={`${locationName}${padName ? ` (${padName})` : ''}`}>
          <FaMapMarkerAlt className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>{locationName}{padName ? ` (${padName})` : ''}</span>
        </p>
      </div>
    </div>
  );
};

export default LaunchCard; 