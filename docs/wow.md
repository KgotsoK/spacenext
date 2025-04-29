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