// Based on the structure observed from https://fdo.rocketlaunch.live/json/launches/next/5
// and fields required by docs/specs/main-spec.md

export interface LaunchProvider {
  id: number;
  name: string;
  slug: string;
  // Add other provider fields if needed
}

export interface LaunchVehicle {
  id: number;
  name: string;
  company_id: number;
  slug: string;
  // Add other vehicle fields if needed
}

export interface LaunchLocation {
  id: number;
  name: string;
  state: string | null;
  statename: string | null;
  country: string;
  slug: string;
  // Add other location fields if needed
}

export interface LaunchPad {
  id: number;
  name: string;
  location: LaunchLocation;
  // Add other pad fields if needed
}

export interface LaunchMission {
  id: number;
  name: string;
  description: string | null;
  // Add other mission fields if needed
}

export interface LaunchTag {
  id: number;
  text: string;
  // Add other tag fields if needed
}

export interface EstimatedDate {
  month: number | null;
  day: number | null;
  year: number | null;
  quarter: number | null;
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
  id: number;
  cospar_id: string | null;
  sort_date: string; // Can be parsed as number (Unix timestamp)
  name: string;
  provider: LaunchProvider;
  vehicle: LaunchVehicle;
  pad: LaunchPad;
  missions: LaunchMission[];
  mission_description: string | null;
  launch_description: string;
  win_open: string | null; // ISO 8601 Date string or null
  t0: string | null; // ISO 8601 Date string or null
  win_close: string | null;
  est_date: EstimatedDate;
  date_str: string; // User-friendly date string
  tags: LaunchTag[];
  slug: string;
  weather_summary: string | null;
  weather_temp: number | null;
  weather_condition: string | null;
  weather_wind_mph: number | null;
  weather_icon: string | null;
  weather_updated: string | null;
  quicktext: string;
  media: any[]; // Define more specific type if structure is known
  result: number | null; // -1 for scheduled, potentially others?
  suborbital: boolean;
  modified: string; // ISO 8601 Date string
  // Note: 'links' was not present in the sample, add if needed
  // links?: { patch?: { small?: string; large?: string } };
  links?: { 
    patch?: { 
      small?: string | null;
      large?: string | null;
    };
    // Add other link types if they exist (e.g., webcast, article)
  };
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