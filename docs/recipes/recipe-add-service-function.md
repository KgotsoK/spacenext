# Recipe: Adding a New Service Function

This recipe outlines the steps for adding a new function to interact with an API within the SpaceNext project's service layer.

**Context:** Follow these steps when you need to fetch data from a new API endpoint or add a new data mutation operation.

**Prerequisites:** Familiarity with TypeScript, asynchronous JavaScript (`async/await`), the chosen data fetching library (e.g., `fetch` or `axios`), and the project's structure (`docs/specs/main-spec.md#6-proposed-component-structure`).

## Steps

1.  **Identify/Create Service File:**
    *   Locate the relevant service file in `src/services/`. For the initial launch data, this is `launchService.ts`.
    *   If the new function belongs to a different domain or API, create a new service file (e.g., `userService.ts`).

2.  **Define Request/Response Types:**
    *   Ensure TypeScript types/interfaces exist for any data being sent to the API (request payload) and the expected data structure of the API response.
    *   Define these types in the relevant file within `src/types/` (e.g., `launchTypes.ts`, `userTypes.ts`). Import them into the service file.
    *   Example (`src/types/launchTypes.ts` already exists for launch data).

3.  **Implement the Service Function:**
    *   Define an `async` function within the service file.
    *   Use the chosen fetching library (`fetch` or `axios`) to make the API call.
    *   Handle potential errors using `try...catch` blocks.
    *   Ensure the function returns the data in the expected format (using the defined TypeScript types).
    *   Example (Adding a hypothetical function to `launchService.ts`):
        ```typescript
        import { LaunchData, LaunchAPIResponse } from '@/types/launchTypes'; // Assuming path alias

        const API_BASE_URL = 'https://fdo.rocketlaunch.live/json';

        // Existing function
        export const getNextLaunches = async (count: number = 5): Promise<LaunchData[]> => {
          try {
            const response = await fetch(`${API_BASE_URL}/launches/next/${count}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: LaunchAPIResponse = await response.json();
            // Add validation logic here if needed
            return data.result || [];
          } catch (error) {
            console.error("Failed to fetch next launches:", error);
            throw error; // Re-throw to allow calling code to handle
          }
        };

        // New hypothetical function
        export const getLaunchDetails = async (launchId: string): Promise<LaunchData | null> => {
          try {
            // Assuming an endpoint like /launches/{id}
            const response = await fetch(`${API_BASE_URL}/launches/${launchId}`);
            if (!response.ok) {
              if (response.status === 404) return null; // Handle not found gracefully
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: { result: LaunchData } = await response.json(); // Hypothetical single result structure
            return data.result || null;
          } catch (error) {
            console.error(`Failed to fetch launch details for ${launchId}:`, error);
            throw error;
          }
        };
        ```

4.  **Error Handling:**
    *   Implement basic error handling within the service function (logging, re-throwing).
    *   The calling code (e.g., custom hook or component) should handle the error appropriately for the UI (e.g., setting an error state).

5.  **Export the Function:**
    *   Ensure the new function is exported from the service file.

6.  **Update Custom Hook (If Applicable):**
    *   If a custom hook (e.g., `useLaunchData` in `src/hooks/`) consumes this service, update the hook to include logic for calling the new service function and managing its state (data, loading, error).

7.  **Add Unit/Integration Tests (Optional but Recommended):**
    *   Write tests for the service function, potentially mocking the API call (`fetch`/`axios`) to verify request formatting and response handling.

## Coding Guidelines Checklist:

*   [ ] Function placed in the correct service file (`src/services/`)?
*   [ ] Relevant TypeScript types defined/imported (`src/types/`)?
*   [ ] Function is `async`?
*   [ ] API call uses `fetch` or `axios`?
*   [ ] Errors handled with `try...catch`?
*   [ ] Function returns data with correct types?
*   [ ] Function is exported?
*   [ ] Associated hooks/components updated? 