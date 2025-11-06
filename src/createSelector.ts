/**
 * TODO: Implement createSelector() using TDD!
 * 
 * IMPORTANT: Complete Part 1 (memoize) first! You'll use your memoize()
 * implementation here.
 * 
 * Start by reading the tests in createSelector.test.ts and implementing
 * the functionality one test at a time.
 * 
 * Basic structure you'll need:
 * - Accept input selectors (as array or separate arguments)
 * - Accept a result function (combiner)
 * - Memoize the result function based on input selector results
 * - Return a memoized selector function
 */

// Import the memoize function you built in Part 1!
import { memoize } from './memoize'

// Type definitions
type Selector<State, Result, Params extends unknown[] = []> = (
  state: State,
  ...params: Params
) => Result

type AnySelector = Selector<any, any, any[]>

// Your implementation goes here!
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // TODO: Implement this!
  throw new Error('Not implemented yet - start with the tests!')
}

