# Recipe: Creating a New React Component

This recipe outlines the steps for creating a new, reusable React component within the SpaceNext project.

**Context:** Follow these steps when adding a new UI element or logical grouping that will be used within the application.

**Prerequisites:** Familiarity with React, TypeScript, and the project's structure (`docs/specs/main-spec.md#6-proposed-component-structure`).

## Steps

1.  **Determine Location:**
    *   **General UI:** If the component is a generic UI element (e.g., Button, Modal, Spinner), place it within `src/components/UI/`.
    *   **Feature-Specific:** If the component is specific to a feature (e.g., `LaunchCard` within the `LaunchCarousel`), place it within the feature's directory (e.g., `src/components/LaunchCarousel/`).
    *   Create a new directory for the component using `PascalCase` (e.g., `src/components/UI/NewButton/`).

2.  **Create Component File:**
    *   Inside the component's directory, create the main component file named `ComponentName.tsx` (e.g., `NewButton.tsx`).

3.  **Define Component:**
    *   Use a functional component structure.
    *   Define props using a TypeScript `interface` or `type` within the same file or imported from `src/types/` if shared.
    *   Example:
        ```typescript
        import React from 'react';

        interface NewButtonProps {
          label: string;
          onClick: () => void;
          variant?: 'primary' | 'secondary';
        }

        const NewButton: React.FC<NewButtonProps> = ({ label, onClick, variant = 'primary' }) => {
          // Basic styling example with Tailwind
          const baseStyle = 'px-4 py-2 rounded font-semibold';
          const variantStyle = variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';

          return (
            <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>
              {label}
            </button>
          );
        };

        export default NewButton;
        ```

4.  **Add Styling:**
    *   Use Tailwind CSS utility classes directly within the JSX as shown above.
    *   For more complex or reusable style patterns within the component, define them as constants or helper functions.
    *   If styles are too complex for Tailwind utilities alone, create a corresponding CSS module (`ComponentName.module.css`) or add to a shared CSS file (`src/styles/`) and import/apply classes appropriately.

5.  **Add Unit Tests (Optional but Recommended):**
    *   Create a test file `ComponentName.test.tsx` in the same directory.
    *   Use a testing library (e.g., React Testing Library) to write tests covering the component's rendering and behavior.

6.  **Export Component:**
    *   Consider creating an `index.ts` file in the component's directory (`src/components/UI/NewButton/index.ts`) to simplify imports:
        ```typescript
        export { default } from './NewButton';
        // Optionally export related types/interfaces if needed
        // export * from './NewButton';
        ```
    *   This allows importing like `import NewButton from '@/components/UI/NewButton';` instead of `.../NewButton/NewButton';` (assuming path aliases are set up).

7.  **Update Documentation (If Necessary):**
    *   If the component introduces significant new UI patterns or is highly reusable, consider documenting its usage (props, variants) perhaps in a Storybook or similar documentation tool if one is added to the project.

## Coding Guidelines Checklist:

*   [ ] Component named in `PascalCase`?
*   [ ] Functional component used?
*   [ ] Props typed with TypeScript `interface` or `type`?
*   [ ] Styling primarily via Tailwind utilities?
*   [ ] Logic separated appropriately?
*   [ ] Component exported correctly (consider `index.ts`)? 