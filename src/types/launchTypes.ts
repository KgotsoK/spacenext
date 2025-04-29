// Based on the structure observed from https://fdo.rocketlaunch.live/json/launches/next/5
// and fields required by docs/specs/main-spec.md

export interface LaunchProvider {
  id: number;
  name: string;
  // Add other provider fields if needed
}

export interface LaunchVehicle {
  id: number;
  name: string;
  // Add other vehicle fields if needed
}

export interface LaunchPadLocation {
  id: number;
  name: string;
  // Add other location fields if needed
}

export interface LaunchPad {
  id: number;
  name: string;
  location: LaunchPadLocation;
  // Add other pad fields if needed
}

export interface LaunchMission {
  id: number;
  name: string;
  // Add other mission fields if needed
}

export interface LaunchTag {
  id: number;
  text: string;
  // Add other tag fields if needed
}

// Main Launch Data structure
export interface LaunchData {
  id: string; // Often a UUID
  name: string; // Full mission name
  date_str: string; // Date string (e.g., "Date Unknown", "NET May 2025", "May 29")
  t0: string | null; // Precise launch time (ISO 8601) or null
  win_open: string | null; // Launch window open time (ISO 8601) or null
  quicktext: string | null; // URL for more details
  slug: string; // URL slug
  provider: LaunchProvider;
  vehicle: LaunchVehicle;
  pad: LaunchPad;
  missions: LaunchMission[]; // Can be empty or have one primary mission
  tags: LaunchTag[];
  // Add other top-level launch fields if needed
}

// Structure of the API response
export interface LaunchAPIResponse {
  valid_auth: boolean;
  count: number;
  limit: number;
  total: number;
  last_page: number;
  result: LaunchData[];
  // Potentially other metadata fields
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string; // Or Date if preferred
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
  };
  rocket: { // Assuming we might need rocket info
    name: string;
  } | string; // Sometimes the API returns just the rocket ID string
  success: boolean | null;
  upcoming: boolean;
  // Add other relevant fields as needed based on actual API response
}

// If the API response is structured like the SpaceX API v5 'query' endpoint:
export interface LaunchApiResponse {
  docs: Launch[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}