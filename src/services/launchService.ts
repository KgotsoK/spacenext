import { LaunchApiResponse } from "@/types/launchTypes";

const API_BASE_URL = "https://api.spacexdata.com/v5";

/**
 * Fetches upcoming SpaceX launches using the v5 API query endpoint.
 * @param limit The maximum number of launches to return (default: 5).
 * @returns A promise that resolves to the API response containing launch data.
 */
export const getUpcomingLaunches = async (
  limit = 5
): Promise<LaunchApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/launches/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        upcoming: true,
      },
      options: {
        limit: limit,
        sort: {
          flight_number: "asc", // Sort by flight number ascending
        },
        pagination: true, // Request paginated response
        populate: ["rocket"], // Include full rocket details
      },
    }),
  });

  if (!response.ok) {
    let errorDetails = {};
    try {
      errorDetails = await response.json(); // Try to get specific error details
    } catch (e) {
      // Ignore if response body is not JSON or empty
    }
    console.error("API Error Response:", { status: response.status, statusText: response.statusText, details: errorDetails });
    throw new Error(
      `Failed to fetch launch data: ${response.status} ${response.statusText}`
    );
  }

  const data: LaunchApiResponse = await response.json();
  return data;
};