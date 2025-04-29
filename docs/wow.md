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

## 3. Living Documents

**Crucially, this WoW document, the main specification, the recipes, and the checklist are *living documents*.**

As the SpaceNext project evolves:

*   New features may be added or existing ones modified (requiring updates to `main-spec.md` and `checklist.md`).
*   Development processes or conventions might change (requiring updates to relevant recipes in `docs/recipes/`).
*   The overall approach or tooling might shift (requiring updates to this `wow.md` file and potentially the spec/recipes).

It is the collective responsibility of the development team (including AI collaborators when applicable) to ensure these documents are kept **accurate and up-to-date**. When a change impacting the spec, checklist, or a recipe is made, the corresponding documentation **must be updated** as part of that change.

Referencing outdated documentation can lead to inconsistencies and errors. Always ensure you are referring to the latest versions available in the repository. 