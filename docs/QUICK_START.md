# Quick Start Guide

Get started with the TDD workshop! This workshop has two parts - start with Part 1!

## Part 1: Building `memoize()` (Start Here!)

### Step 1: Run the Tests

```bash
yarn test tests/memoize.test.ts
```

You should see all tests failing (RED) - that's expected! We haven't implemented anything yet.

### Step 2: Start Implementing

Open `src/memoize.ts` and start implementing the functionality. 

**Tip**: Start with the first test in `Step 1: Basic Memoization with Primitives`. Make it pass before moving on!

### Step 3: Follow TDD

1. **Read the test** - Understand what it expects
2. **Enable the test** - Remove `.skip` from the test you want to work on
3. **Run the test** - See it fail (RED)
4. **Write minimal code** - Just enough to make it pass
5. **Run the test** - See it pass (GREEN)
6. **Refactor** - Clean up if needed
7. **Repeat** - Move to the next test

### Example: Your First Test

Look at this test:

```typescript
it.skip('should memoize a function with primitive arguments', () => {
  const add = (a: number, b: number) => a + b
  const memoizedAdd = memoize(add)

  const result1 = memoizedAdd(2, 3)
  const result2 = memoizedAdd(2, 3)

  expect(result1).toBe(5)
  expect(result2).toBe(5)
  expect(result1).toBe(result2)
})
```

1. Remove `.skip` to enable it
2. Run the test - it should fail (RED)
3. Implement just enough in `src/memoize.ts` to make it pass
4. Run again - it should pass (GREEN)

**Your task**: Implement just enough to make this test pass!

## Part 2: Building `createSelector()`

Once you've completed Part 1 and have a working `memoize()` function:

### Step 1: Run the Tests

```bash
yarn test tests/createSelector.test.ts
```

### Step 2: Use Your `memoize()` Implementation

Open `src/createSelector.ts`. You'll use the `memoize()` function you built in Part 1!

The file already imports it:
```typescript
import { memoize } from './memoize'
```

### Step 3: Follow TDD (Same as Part 1)

Start with the first test and work through them one by one.

## Testing in Watch Mode

To automatically run tests when you save:

```bash
# For Part 1
yarn test:watch tests/memoize.test.ts

# For Part 2
yarn test:watch tests/createSelector.test.ts
```

## Need Help?

- Read the main README.md in `docs/` for more context
- Check `solutions/` files for hints (but try yourself first!)
- Look at the solution guide files in `docs/` (but only after you've tried!)

## You've Got This! 🚀

Remember: TDD is about small steps. Don't try to solve everything at once. One test at a time!

