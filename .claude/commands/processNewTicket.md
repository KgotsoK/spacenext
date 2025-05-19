## JADE Slash Command: Process New GitHub Ticket

**Purpose:** To autonomously find an unassigned ticket, understand, implement, test, and create a Pull Request for it.
**Invoked as:** `/project:processNewTicket` (No arguments are passed from the orchestrator)

**YOU MUST FOLLOW THESE STEPS PRECISELY:**

0.  **Find a Suitable Ticket:**
    *   Reference `CLAUDE.md` under "Identifying Work - New Tickets Workflow" for detailed instructions on how to find a suitable ticket.
    *   Use `gh search issues --repo KgotsoK/spacenext "is:open no:assignee -linked:pr" --sort created --order asc --limit 1 --json number,title,body` to find the oldest suitable ticket. You may need to parse this JSON output.
    *   If no suitable ticket is found, output "No suitable new ticket found to process." to STDOUT and **STOP EXECUTION** of this command.
    *   If a ticket is found, store its number as `TICKET_ID`, its title as `TICKET_TITLE`, and its body as `TICKET_BODY` for use in subsequent steps.
    *   Output to STDOUT: `Found ticket #TICKET_ID to process: TICKET_TITLE`

1.  **Understand the Task (using the found `TICKET_ID`):**
    *   Use `gh issue view $TICKET_ID` to get the full details of the ticket.
    *   Analyze the ticket description (`$TICKET_BODY`), comments, and any linked resources to fully understand the requirements.
    *   Consult `CLAUDE.md` for project context, tech stack, and coding standards.

2.  **Setup Branch (using the found `TICKET_ID` and `TICKET_TITLE`):**
    *   Ensure you are in the `/app/repo` directory (the `spacenext` project root).
    *   Run `git checkout main` to switch to the main branch.
    *   Run `git pull origin main` to get the latest changes.
    *   Create a new feature branch: `BRANCH_NAME="feature/$TICKET_ID-$(echo "$TICKET_TITLE" | tr '[:upper:]' '[:lower:]' | tr -s '[:punct:][:space:]' '-' | cut -c1-50)"` and then `git checkout -b $BRANCH_NAME`.

3.  **Implement Changes:**
    *   Identify the relevant files in the `spacenext` codebase (`/app/repo/src/...`).
    *   Implement the required code changes based on the ticket requirements and project standards outlined in `CLAUDE.md`.
    *   Write clean, maintainable, and well-documented TypeScript/React code.

4.  **Test (If applicable and configured - see `CLAUDE.md`):**
    *   [User: Based on `CLAUDE.md` section 2 (Testing), specify test steps here. e.g., "Run unit tests using `npm run test`."]
    *   [User: "If creating new components, write corresponding unit tests."]
    *   **YOU MUST** ensure all existing tests pass. If you add new features, **YOU MUST** add new tests.
    *   If tests fail, analyze the errors and fix the code OR the tests until they pass.

5.  **Lint and Format:**
    *   Run `npm run lint`. **YOU MUST** fix all linting errors and warnings reported.
    *   Run `npm run format` to ensure consistent code style.

6.  **Build:**
    *   Run `npm run build`. **YOU MUST** ensure the project builds successfully without errors.
    *   If the build fails, analyze errors and fix them.

7.  **Commit Changes (using the found `TICKET_ID`):**
    *   Stage all your changes: `git add .`
    *   Create a descriptive commit message following the Conventional Commits standard defined in `CLAUDE.md`. The commit message **MUST** reference the ticket ID. Example: `git commit -m "feat(feature-area): implement feature for ticket $TICKET_ID (Closes #$TICKET_ID)"` (Replace `feature-area` and description).

8.  **Push Branch (using the determined `BRANCH_NAME`):**
    *   Push your feature branch to the remote repository: `git push origin $BRANCH_NAME`.

9.  **Create Pull Request (using the found `TICKET_ID` and `TICKET_TITLE`):**
    *   Use the `gh` CLI to create a Pull Request.
    *   Target the `main` branch.
    *   The PR title **MUST** be: `feat: $TICKET_TITLE (Closes #$TICKET_ID)`.
    *   The PR body **MUST** include:
        *   A summary of changes.
        *   How to test the changes (if applicable).
        *   A clear link to the original ticket: `Addresses #$TICKET_ID`.
    *   Example `gh` command (adjust if more details are needed in the body directly):
        `gh pr create --base main --title "feat: $TICKET_TITLE (Closes #$TICKET_ID)" --body "Implemented feature as described in ticket #$TICKET_ID. $(echo -e '- Summary of changes...\n- How to test...')"`

10. **Output PR URL:**
    *   After the PR is successfully created, `gh pr create` usually outputs the PR URL to STDOUT.
    *   **YOU MUST** ensure that the *last line* of your STDOUT is the full URL of the newly created Pull Request. Example: `https://github.com/KgotsoK/spacenext/pull/123`.
    *   If PR creation fails, output a clear error message to STDOUT explaining why.

**Self-Correction:** If any step fails (e.g., build, tests, linting), analyze the output, try to fix it, and re-run the step. Document significant issues or fixes in your commit messages or as a comment if you cannot proceed. 