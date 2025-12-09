# GitHub Actions Workflows

This directory contains the GitHub Actions workflows for the Physical AI & Humanoid Robotics textbook project.

## Workflows

### 1. Deploy to GitHub Pages (`deploy.yml`)
- Builds and deploys the Docusaurus site to GitHub Pages
- Runs on push to `main` branch
- Includes a test deployment step to ensure builds work correctly

### 2. Automated Testing (`test.yml`)
- Tests the build process with multiple Node.js versions
- Runs linting checks if ESLint is configured
- Runs tests if a testing library is present
- Ensures code quality before deployment

### 3. Link Validation (`link-validation.yml`)
- Checks for broken links in the documentation
- Validates HTML in built site
- Runs periodically to catch broken external links

### 4. Performance Optimization (`performance.yml`)
- Performs performance audits using Lighthouse CI
- Checks bundle sizes
- Monitors Core Web Vitals metrics

### 5. Code Quality (`code-quality.yml`)
- Lints JavaScript/JSX files
- Checks Markdown formatting
- Verifies code formatting with Prettier
- Ensures consistent code style across the project

### 6. Security Scan (`security.yml`)
- Performs security audit of dependencies
- Runs CodeQL analysis for security vulnerabilities
- Checks for known vulnerabilities in dependencies
- Runs weekly to catch newly discovered vulnerabilities

## Trigger Events

Most workflows are triggered by:
- Push to the `main` branch
- Pull requests targeting the `main` branch
- Periodic schedules (for link validation and security scans)

## Secrets Required

The deployment workflow requires no additional secrets as it uses GitHub's built-in `GITHUB_TOKEN` for authentication.