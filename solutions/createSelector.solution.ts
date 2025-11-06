/**
 * SOLUTION FILE - Step-by-Step Solutions
 * 
 * This file shows incremental solutions for each step of the createSelector workshop.
 * Each section builds on the previous one, showing only what needs to be added
 * or changed to pass that step's tests.
 * 
 * IMPORTANT: You must complete Part 1 (memoize) first! This solution uses
 * the memoize function you built.
 * 
 * To use: Uncomment the solution for the step you're working on, and comment out
 * previous steps. Or copy the entire solution for your current step.
 */

import { memoize } from '../src/memoize'

type Selector<State, Result, Params extends unknown[] = []> = (
  state: State,
  ...params: Params
) => Result

type AnySelector = Selector<any, any, any[]>

// ============================================================================
// STEP 1: Basic Memoization
// ============================================================================
// This solution handles a single input selector and memoizes the result function

/*
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selector (assuming single selector for now)
  const inputSelector = args[0]
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Return selector function
  return function selector(state: any, ...params: any[]) {
    // Get result from input selector
    const inputResult = inputSelector(state, ...params)
    
    // Call memoized result function with input result
    return memoizedResultFunc(inputResult)
  }
}
*/

// ============================================================================
// STEP 2: Multiple Input Selectors
// ============================================================================
// This solution extends Step 1 to handle multiple input selectors

/*
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selectors (all args except the last one)
  const inputSelectors = args as AnySelector[]
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Return selector function
  return function selector(state: any, ...params: any[]) {
    // Get results from all input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function with all input results
    return memoizedResultFunc(...inputResults)
  }
}
*/

// ============================================================================
// STEP 3: Flexible Arguments
// ============================================================================
// This solution extends Step 2 to handle both array and separate arguments

/*
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selectors - handle both array and separate arguments
  const inputSelectors = Array.isArray(args[0]) ? args[0] : args
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Return selector function
  return function selector(state: any, ...params: any[]) {
    // Get results from all input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function with all input results
    return memoizedResultFunc(...inputResults)
  }
}
*/

// ============================================================================
// STEP 4: Result Reference Equality
// ============================================================================
// This solution extends Step 3 to memoize the selector itself, ensuring
// the same reference is returned when input selector results are the same

/*
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selectors - handle both array and separate arguments
  const inputSelectors = Array.isArray(args[0]) ? args[0] : args
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Memoize the selector itself (argsMemoize)
  // This ensures we return the same reference when input selector results are the same
  const memoizedSelector = memoize(function selector(state: any, ...params: any[]) {
    // Get results from all input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function with all input results
    return memoizedResultFunc(...inputResults)
  })
  
  return memoizedSelector
}
*/

// ============================================================================
// STEP 5: Bonus Features
// ============================================================================
// This solution extends Step 4 to add recomputation tracking and lastResult

/*
export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selectors - handle both array and separate arguments
  const inputSelectors = Array.isArray(args[0]) ? args[0] : args
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Track recomputations and last result
  let recomputations = 0
  let lastResult: Result
  
  // Memoize the selector itself (argsMemoize)
  const memoizedSelector = memoize(function selector(state: any, ...params: any[]) {
    // Get results from all input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function with all input results
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
*/

// ============================================================================
// COMPLETE SOLUTION (All Steps)
// ============================================================================
// This is the final solution that passes all tests

export function createSelector<InputSelectors extends AnySelector[], Result>(
  ...args: any[]
): any {
  // Extract result function (last argument)
  const resultFunc = args.pop() as (...args: any[]) => Result
  
  // Extract input selectors - handle both array and separate arguments
  const inputSelectors = Array.isArray(args[0]) ? args[0] : args
  
  // Memoize the result function
  const memoizedResultFunc = memoize(resultFunc)
  
  // Track recomputations and last result
  let recomputations = 0
  let lastResult: Result
  
  // Memoize the selector itself (argsMemoize)
  // This ensures we return the same reference when input selector results are the same
  const memoizedSelector = memoize(function selector(state: any, ...params: any[]) {
    // Get results from all input selectors
    const inputResults = inputSelectors.map(sel => sel(state, ...params))
    
    // Call memoized result function with all input results
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

