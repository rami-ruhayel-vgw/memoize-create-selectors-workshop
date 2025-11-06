/**
 * SOLUTION FILE - Step-by-Step Solutions
 * 
 * This file shows incremental solutions for each step of the memoize workshop.
 * Each section builds on the previous one, showing only what needs to be added
 * or changed to pass that step's tests.
 * 
 * To use: Uncomment the solution for the step you're working on, and comment out
 * previous steps. Or copy the entire solution for your current step.
 */

// ============================================================================
// STEP 1: Basic Memoization with Primitives
// ============================================================================
// This solution handles primitives using JSON.stringify (safe for primitives)
// Note: This won't work correctly with objects/functions, but that's OK - Step 2 adds that

/*
export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  const cache = new Map<string, Result>()

  return function memoized(...args: Args): Result {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}
*/

// ============================================================================
// STEP 2: Memoization with Objects
// ============================================================================
// This solution adds WeakMap for objects/functions, keeping Map for primitives
// Uses a tree structure to handle multiple arguments

/*
function isPrimitive(value: unknown): boolean {
  return (
    value === null ||
    typeof value === 'undefined' ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  )
}

interface CacheNode<T> {
  objectCache: WeakMap<object | Function, CacheNode<T>> | null
  primitiveCache: Map<unknown, CacheNode<T>> | null
  result: T | undefined
  hasResult: boolean
}

function createCacheNode<T>(): CacheNode<T> {
  return {
    objectCache: null,
    primitiveCache: null,
    result: undefined,
    hasResult: false
  }
}

export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  let rootCache = createCacheNode<Result>()

  return function memoized(...args: Args): Result {
    let currentNode = rootCache

    for (const arg of args) {
      if (isPrimitive(arg)) {
        if (currentNode.primitiveCache === null) {
          currentNode.primitiveCache = new Map()
        }
        let nextNode = currentNode.primitiveCache.get(arg)
        if (nextNode === undefined) {
          nextNode = createCacheNode<Result>()
          currentNode.primitiveCache.set(arg, nextNode)
        }
        currentNode = nextNode
      } else {
        if (currentNode.objectCache === null) {
          currentNode.objectCache = new WeakMap()
        }
        let nextNode = currentNode.objectCache.get(arg as object | Function)
        if (nextNode === undefined) {
          nextNode = createCacheNode<Result>()
          currentNode.objectCache.set(arg as object | Function, nextNode)
        }
        currentNode = nextNode
      }
    }

    if (currentNode.hasResult) {
      return currentNode.result!
    }

    const result = fn(...args)
    currentNode.result = result
    currentNode.hasResult = true

    return result
  }
}
*/

// ============================================================================
// STEP 3: Circular References
// ============================================================================
// The Step 2 solution already handles circular references! WeakMap uses
// reference equality, so circular refs don't cause issues. No changes needed.
// The solution from Step 2 works for Step 3.

// ============================================================================
// STEP 4: Functions as Arguments
// ============================================================================
// The Step 2 solution already handles functions! Functions are treated as
// objects and stored in WeakMap. No changes needed.
// The solution from Step 2 works for Step 4.

// ============================================================================
// STEP 5: Complex Scenarios
// ============================================================================
// The Step 2 solution handles all complex scenarios:
// - Multiple arguments with different types (tree structure handles this)
// - Result reference equality (same result returned for same args)
// - Empty objects/arrays (treated as objects in WeakMap)
// - Functions returning functions (results are cached)
// - Date/RegExp objects (treated as objects in WeakMap)
// No changes needed - the solution from Step 2 works for Step 5.

// ============================================================================
// COMPLETE SOLUTION (All Steps)
// ============================================================================
// This is the final solution that passes all tests

function isPrimitive(value: unknown): boolean {
  return (
    value === null ||
    typeof value === 'undefined' ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  )
}

interface CacheNode<T> {
  objectCache: WeakMap<object | Function, CacheNode<T>> | null
  primitiveCache: Map<unknown, CacheNode<T>> | null
  result: T | undefined
  hasResult: boolean
}

function createCacheNode<T>(): CacheNode<T> {
  return {
    objectCache: null,
    primitiveCache: null,
    result: undefined,
    hasResult: false
  }
}

export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  let rootCache = createCacheNode<Result>()

  return function memoized(...args: Args): Result {
    let currentNode = rootCache

    for (const arg of args) {
      if (isPrimitive(arg)) {
        if (currentNode.primitiveCache === null) {
          currentNode.primitiveCache = new Map()
        }
        let nextNode = currentNode.primitiveCache.get(arg)
        if (nextNode === undefined) {
          nextNode = createCacheNode<Result>()
          currentNode.primitiveCache.set(arg, nextNode)
        }
        currentNode = nextNode
      } else {
        if (currentNode.objectCache === null) {
          currentNode.objectCache = new WeakMap()
        }
        let nextNode = currentNode.objectCache.get(arg as object | Function)
        if (nextNode === undefined) {
          nextNode = createCacheNode<Result>()
          currentNode.objectCache.set(arg as object | Function, nextNode)
        }
        currentNode = nextNode
      }
    }

    if (currentNode.hasResult) {
      return currentNode.result!
    }

    const result = fn(...args)
    currentNode.result = result
    currentNode.hasResult = true

    return result
  }
}

