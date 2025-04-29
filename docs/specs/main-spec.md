# Specification: Space Launch Tracker v1.0

## 1. Project Overview

**Goal:** Develop a single-page web application (SPA) displaying the next 5 upcoming space launches, fetched from a public API. The application will feature a visually engaging "Coverflow"-style carousel interface.

**Purpose:** To provide users with a quick, informative, and aesthetically pleasing view of near-term space launch activity.

## 2. Core Features

*   **Data Fetching:** Retrieve the next 5 launch details from the `https://fdo.rocketlaunch.live/json/launches/next/5` endpoint on initial application load.
*   **Coverflow Carousel Display:**
    *   Present the 5 launches in an interactive carousel resembling the "Coverflow" effect.
    *   One launch card is prominently displayed in the center.
    *   Adjacent launch cards (previous/next) are partially visible, scaled down, and slightly angled to create depth.
    *   Remaining cards are further back in the visual hierarchy.
*   **Carousel Navigation:**
    *   Provide clear "Next" and "Previous" buttons for navigating through the launches.
    *   (Optional Enhancement): Allow users to click on partially visible side cards to center them.
    *   (Optional Enhancement for Mobile): Implement touch/swipe gestures for navigation.
*   **Launch Information Display:** Each launch card in the carousel should clearly display:
    *   Mission Name (`name` or `missions[0].name`)
    *   Launch Date/Time (`date_str`, potentially formatted `t0` or `win_open`)
    *   Launch Vehicle (`vehicle.name`)
    *   Launch Provider (`provider.name`)
    *   Launch Location (`pad.location.name`, `pad.name`)
    *   (Optional): Link to detailed launch info (`quicktext` URL or constructed `rocketlaunch.live/launch/{slug}`).
    *   (Optional): Relevant `tags` (e.g., "Crewed").
*   **Loading State:** Display a clear visual indicator (e.g., "Loading launches...", spinner) while the API data is being fetched.
*   **Error State:** Display a user-friendly message if the API call fails or returns an error (e.g., "Failed to load launch data. Please try again later.").
*   **Responsiveness:** The application layout, especially the carousel, must adapt gracefully to various screen sizes (desktop, tablet, mobile). The Coverflow effect might simplify on smaller screens if necessary for usability.

## 3. Technology Stack

*   **Frontend Framework:** React (v18+)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v3+)
*   **Data Fetching:** Browser `fetch` API or `axios`
*   **Build Tool:** Vite (Recommended)
*   **Package Manager:** npm or yarn

## 4. Data Source

*   **API Endpoint:** `https://fdo.rocketlaunch.live/json/launches/next/5`
*   **Method:** GET
*   **Authentication:** None required (public API).
*   **Expected Response:** JSON object containing a `result` array of launch objects. See API documentation or sample response for structure.

## 5. UI/UX Design

*   **Layout:** Dominated by the Coverflow carousel, centered horizontally and vertically within the viewport where possible. Minimal header (e.g., "Upcoming Space Launches"). Navigation controls positioned accessibly near the carousel.
*   **Carousel Visuals:**
    *   Utilize CSS transforms (`translateX`, `scale`, `rotateY`), transitions, `perspective`, and `z-index` to achieve the Coverflow effect.
    *   Ensure smooth animations during navigation transitions.
    *   Focus on clean typography, good spacing, and a modern color palette (leveraging Tailwind defaults/customizations).
*   **Launch Card Design:** Individual cards within the carousel should be styled consistently using Tailwind utility classes for padding, margins, borders, shadows (subtle), rounded corners, text styles, etc. Prioritize readability of the launch information.
*   **Responsiveness Strategy:**
    *   **Desktop:** Full Coverflow effect.
    *   **Tablet:** Potentially reduce the perspective/angle or the number of visible side cards if needed.
    *   **Mobile:** Consider simplifying to a standard single-item-visible carousel or even a vertical stacked list if Coverflow proves unusable. Test thoroughly.

## 6. Proposed Component Structure

```
src/
|-- App.tsx                  # Main application component, state management, routing (if needed)
|-- components/              # Reusable UI components
|   |-- LaunchCarousel/
|   |   |-- LaunchCarousel.tsx # Manages carousel state, logic, renders cards
|   |   |-- LaunchCard.tsx     # Displays individual launch data, applies dynamic styles
|   |   |-- CarouselNav.tsx    # Navigation buttons/controls
|   |-- UI/                  # General-purpose UI elements (Buttons, Spinners, etc.)
|   |   |-- LoadingSpinner.tsx
|   |   |-- ErrorMessage.tsx
|-- hooks/                   # Custom React hooks (e.g., useLaunchData)
|   |-- useLaunchData.ts
|-- services/                # API interaction logic
|   |-- launchService.ts       # Function to fetch launch data
|-- types/                   # TypeScript type definitions
|   |-- launchTypes.ts         # Interfaces for API response/launch data
|-- styles/                  # Global styles, Tailwind config extensions
|   |-- globals.css
|   |-- carousel.css         # Custom CSS for Coverflow if needed beyond Tailwind
|-- main.tsx                 # Application entry point
```

## 7. Project Structure Guidelines

*   Follow the proposed component structure above.
*   Keep components focused and reusable.
*   Separate concerns: UI components in `components/`, data fetching logic in `services/`, type definitions in `types/`, custom hooks in `hooks/`.
*   Maintain a clean root directory.

## 8. Coding Guidelines

*   **Language:** Use TypeScript for all new code. Leverage static typing for better maintainability and error prevention. Define clear interfaces (`types/launchTypes.ts`) for API data structures and component props.
*   **React:**
    *   Use functional components and Hooks (`useState`, `useEffect`, `useContext`, etc.).
    *   Avoid class components.
    *   Optimize performance where necessary (e.g., `React.memo`, `useCallback`, `useMemo`), but avoid premature optimization.
*   **Separation of Concerns:**
    *   UI logic within components.
    *   Business logic/data fetching within services or custom hooks.
    *   State management primarily within `App.tsx` or lifted as needed; consider Context API or state management libraries (like Zustand or Redux Toolkit) ONLY if complexity significantly increases.
*   **Styling:**
    *   Primarily use Tailwind CSS utility classes.
    *   For complex styles not easily achievable with utilities (like the core Coverflow transform logic), use dedicated CSS files (`styles/carousel.css`) and apply classes to elements. Avoid inline styles where possible, except for dynamic values calculated in JS (like transform properties).
    *   Configure `tailwind.config.js` for custom themes (colors, fonts, spacing) if needed.
*   **Naming Conventions:**
    *   Components: `PascalCase` (e.g., `LaunchCard.tsx`)
    *   Variables/Functions: `camelCase` (e.g., `fetchLaunchData`)
    *   Types/Interfaces: `PascalCase` (e.g., `LaunchData`)
    *   CSS Classes (if custom): `kebab-case` (e.g., `carousel-item`)
*   **Code Formatting:** Use Prettier and ESLint with standard React/TypeScript configurations to ensure consistent code style. Configure them to run on save and potentially as a pre-commit hook.
*   **Comments:** Add comments to explain complex logic, non-obvious code sections, or `// TODO:` markers. Avoid commenting on obvious code.
*   **Accessibility (a11y):** Keep accessibility in mind. Use semantic HTML elements, provide ARIA attributes where necessary (especially for custom controls like the carousel navigation), ensure keyboard navigability, and adequate color contrast.

## 9. Error Handling & Loading States

*   Implement clear visual feedback for loading data (e.g., spinner within the carousel area).
*   Handle potential API errors gracefully. Display a user-friendly error message instead of crashing the app.
*   Consider specific error handling (e.g., differentiating between network errors and API returning an error status).

## 10. Development Recipes

To ensure consistency and streamline common development tasks, a set of "recipes" are maintained in the `docs/recipes/` directory. These provide step-by-step guides for actions such as:

*   Creating new components (`recipe-create-component.md`)
*   Adding API service functions (`recipe-add-service-function.md`)
*   Defining TypeScript types (`recipe-add-type-definition.md`)

**Important:** These recipes should be treated as living documents. If project structures, coding conventions, or standard procedures evolve, the relevant recipes **must be updated** accordingly to reflect the current best practices for the SpaceNext project.

## 11. Future Enhancements (Optional Post-MVP)

*   Real-time updates (if API supports or via polling).
*   Filtering/Sorting launches.
*   User preferences (e.g., favorite launch providers).
*   More detailed launch view/modal.
*   Integration with calendar services.
*   Swipe gestures for carousel navigation on touch devices.
*   Clicking side cards to navigate. 