# Reselect TDD Workshop

A hands-on workshop teaching engineers how to build `memoize()` and `createSelector()` from scratch using Test-Driven Development (TDD).

## Quick Start

### Using GitHub Codespaces
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/rami-ruhayel-vgw/memoize-create-selectors-workshop)

1. Click the badge above or open this repository in GitHub Codespaces
2. The container will automatically install dependencies
3. Start coding!

### Local Setup

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch
```

## Workshop Overview

This workshop is divided into two parts:

### Part 1: Building `memoize()` 
Learn to build a robust memoization function that handles:
- Primitives (numbers, strings, booleans, null, undefined)
- Objects (with reference equality)
- Functions as arguments
- Circular references (without crashing!)

### Part 2: Building `createSelector()`
Once you've completed `memoize()`, use it to build `createSelector()`:
- Multiple input selectors
- Memoization based on input selector results
- Reference equality for optimization

## Getting Started

1. **Read the workshop guide**: See `docs/README.md` for detailed instructions
2. **Start with Part 1**: Implement `memoize()` in `src/memoize.ts`
3. **Run tests**: Enable tests one at a time by removing `.skip` in `tests/memoize.test.ts`
4. **Move to Part 2**: Implement `createSelector()` in `src/createSelector.ts`

## Project Structure

```
workshop-repository/
├── .devcontainer/          # GitHub Codespaces configuration
├── src/                    # Your implementation files
│   ├── memoize.ts         # Part 1: Implement memoize() here
│   └── createSelector.ts  # Part 2: Implement createSelector() here
├── tests/                  # Test files (all skipped by default)
│   ├── memoize.test.ts
│   └── createSelector.test.ts
├── solutions/              # Step-by-step solutions (if you get stuck)
│   ├── memoize.solution.ts
│   └── createSelector.solution.ts
└── docs/                   # Workshop documentation
    ├── README.md           # Main workshop guide
    ├── QUICK_START.md      # Quick start guide
    ├── INSTRUCTOR_GUIDE.md # For instructors
    └── ...
```

## TDD Workflow

1. **Enable ONE test** at a time (remove `.skip`)
2. **Run the test** (it should fail - RED)
3. **Write minimal code** to make it pass (GREEN)
4. **Refactor** if needed
5. **Repeat** with the next test

## Documentation

- **[Main Workshop Guide](docs/README.md)** - Complete workshop instructions
- **[Quick Start](docs/QUICK_START.md)** - Get coding in 3 steps
- **[Instructor Guide](docs/INSTRUCTOR_GUIDE.md)** - For workshop facilitators
- **[Solutions](solutions/)** - Step-by-step solutions (try yourself first!)

## Estimated Time

- **Part 1 (memoize)**: 1-2 hours
- **Part 2 (createSelector)**: 1-2 hours
- **Total**: 2-4 hours (depending on experience level)

## Requirements

- Node.js 18+
- Yarn 4.4.1+ (or npm)
- TypeScript knowledge helpful but not required

## License

MIT

## Contributing

This is a workshop repository. Feel free to:
- Report issues
- Suggest improvements
- Share your solutions (after completing the workshop!)

Happy coding! 🚀

