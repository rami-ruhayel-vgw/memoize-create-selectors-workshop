# Solution Guide for Part 2: createSelector()

This file contains hints and solutions for the createSelector workshop. Use this to help guide students when they get stuck, but encourage them to solve it themselves first!

**Note**: Students should complete Part 1 (memoize) first!

## Key Concepts

1. **Memoization**: Cache results based on input selector results
2. **Input Selectors**: Extract values from state
3. **Result Function**: Combines input selector results into final output
4. **Reference Equality**: Return same reference when inputs haven't changed
5. **Two-Level Memoization**: Memoize both the selector and the result function

## Implementation Approach

### Step 1: Basic Structure

```typescript
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract input selectors and result function
  const resultFunc = args.pop() as Function
  const inputSelectors = Array.isArray(args[0]) ? args[0] : args
  
  // Memoize based on input selector results
  const memoizedResultFunc = memoize(resultFunc)
  
  // Return selector function
  return function selector(state: any, ...params: any[]) {
    // Get results from input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function
    return memoizedResultFunc(...inputResults)
  }
}
```

### Step 2: Handle Reference Equality

The key insight is that we need to memoize based on the **results** of input selectors, not the state itself. We need two levels of memoization:

1. Memoize the input selector results (argsMemoize) - this is the selector itself
2. Memoize the result function based on those results

### Step 3: Complete Solution

Here's a more complete solution that handles all the requirements:

```typescript
import { memoize } from '../src/memoize'

type Selector<State, Result, Params extends unknown[] = []> = (
  state: State,
  ...params: Params
) => Result

type AnySelector = Selector<any, any, any[]>

export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selectors (array or separate args)
  const inputSelectors = Array.isArray(args[0]) ? args[0] : args
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Track recomputations
  let recomputations = 0
  let lastResult: Result
  
  // Memoize the selector itself (argsMemoize)
  // This ensures we return the same reference when input selector results are the same
  const memoizedSelector = memoize(function selector(state: any, ...params: any[]) {
    // Get results from all input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function with input results
    const result = memoizedResultFunc(...inputResults)
    
    recomputations++
    lastResult = result
    
    return result
  })
  
  // Attach bonus properties
  return Object.assign(memoizedSelector, {
    recomputations: () => recomputations,
    lastResult: () => lastResult
  })
}
```

## Common Student Challenges

1. **Forgetting to memoize the selector itself**: Students often only memoize the result function, but forget that the selector also needs to memoize based on its arguments.

2. **Reference equality**: Students might not understand that they need to return the same reference when input selector results are the same (even if the state object is different).

3. **Extracting input selectors**: Handling both array and separate arguments can be tricky.

4. **Understanding the two-level memoization**:
   - First level: Memoize input selector results (argsMemoize)
   - Second level: Memoize result function based on input results

## Hints to Give Students

- Start simple: Just get basic memoization working first
- Think about what should trigger a recomputation
- Remember: we memoize based on input selector **results**, not the state
- Use the `memoize` function you built in Part 1
- Test with simple cases first, then build up complexity

## Extension Ideas

If students finish early, they can:
- Implement their own memoization function instead of using the helper
- Add support for custom equality functions
- Implement `createSelectorCreator` pattern
- Add TypeScript types properly
- Explore the real Reselect implementation

