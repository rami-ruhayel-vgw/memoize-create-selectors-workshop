/**
 * TODO: Implement memoize() using TDD!
 * 
 * Start by reading the tests in memoize.test.ts and implementing
 * the functionality one test at a time.
 * 
 * Key requirements:
 * - Memoize function results based on arguments
 * - Handle primitives (numbers, strings, booleans, null, undefined)
 * - Handle objects (use reference equality, not deep equality)
 * - Handle functions as arguments
 * - Handle circular references in objects (don't crash!)
 * - Return the same result reference when called with same arguments
 * 
 * Hints:
 * - WeakMap is useful for objects/functions (allows garbage collection)
 * - Map is useful for primitives
 * - Reference equality (===) handles circular refs naturally
 * - JSON.stringify won't work for functions or circular refs
 */

// Your implementation goes here!
export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  // TODO: Implement this!
  throw new Error('Not implemented yet - start with the tests!')
}

