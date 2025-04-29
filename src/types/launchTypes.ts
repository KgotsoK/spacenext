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

// Based on SpaceX API v5 structure

export interface Core {
  core: string | null;
  flight: number | null;
  gridfins: boolean | null;
  legs: boolean | null;
  reused: boolean | null;
  landing_attempt: boolean | null;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

export interface LaunchLinks {
  patch: {
    small: string | null;
    large: string | null;
  };
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

export interface Fairings {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
}

export interface Rocket {
  name: string;
  type: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

export interface Launchpad {
  name: string;
  full_name: string;
  locality: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  status: string;
  id: string;
}

// Main Launch interface based on SpaceX API v5
export interface Launch {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string; // 'half', 'quarter', 'year', 'month', 'day', 'hour'
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  tbd: boolean;
  net: boolean;
  window: number | null;
  rocket: string | Rocket; // ID string when not populated, full object when populated
  launchpad: string | Launchpad; // ID string when not populated, full object when populated
  success: boolean | null;
  details: string | null;
  upcoming: boolean;
  cores: Core[];
  fairings: Fairings | null;
  links: LaunchLinks;
  auto_update: boolean;
}

// API response from the query endpoint
export interface LaunchApiResponse {
  docs: Launch[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}