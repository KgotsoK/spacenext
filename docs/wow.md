# SpaceNext: Ways of Working (WoW)

## 1. Purpose

This document outlines the established Ways of Working (WoW) for the **SpaceNext** project. It serves as a central reference point for developers and AI assistants collaborating on this codebase.

The primary goal is to ensure consistency, maintainability, and efficient development by providing easy access to project standards, architectural decisions, and procedural guides.

When interacting with an AI assistant for development tasks on this project, referencing this WoW document (`docs/wow.md`) is crucial to provide context about the project's specific conventions and documentation.

## 2. Core Documentation

The following documents form the foundation of our development process:

*   **Main Specification (`docs/specs/main-spec.md`):**
    *   Describes the project's goals, features, technology stack, UI/UX design, component structure, and core coding guidelines.
    *   This is the primary source of truth for *what* we are building and the overall technical approach.

*   **Development Recipes (`docs/recipes/`):**
    *   This directory contains step-by-step guides for common development tasks (e.g., creating components, adding service functions, defining types).
    *   These recipes ensure consistency in *how* specific, recurring tasks are performed according to project standards.

*   **Project Checklist (`docs/checklist.md`):**
    *   Provides a detailed, trackable list of setup tasks, features to implement, and polishing steps.
    *   Use this checklist to monitor progress and ensure all requirements are met. AI agents should mark items as complete (`[x]`) as they are finished.

## 3. AI Collaboration Guidelines

When working with AI assistants on this project, the following guidelines **must** be strictly followed:

*   **Exploration Before Action:**
    *   AI agents **must** thoroughly explore the project structure and read all relevant files before making any suggestions or changes.
    *   This includes reviewing the specification, relevant components, and existing implementation patterns.
    *   Never make assumptions about project structure, naming conventions, or implementation details.

*   **Question-driven Approach:**
    *   When faced with uncertainty, AI agents should ask specific questions to the user rather than making assumptions.
    *   Questions should be precise and aimed at clarifying requirements, confirming implementation approaches, or resolving ambiguities.

*   **Action Plan Requirement:**
    *   Before implementing any significant change, AI agents **must** provide a clear action plan outlining:
        *   The specific files to be created or modified
        *   The key changes to be made
        *   Any dependencies or considerations that might impact the implementation
    *   This plan must be confirmed by the user before proceeding with implementation.

*   **User Confirmation:**
    *   This is not a "YOLO" development environment. Stability and correctness are prioritized over speed.
    *   User confirmation is required before proceeding with any significant implementation or change.
    *   Breaking changes especially require explicit approval.

*   **Strict Adherence to Documentation:**
    *   Specifications and recipes **must** be followed strictly.
    *   Any deviation from documented standards requires explicit user approval and should be reflected in updated documentation.

*   **Incremental Changes:**
    *   Implement changes in smaller, logical increments rather than large, monolithic changes.
    *   This allows for easier review, testing, and rollback if necessary.

## 4. Living Documents

**Crucially, this WoW document, the main specification, the recipes, and the checklist are *living documents*.**

As the SpaceNext project evolves:

*   New features may be added or existing ones modified (requiring updates to `main-spec.md` and `checklist.md`).
*   Development processes or conventions might change (requiring updates to relevant recipes in `docs/recipes/`).
*   The overall approach or tooling might shift (requiring updates to this `wow.md` file and potentially the spec/recipes).

It is the collective responsibility of the development team (including AI collaborators when applicable) to ensure these documents are kept **accurate and up-to-date**. When a change impacting the spec, checklist, or a recipe is made, the corresponding documentation **must be updated** as part of that change.

Referencing outdated documentation can lead to inconsistencies and errors. Always ensure you are referring to the latest versions available in the repository. 

## 5. Working on Tickets with AI

When working on tickets with AI assistance, the following step-by-step workflow **must** be followed without deviation:

### 5.1. Ticket Selection

1. The AI agent will use the GitHub MCP tool to fetch a list of open issues from the repository.
2. The agent will present this list to the user and ask which issue to work on.
3. The user will select an issue number or provide the full issue details.

### 5.2. Architecture Phase

**CRITICAL: No implementation should occur during this phase.**

1. The AI agent will enter "architect mode" and:
   * Review the issue content in detail
   * Explore the project structure to understand the context
   * Examine related files and components
   * Research any unfamiliar concepts or requirements

2. The agent will formulate a detailed plan including:
   * Files to be created or modified
   * Technical approach for implementation
   * Impact analysis of the proposed changes
   * Any dependencies or potential challenges

3. **THE AGENT MUST NOT IMPLEMENT ANYTHING AT THIS STAGE.**

4. The agent will present the plan to the user for review and approval.

5. The user and agent will discuss the plan, potentially making revisions.

6. **The agent must not use any edit_file tools until explicitly authorized by the user.**

### 5.3. Git Workflow

Once the implementation plan is approved by the user, the agent will:

1. Switch to the `develop` branch:
   ```
   git checkout develop
   ```

2. Fetch the latest changes:
   ```
   git pull origin develop
   ```

3. Create a new branch with the naming convention `MII-XXXX`, where XXXX is the issue number:
   ```
   git checkout -b MII-2345
   ```

4. **Only after this git setup is complete** may the agent proceed with implementation.

### 5.4. Implementation Phase

1. The agent will implement the previously agreed-upon approach.
2. All changes must follow project coding standards and conventions.
3. The agent should make incremental, logical commits if the implementation is complex.

### 5.5. Testing and Iteration

1. Once implementation is complete, the agent will ask the user to test the changes.
2. Based on feedback, the agent will make necessary adjustments.
3. This test-feedback-adjust cycle continues until the user is satisfied.

### 5.6. Code Submission

1. The agent will commit the code with an appropriate message following the format:
   ```
   MII-XXXX: Brief description of the changes
   ```
   Example: `MII-2345: Fixed bug where drop down menu never closes once opened.`

2. The agent will push the branch to the remote repository:
   ```
   git push origin MII-2345
   ```

3. The agent will create a Pull Request to merge into `develop` using the GitHub MCP tool.

### 5.7. CI/CD and Notification

1. The agent will run the CI job to deploy changes to the testing environment using the Github MCP tool:
   * The agent must trigger the `deploy-spacenow.yml` workflow in the `.github/workflows` directory
   * For the test environment, this workflow deploys to a preview environment when targeting the `develop` branch

2. Using the Microsoft Teams MCP tool, the agent will send a notification to the "Daily SU" channel:
   * Informing testers that changes are ready for testing
   * Providing information on how to access the testing environment (using the preview URL from the GitHub Pages workflow)
   * Including a link to the Pull Request
   * Sample message format: "SpaceNext PR #123 has been deployed to the testing environment. Preview URL: [URL]. Please test and provide feedback." 