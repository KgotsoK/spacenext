import { useState, useEffect } from 'react';
import { getUpcomingLaunches } from '@/services/launchService';
import { Launch } from '@/types/launchTypes'; // Use the specific Launch interface

interface UseLaunchDataState {
  data: Launch[] | null;
  loading: boolean;
  error: Error | null;
}

export const useLaunchData = (limit: number = 5) => {
  const [state, setState] = useState<UseLaunchDataState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      try {
        const apiResponse = await getUpcomingLaunches(limit);
        // Extract the actual launch documents from the paginated response
        setState({ data: apiResponse.docs, loading: false, error: null });
      } catch (err) {
        console.error("Error fetching launch data:", err);
        setState({ data: null, loading: false, error: err instanceof Error ? err : new Error('An unknown error occurred') });
      }
    };

    fetchData();

    // Optional: Cleanup function if needed, e.g., for cancellation
    // return () => {
    //   // Cleanup logic here
    // };
  }, [limit]); // Re-run effect if the limit changes

  return state;
};