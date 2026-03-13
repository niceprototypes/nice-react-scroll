# Contributing to nice-react-scroll

Thank you for your interest in contributing to nice-react-scroll! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Push to your fork
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/nice-react-scroll.git
cd nice-react-scroll

# Install dependencies
npm install

# Build the project
npm run build
```

### Project Structure

```
nice-react-scroll/
├── src/
│   ├── components/          # React components
│   │   ├── FadeOnScroll/   # Fade on scroll component
│   │   ├── SectionLinks/   # Section navigation component
│   │   ├── Sticky/         # Sticky positioning components
│   │   └── StickySection/  # Section wrapper component
│   ├── hooks/              # React hooks
│   │   └── useScroll.ts    # Scroll position hook
│   ├── ScrollProvider.tsx  # Main scroll provider
│   └── index.ts            # Public API exports
├── dist/                   # Compiled output (generated)
├── README.md               # Main documentation
├── CHANGELOG.md            # Version history
└── tsconfig.json           # TypeScript configuration
```

## Making Changes

### Creating a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - for new features
- `fix/` - for bug fixes
- `docs/` - for documentation changes
- `refactor/` - for code refactoring
- `perf/` - for performance improvements

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(sticky): add onStickyChange callback
fix(fade): correct opacity calculation at edge cases
docs(readme): update installation instructions
```

## Submitting Changes

### Before Submitting

1. **Build the project** - Ensure it builds without errors:
   ```bash
   npm run build
   ```

2. **Test your changes** - Make sure existing functionality still works

3. **Update documentation** - Update README.md, API.md, or add JSDoc comments as needed

4. **Update CHANGELOG.md** - Add your changes under an "Unreleased" section

### Pull Request Process

1. Push your changes to your fork
2. Open a pull request against the `main` branch
3. Fill out the pull request template
4. Wait for review

Your pull request should:
- Have a clear title and description
- Reference any related issues
- Include examples of the changes if applicable
- Update relevant documentation

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid using `any` type
- Export types for public APIs

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Add JSDoc comments to components

Example:
```typescript
/**
 * Component description
 *
 * Detailed explanation of what the component does.
 *
 * @param propName - Description of the prop
 *
 * @example
 * ```tsx
 * <Component propName="value" />
 * ```
 */
const Component: React.FC<Props> = ({ propName }) => {
  // Implementation
}
```

### Styling

- Use styled-components for styling
- Follow the existing pattern in the codebase
- Prefix transient props with `$` (e.g., `$isActive`)
- Keep styles co-located with components

### Code Style

- Use 2 spaces for indentation
- Use double quotes for strings
- Use semicolons
- Follow the existing code style
- Use meaningful variable and function names

## Testing

Currently, the project doesn't have automated tests, but we plan to add them soon. When testing your changes:

1. Test in different browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices
3. Test edge cases
4. Verify performance with DevTools

## Documentation

### JSDoc Comments

Add JSDoc comments to all exported functions, components, and types:

```typescript
/**
 * Brief description
 *
 * Detailed description with usage information.
 *
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 *
 * @example
 * ```tsx
 * exampleUsage()
 * ```
 */
```

### README Updates

If your changes affect the public API:
- Update the relevant sections in README.md
- Add or update examples
- Update the TypeScript types section if needed

### API Documentation

Update API.md if you:
- Add new components or hooks
- Change component props
- Add new features

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to the maintainers

Thank you for contributing!