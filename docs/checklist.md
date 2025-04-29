# SpaceNext Project Checklist

This checklist tracks the progress of the SpaceNext project development. Mark items as completed using `[x]`.

## Phase 1: Project Setup & Foundation

*   [x] Define Project Specification (`docs/specs/main-spec.md`)
*   [x] Create Development Recipes (`docs/recipes/`)
*   [x] Create Ways of Working Document (`docs/wow.md`)
*   [x] Create Project Checklist (`docs/checklist.md`)
*   [ ] Initialize Project using Vite (`npm create vite@latest . --template react-ts`)
*   [ ] Install Tailwind CSS and dependencies (`npm install -D tailwindcss postcss autoprefixer`)
*   [ ] Configure Tailwind CSS (`tailwind.config.js`, `postcss.config.js`, `index.css`)
*   [ ] Set up ESLint and Prettier for code formatting and linting
*   [ ] Configure TypeScript path aliases (e.g., `@/*` for `src/*`)
*   [ ] Clean up default Vite template files (App.css, assets, etc.)
*   [ ] Create initial project structure (folders: `components`, `hooks`, `services`, `types`, `styles`)

## Phase 2: Core Feature Implementation

*   [ ] **Data Fetching & Types:**
    *   [ ] Define TypeScript interfaces for API response in `src/types/launchTypes.ts`
    *   [ ] Implement API service function in `src/services/launchService.ts` to fetch next 5 launches
    *   [ ] Implement custom hook `src/hooks/useLaunchData.ts` to manage data fetching state (loading, error, data)
*   [ ] **Basic App Structure:**
    *   [ ] Implement main `App.tsx` component
    *   [ ] Integrate `useLaunchData` hook in `App.tsx`
    *   [ ] Implement basic loading state display in `App.tsx` (e.g., using `LoadingSpinner.tsx`)
    *   [ ] Implement basic error state display in `App.tsx` (e.g., using `ErrorMessage.tsx`)
*   [ ] **Carousel Implementation:**
    *   [ ] Create `LaunchCarousel.tsx` component
    *   [ ] Create `LaunchCard.tsx` component
    *   [ ] Create `CarouselNav.tsx` component (for Next/Prev buttons)
    *   [ ] Pass launch data from `App.tsx` to `LaunchCarousel.tsx`
    *   [ ] Implement basic rendering of launch cards in `LaunchCarousel.tsx` using `LaunchCard.tsx`
    *   [ ] Style `LaunchCard.tsx` using Tailwind CSS to display required launch info
    *   [ ] Implement state management for the active carousel index in `LaunchCarousel.tsx`
    *   [ ] Implement navigation logic (Next/Prev button clicks) in `LaunchCarousel.tsx` / `CarouselNav.tsx`
*   [ ] **Coverflow Effect:**
    *   [ ] Apply CSS perspective and transform-style to the carousel container
    *   [ ] Implement dynamic CSS transforms (`translateX`, `scale`, `rotateY`) and `z-index` on `LaunchCard.tsx` based on relative position to the active index
    *   [ ] Add smooth CSS transitions for carousel navigation
    *   [ ] Refine animation timing and easing

## Phase 3: Styling & Polish

*   [ ] Add application header/title
*   [ ] Refine overall page layout and centering using Tailwind
*   [ ] Apply consistent color scheme and typography via Tailwind config/classes
*   [ ] Implement responsive design adjustments for tablet and mobile
    *   [ ] Test Coverflow effect on smaller screens
    *   [ ] Adapt carousel display if needed (simplify effect or switch layout)
*   [ ] Add accessibility features (ARIA attributes, keyboard navigation)
*   [ ] Add optional enhancements (e.g., links on cards, tags display)

## Phase 4: Finalization & Documentation

*   [ ] Code review and refactoring
*   [ ] Add unit tests (if applicable/required)
*   [ ] Update `README.md` with setup and run instructions
*   [ ] Final check of all checklist items 