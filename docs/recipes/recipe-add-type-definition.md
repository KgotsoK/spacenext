# Recipe: Adding a New Type Definition

This recipe outlines the steps for adding new TypeScript type definitions (interfaces or types) to the SpaceNext project.

**Context:** Follow these steps when you need to define the structure of data, such as API responses, component props, or shared state.

**Prerequisites:** Familiarity with TypeScript syntax (`interface`, `type`, basic types, generics) and the project's structure (`docs/specs/main-spec.md#6-proposed-component-structure`).

## Steps

1.  **Determine Location:**
    *   **Shared/Domain Types:** If the type relates to a specific data domain (like launches, users) or is used across multiple features/components, place it in the relevant file within the `src/types/` directory (e.g., `launchTypes.ts`, `userTypes.ts`). Create a new file if a suitable one doesn't exist.
    *   **Component-Specific Props:** If the type definition is *only* used for the props of a single component, it can often be defined directly within that component's `.tsx` file for collocation.
    *   **Hook-Specific Types:** Similarly, types used solely within a custom hook can be defined within the hook's file.

2.  **Choose `interface` vs. `type`:**
    *   Use `interface` primarily for defining the shape of objects (e.g., API responses, component props). Interfaces can be extended and implemented.
    *   Use `type` for defining unions, intersections, primitives, tuples, or more complex type aliases.
    *   Be consistent within the project (the spec leans towards interfaces for object shapes).

3.  **Define the Type/Interface:**
    *   Use clear, descriptive names in `PascalCase`.
    *   Define all expected properties with their corresponding TypeScript types (e.g., `string`, `number`, `boolean`, `null`, `any[]`, or other defined types/interfaces).
    *   Use optional properties (`?`) for fields that may not always be present.
    *   Example (Adding a new type in `src/types/sharedTypes.ts`):
        ```typescript
        // src/types/sharedTypes.ts

        export interface PaginationInfo {
          currentPage: number;
          totalPages: number;
          pageSize: number;
          totalItems: number;
        }

        export type Status = 'idle' | 'loading' | 'success' | 'error';

        export interface ApiResponse<T> { // Example using generics
          data: T | null;
          error?: string | null;
          pagination?: PaginationInfo;
        }
        ```

4.  **Export the Type/Interface:**
    *   Ensure the type/interface is exported from its file if it needs to be used elsewhere.

5.  **Import and Use:**
    *   Import the type/interface where needed using an `import type { ... } from '...'` statement or a regular import.
    *   Use it to type variables, function parameters, return types, component props, etc.
        ```typescript
        // Example usage in a service or component
        import type { Status, ApiResponse } from '@/types/sharedTypes'; // Assuming path alias
        import type { UserProfile } from '@/types/userTypes';

        const [fetchStatus, setFetchStatus] = useState<Status>('idle');

        async function fetchUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
          // ... fetching logic ...
          // return { data: userProfileData };
        }
        ```

6.  **Update Related Code:**
    *   Refactor any related code (components, services, hooks) to utilize the new type definition for improved type safety.

## Coding Guidelines Checklist:

*   [ ] Type/Interface placed in the correct location (`src/types/` or collocated)?
*   [ ] Correct choice between `interface` and `type`?
*   [ ] Named using `PascalCase`?
*   [ ] Properties correctly typed?
*   [ ] Exported if shared?
*   [ ] Imported and used correctly where needed? 