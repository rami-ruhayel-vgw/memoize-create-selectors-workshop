# TDD Workshop: Building `memoize()` and `createSelector()` from Scratch

This workshop teaches you how to build your own versions of `memoize()` and `createSelector()` using Test-Driven Development (TDD).

## Workshop Structure

This workshop is divided into two parts:

### Part 1: Building `memoize()` (Start Here!)
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

## What You'll Learn

- How memoization works under the hood
- How to handle functions and circular references in memoization
- How `createSelector()` works internally
- How to use TDD to build complex functionality incrementally
- How to maintain reference equality for optimization (important for React!)

## Prerequisites

- Basic understanding of JavaScript/TypeScript
- Familiarity with testing (we'll use Vitest)
- Understanding of memoization concepts (we'll teach this!)

## Getting Started

### Part 1: Implement `memoize()`

1. Open `tests/memoize.test.ts` - This contains all the tests you'll need to make pass
2. Open `src/memoize.ts` - This is where you'll implement your solution
3. Run the tests: `yarn test tests/memoize.test.ts`

### Part 2: Implement `createSelector()`

1. Open `tests/createSelector.test.ts` - This contains all the tests
2. Open `src/createSelector.ts` - This is where you'll implement your solution
3. **Important**: You'll use the `memoize()` function you built in Part 1!
4. Run the tests: `yarn test tests/createSelector.test.ts`

**Note**: You may see some TypeScript warnings in the test files (implicit `any` types). This is intentional for the workshop - focus on making the tests pass rather than perfect types!

## How to Run the Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run specific test file
yarn test tests/memoize.test.ts
yarn test tests/createSelector.test.ts
```

## TDD Workflow

1. **Red**: Look at the next failing test
2. **Green**: Write the minimal code to make it pass
3. **Refactor**: Clean up your code while keeping tests green
4. **Repeat**: Move to the next test

## Part 1: Memoize Workshop Steps

1. **Step 1: Basic Memoization with Primitives** - Handle numbers, strings, booleans
2. **Step 2: Memoization with Objects** - Use reference equality for objects
3. **Step 3: Circular References** - Handle circular references without crashing
4. **Step 4: Functions as Arguments** - Memoize functions that take functions
5. **Step 5: Complex Scenarios** - Handle mixed types, Date, RegExp, etc.

## Part 2: CreateSelector Workshop Steps

1. **Step 1: Basic Memoization** - Single input selector with memoization
2. **Step 2: Multiple Input Selectors** - Support multiple input selectors
3. **Step 3: Flexible Arguments** - Support both array and separate arguments
4. **Step 4: Result Reference Equality** - Return same reference when inputs unchanged
5. **Step 5: Bonus Features** - Add recomputation tracking

## Using the Solutions

If you get stuck, you can refer to the solution files:
- `solutions/memoize.solution.ts` - Shows step-by-step solutions for each step
- `solutions/createSelector.solution.ts` - Shows step-by-step solutions for each step

Each solution file contains:
- Commented solutions for each step (showing what you'd write at that stage)
- A complete final solution at the bottom

**Try to solve it yourself first!** The solutions are there to help when you're truly stuck.

## Tips

- Start with the simplest test first
- Don't skip ahead - follow the test order
- Enable tests one at a time by removing `.skip`
- Read the test descriptions carefully - they explain what should happen
- For Part 2, you'll use your `memoize()` from Part 1
- Feel free to look at the solutions for hints, but try to solve it yourself first!

## What is `memoize()`?

`memoize()` is a function that caches the results of function calls based on their arguments. It:
- Returns the cached result if called with the same arguments
- Computes and caches a new result if called with different arguments
- Handles complex argument types (objects, functions, circular refs)

## What is `createSelector()`?

`createSelector()` is a function that creates memoized selector functions. It:
- Takes one or more "input selectors" (functions that extract values from state)
- Takes a "result function" (combiner) that computes a derived value from the input selector results
- Returns a memoized selector that only recomputes when the input selector results change
- Returns the same result reference when inputs haven't changed (important for React optimization)

## Example Usage

### Using `memoize()`:

```typescript
const expensiveCalculation = (x: number, y: number) => {
  console.log('Computing...')
  return x * y
}

const memoized = memoize(expensiveCalculation)

memoized(5, 10) // "Computing..." → 50
memoized(5, 10) // (cached) → 50 (no console.log)
memoized(3, 4)  // "Computing..." → 12
```

### Using `createSelector()`:

```typescript
const selectTodos = (state: RootState) => state.todos
const selectFilter = (state: RootState) => state.filter

const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => todos.filter(todo => todo.category === filter)
)

// First call - computes the result
const result1 = selectFilteredTodos(state) // ["todo1", "todo2"]

// Second call with same state - returns cached result (same reference!)
const result2 = selectFilteredTodos(state) // result2 === result1 (true!)

// Call with different state - recomputes
const result3 = selectFilteredTodos(newState) // new computation
```

## Next Steps After the Workshop

Once you've completed both parts:

- Explore the real Reselect library: https://github.com/reduxjs/reselect
- Learn about advanced features like `argsMemoize` and custom memoization
- Check out `createSelectorCreator` for creating custom selector creators
- Read the [Reselect documentation](https://reselect.js.org)

## Estimated Time

- **Part 1 (memoize)**: 1-2 hours
- **Part 2 (createSelector)**: 1-2 hours
- **Total**: 2-4 hours (depending on experience level)

Happy coding! 🚀

