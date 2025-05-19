## JADE Slash Command: Address Pull Request Feedback

**Purpose:** To autonomously find one of your open Pull Requests with new feedback, understand the feedback, and implement the necessary changes.
**Invoked as:** `/project:addressPrFeedback` (No arguments are passed from the orchestrator)

**YOU MUST FOLLOW THESE STEPS PRECISELY:**

0.  **Find a Suitable PR with Feedback:**
    *   Reference `CLAUDE.md` under "Identifying Work - PR Feedback Workflow" for detailed instructions.
    *   Identify your GitHub username; it is available in the `JADE_GITHUB_USERNAME` environment variable.
    *   Use `gh pr list --repo KgotsoK/spacenext --author "@me" --state open --json number,title,updatedAt,headRefName --limit 10` to get your open PRs.
    *   For each PR, fetch its comments: `gh pr view PR_NUMBER --comments --json comments` (replace PR_NUMBER).
    *   Analyze comments to find a PR with recent, unaddressed feedback from users other than yourself (`JADE_GITHUB_USERNAME`).
    *   If multiple PRs have new feedback, you might prioritize the one with the most recent feedback or another relevant heuristic.
    *   If no suitable PR with actionable feedback is found, output "No PR with new actionable feedback found." to STDOUT and **STOP EXECUTION** of this command.
    *   If a PR is found, store its number as `PR_NUMBER`, its head ref name as `PR_BRANCH_NAME`.
    *   Consolidate the new, relevant comments into a single string variable `CONSOLIDATED_COMMENTS`.
    *   Output to STDOUT: `Found PR #PR_NUMBER (Branch: PR_BRANCH_NAME) with new feedback to address.`

1.  **Understand the Feedback (using found `PR_NUMBER` and `CONSOLIDATED_COMMENTS`):**
    *   Review the `CONSOLIDATED_COMMENTS`.
    *   Use `gh pr view $PR_NUMBER` to get full PR details and context if needed.
    *   Use `gh pr diff $PR_NUMBER` to see the current changes in the PR.
    *   Consult `CLAUDE.md` for project context, tech stack, and coding standards.

2.  **Setup Branch (using found `PR_BRANCH_NAME`):**
    *   Ensure you are in the `/app/repo` directory (the `spacenext` project root).
    *   Fetch the latest updates from the remote: `git fetch origin`.
    *   Checkout the PR branch: `git checkout $PR_BRANCH_NAME`.
    *   Ensure your local branch is up-to-date with its remote counterpart: `git pull origin $PR_BRANCH_NAME`.

3.  **Implement Changes:**
    *   Identify the relevant files in the `spacenext` codebase (`/app/repo/src/...`) based on the feedback.
    *   Implement the required code changes to address the comments and project standards outlined in `CLAUDE.md`.

4.  **Test (If applicable and configured - see `CLAUDE.md`):**
    *   [User: Based on `CLAUDE.md` section 2 (Testing), specify test steps here. e.g., "Run unit tests using `npm run test`."]
    *   **YOU MUST** ensure all existing tests pass. If you modify existing logic or add new functionality due to feedback, ensure tests cover these changes.
    *   If tests fail, analyze the errors and fix the code OR the tests until they pass.

5.  **Lint and Format:**
    *   Run `npm run lint`. **YOU MUST** fix all linting errors and warnings reported.
    *   Run `npm run format` to ensure consistent code style.

6.  **Build:**
    *   Run `npm run build`. **YOU MUST** ensure the project builds successfully without errors.
    *   If the build fails, analyze errors and fix them.

7.  **Commit Changes (using found `PR_NUMBER`):**
    *   Stage all your changes: `git add .`
    *   Create a descriptive commit message. Example: `fix(feedback): address review comments for PR #$PR_NUMBER - [brief summary of changes]` or `refactor(core): update logic based on PR #$PR_NUMBER feedback - [summary]`.
    *   The commit message **MUST** clearly indicate it's addressing feedback for PR #$PR_NUMBER.
    *   `git commit -m "fix(feedback): address review comments on PR #$PR_NUMBER - [your summary of changes]"`

8.  **Push Changes (to found `PR_BRANCH_NAME`):**
    *   Push your changes to the same PR branch: `git push origin $PR_BRANCH_NAME`.

9.  **Comment on Pull Request (using found `PR_NUMBER`):**
    *   Use `gh pr comment $PR_NUMBER --body "Addressed feedback: [Summarize what you changed based on the comments]. PTAL."` to notify reviewers that you've updated the PR.
    *   This step helps keep the communication loop active.

10. **Output Success Message:**
    *   **YOU MUST** output a success message to STDOUT. Example: `Successfully addressed feedback on PR #$PR_NUMBER and pushed changes.`
    *   If any step fails critically and you cannot proceed, output a clear error message to STDOUT explaining why.

**Self-Correction:** If any step fails (e.g., build, tests, linting), analyze the output, try to fix it, and re-run the step. Document significant issues or fixes in your commit messages. 