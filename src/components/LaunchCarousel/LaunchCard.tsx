import React from 'react';
import { Launch, Rocket, Launchpad } from '@/types/launchTypes';
import { FaCalendarAlt, FaRocket, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { fetchLaunchPoem } from '@/services/openaiService';
import InlineSpinner from '@/components/InlineSpinner';
import Snackbar from '@/components/Snackbar';

interface LaunchCardProps {
  launch: Launch;
  isActive: boolean; // Is this the centered card?
  // Add style props later for Coverflow transforms if needed
  style?: React.CSSProperties;
}

const LaunchCard: React.FC<LaunchCardProps> = ({ launch, isActive, style }) => {
  // Extract data from the SpaceX API v5 format
  const missionName = launch.name || 'Unnamed Mission';
  
  // Get rocket data (either from populated object or default)
  const rocketObj = typeof launch.rocket === 'object' ? launch.rocket as Rocket : null;
  const rocketName = rocketObj?.name || 'Unknown Vehicle';
  
  // Get launchpad data (either from populated object or default)
  const launchpadObj = typeof launch.launchpad === 'object' ? launch.launchpad as Launchpad : null;
  const launchpadName = launchpadObj?.name || 'Unknown Launchpad';
  const locationName = launchpadObj?.locality && launchpadObj?.region 
    ? `${launchpadObj.locality}, ${launchpadObj.region}`
    : launchpadObj?.locality || launchpadObj?.region || 'Unknown Location';
  
  // Get company (provider) name
  const providerName = rocketObj?.company || 'Unknown Provider';

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

  // Format the date based on precision
  let formattedDate: string;
  
  if (launch.date_precision === 'hour' || launch.date_precision === 'day') {
    // Full date with time for high precision dates
    formattedDate = new Date(launch.date_utc).toLocaleString(undefined, {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'UTC'
    }) + ' UTC';
  } else if (launch.date_precision === 'month') {
    // Just month and year for month precision
    formattedDate = new Date(launch.date_utc).toLocaleString(undefined, {
      year: 'numeric', 
      month: 'long'
    });
  } else if (launch.date_precision === 'quarter' || launch.date_precision === 'half') {
    // Quarter or half-year precision
    const date = new Date(launch.date_utc);
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    formattedDate = `Q${quarter} ${date.getFullYear()}`;
  } else if (launch.date_precision === 'year') {
    // Just the year
    formattedDate = new Date(launch.date_utc).getFullYear().toString();
  } else {
    // Fallback for unknown precision
    formattedDate = 'Date TBD';
  }

  // Add a "NET" (No Earlier Than) prefix for dates that aren't firm
  if (launch.tbd || launch.net) {
    formattedDate = `NET ${formattedDate}`;
  }

  const [poem, setPoem] = React.useState<string | null>(null);
  const [loadingPoem, setLoadingPoem] = React.useState(false);
  const [poemError, setPoemError] = React.useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    if (isActive) {
      setPoem(null);
      setPoemError(null);
      setLoadingPoem(true);
      fetchLaunchPoem(launch.name, formattedDate, rocketName)
        .then((result) => {
          if (!cancelled) {
            setPoem(result);
            setLoadingPoem(false);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setPoemError('Failed to fetch poem.');
            setShowSnackbar(true);
            setLoadingPoem(false);
          }
        });
    } else {
      setPoem(null);
      setPoemError(null);
      setLoadingPoem(false);
    }
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, launch.id]);

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
        <p className="text-xs sm:text-sm text-gray-300 mb-2 flex items-center" title={rocketName}>
          <FaRocket className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>{rocketName}</span>
        </p>
      </div>

      {/* Bottom Section: Provider & Location */}
      <div className="mt-auto pt-2 border-t border-gray-700 text-xs text-gray-400">
        <p className="truncate mb-1 flex items-center" title={providerName}>
          <FaBuilding className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>{providerName}</span>
        </p>
        <p className="truncate flex items-center" title={`${locationName}${launchpadName ? ` (${launchpadName})` : ''}`}>
          <FaMapMarkerAlt className="mr-2 w-4 h-4 flex-shrink-0" />
          <span>
            {locationName}
            {launchpadName && launchpadName !== locationName ? ` (${launchpadName})` : ''}
          </span>
        </p>
      </div>
      {/* Poem Section */}
      <div className="mt-4 p-2 bg-gray-800/60 rounded text-sm text-blue-100 min-h-[5rem] flex flex-col items-center justify-center">
        {loadingPoem && <InlineSpinner />}
        {!loadingPoem && poem && (
          <pre className="whitespace-pre-wrap text-center font-mono text-blue-200">{poem}</pre>
        )}
        {!loadingPoem && poemError && (
          <span className="text-red-400">Could not load poem.</span>
        )}
      </div>
      {showSnackbar && poemError && (
        <Snackbar message={poemError} onClose={() => setShowSnackbar(false)} />
      )}
    </div>
  );
};

export default LaunchCard; 