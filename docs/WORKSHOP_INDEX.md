# Workshop Files Index

This workshop teaches engineers how to build `memoize()` and `createSelector()` using TDD.

## 📁 Files Overview

### For Students

#### Part 1: memoize()
- **`src/memoize.ts`** - Empty implementation file where students write their code
- **`tests/memoize.test.ts`** - Progressive test suite that guides implementation
- **`docs/MEMOIZE_SOLUTION.md`** - Hints and solution guide for Part 1

#### Part 2: createSelector()
- **`src/createSelector.ts`** - Empty implementation file (uses memoize from Part 1!)
- **`tests/createSelector.test.ts`** - Progressive test suite that guides implementation
- **`docs/SOLUTION.md`** - Hints and solution guide for Part 2

#### Reference Solutions
- **`solutions/memoize.solution.ts`** - Complete reference implementation for Part 1
- **`solutions/createSelector.solution.ts`** - Complete reference implementation for Part 2

### Documentation
- **`README.md`** - Main repository README
- **`docs/README.md`** - Main workshop documentation with instructions and examples
- **`docs/QUICK_START.md`** - Quick start guide to get coding immediately
- **`docs/INSTRUCTOR_GUIDE.md`** - Comprehensive guide for facilitating the workshop
- **`docs/WORKSHOP_INDEX.md`** - This file - file index and overview

### Configuration
- **`package.json`** - Package configuration with dependencies
- **`tsconfig.json`** - TypeScript configuration
- **`vitest.config.mts`** - Vitest test configuration
- **`.devcontainer/devcontainer.json`** - GitHub Codespaces configuration

## 🎯 Workshop Flow

### Part 1: memoize() (Start Here!)

1. **Read** `docs/README.md` or `docs/QUICK_START.md` to understand the workshop
2. **Run** tests: `yarn test tests/memoize.test.ts`
3. **Enable** one test at a time by removing `.skip`
4. **Implement** functionality in `src/memoize.ts` one test at a time
5. **Follow TDD**: Red → Green → Refactor
6. **Complete** all 5 steps progressively

### Part 2: createSelector()

1. **Ensure** Part 1 is complete (memoize must work!)
2. **Run** tests: `yarn test tests/createSelector.test.ts`
3. **Enable** one test at a time by removing `.skip`
4. **Implement** functionality in `src/createSelector.ts` using your memoize()
5. **Follow TDD**: Red → Green → Refactor
6. **Complete** all 5 steps progressively

## 📚 Test Structure

### Part 1: memoize() Tests

1. **Step 1**: Basic Memoization with Primitives (5 tests)
   - Simple memoization
   - Function call tracking
   - Different primitive types
   - Null and undefined

2. **Step 2**: Memoization with Objects (3 tests)
   - Reference equality
   - Arrays as arguments
   - Nested objects

3. **Step 3**: Circular References (3 tests)
   - Simple circular refs
   - Deep circular refs
   - Reference equality with circular refs

4. **Step 4**: Functions as Arguments (3 tests)
   - Functions as arguments
   - Different function references
   - Mixed arguments

5. **Step 5**: Complex Scenarios (6 tests)
   - Multiple argument types
   - Result reference equality
   - Empty objects/arrays
   - Functions returning functions
   - Date and RegExp objects

6. **Integration Tests** (3 tests)
   - createSelector-like usage
   - Multiple arguments
   - Performance

### Part 2: createSelector() Tests

1. **Step 1**: Basic Memoization (3 tests)
   - Simple memoization
   - Recomputation tracking
   - Result function call tracking

2. **Step 2**: Multiple Input Selectors (3 tests)
   - Multiple inputs
   - Recomputation when any input changes
   - Passing all inputs to result function

3. **Step 3**: Flexible Arguments (3 tests)
   - Array format
   - Separate arguments format
   - Both formats work identically

4. **Step 4**: Result Reference Equality (2 tests)
   - Same reference when inputs unchanged
   - New reference when inputs change

5. **Step 5**: Bonus Features (3 tests)
   - Recomputation tracking
   - Last result access
   - Additional parameters support

6. **Integration Tests** (2 tests)
   - Nested selectors
   - Complex real-world scenarios

## 🚀 Quick Commands

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run Part 1 tests
yarn test tests/memoize.test.ts

# Run Part 2 tests
yarn test tests/createSelector.test.ts
```

## 📖 Learning Path

### Part 1: memoize()
1. **Understand Primitives** - Start with simple values
2. **Understand Objects** - Learn reference equality
3. **Handle Circular Refs** - Don't crash on circular structures
4. **Handle Functions** - Functions are objects too
5. **Combine Everything** - Complex scenarios

### Part 2: createSelector()
1. **Understand the Problem** - Read examples in docs/README.md
2. **Use Your memoize()** - Apply what you learned
3. **Build Incrementally** - One test at a time
4. **Understand Concepts** - Reference equality, memoization
5. **Apply Knowledge** - Use in real scenarios

## 💡 Key Concepts Taught

### Part 1
- **Memoization**: Caching results based on inputs
- **WeakMap vs Map**: When to use which
- **Reference Equality**: Objects compared by identity
- **Circular References**: Handle without crashing
- **Tree Structure**: Navigate cache nodes

### Part 2
- **Memoization**: Caching results based on inputs
- **Reference Equality**: Returning same reference for optimization
- **TDD Workflow**: Red-Green-Refactor cycle
- **Incremental Development**: Building complexity step by step
- **Function Composition**: Combining selectors
- **Two-Level Memoization**: Memoize both selector and result function

## 🎓 Suggested Duration

### Part 1: memoize()
- **Beginner**: 2-3 hours
- **Intermediate**: 1.5-2 hours
- **Advanced**: 1 hour

### Part 2: createSelector()
- **Beginner**: 2-3 hours
- **Intermediate**: 1.5-2 hours
- **Advanced**: 1 hour

### Total
- **Beginner**: 4-6 hours
- **Intermediate**: 3-4 hours
- **Advanced**: 2 hours

## ✅ Success Criteria

### Part 1: memoize()
Students have successfully completed Part 1 when:
- All memoize tests pass
- They can explain WeakMap vs Map
- They understand reference equality
- They can handle circular references
- They can handle functions as arguments

### Part 2: createSelector()
Students have successfully completed Part 2 when:
- All createSelector tests pass
- They can explain how memoization works
- They understand why reference equality matters
- They can identify when a selector would recompute
- They can debug a failing selector

## 🔗 Related Resources

- [Reselect Documentation](https://reselect.js.org)
- Real Reselect repository: https://github.com/reduxjs/reselect

---

**Happy Teaching!** 🎉

