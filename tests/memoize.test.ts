/**
 * TDD Workshop: Building memoize() from Scratch
 * 
 * This test file guides you through building a robust memoize() function step by step.
 * Work through the tests in order, implementing just enough to make each test pass.
 * 
 * IMPORTANT: All tests are skipped by default. To enable a test:
 * 1. Remove `.skip` from the test you want to work on
 * 2. Run the test (it should fail - RED)
 * 3. Implement the minimal code to make it pass (GREEN)
 * 4. Refactor if needed
 * 5. Enable the next test and repeat
 * 
 * TDD Workflow:
 * 1. Enable ONE test at a time (remove `.skip`)
 * 2. Run the test (it should fail - RED)
 * 3. Implement the minimal code to make it pass (GREEN)
 * 4. Refactor if needed
 * 5. Enable the next test and repeat
 */

import { describe, it, expect, vi } from 'vitest'
import { memoize } from '../src/memoize'

// ============================================================================
// STEP 1: Basic Memoization with Primitives
// ============================================================================

describe('Step 1: Basic Memoization with Primitives', () => {
  it.skip('should memoize a function with primitive arguments', () => {
    const add = (a: number, b: number) => a + b
    const memoizedAdd = memoize(add)

    const result1 = memoizedAdd(2, 3)
    const result2 = memoizedAdd(2, 3)

    expect(result1).toBe(5)
    expect(result2).toBe(5)
    expect(result1).toBe(result2)
  })

  it.skip('should call the original function only once for same arguments', () => {
    const fn = vi.fn((x: number) => x * 2)
    const memoizedFn = memoize(fn)

    memoizedFn(5)
    memoizedFn(5) // Same arguments, should use cache

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it.skip('should recompute when arguments change', () => {
    const fn = vi.fn((x: number) => x * 2)
    const memoizedFn = memoize(fn)

    memoizedFn(5)
    memoizedFn(10) // Different arguments, should recompute

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it.skip('should handle different primitive types', () => {
    const fn = (str: string, num: number, bool: boolean) => `${str}-${num}-${bool}`
    const memoizedFn = memoize(fn)

    const result1 = memoizedFn('hello', 42, true)
    const result2 = memoizedFn('hello', 42, true)
    const result3 = memoizedFn('world', 42, true)

    expect(result1).toBe('hello-42-true')
    expect(result1).toBe(result2)
    expect(result3).toBe('world-42-true')
  })

  it.skip('should handle null and undefined', () => {
    const fn = (x: null | undefined) => x
    const memoizedFn = memoize(fn)

    const result1 = memoizedFn(null)
    const result2 = memoizedFn(null)
    const result3 = memoizedFn(undefined)
    const result4 = memoizedFn(undefined)

    expect(result1).toBe(null)
    expect(result1).toBe(result2)
    expect(result3).toBe(undefined)
    expect(result3).toBe(result4)
  })
})

// ============================================================================
// STEP 2: Memoization with Objects
// ============================================================================

describe('Step 2: Memoization with Objects', () => {
  it.skip('should memoize based on object reference equality', () => {
    const fn = (obj: { value: number }) => obj.value * 2
    const memoizedFn = memoize(fn)

    const obj1 = { value: 5 }
    const obj2 = { value: 5 } // Different reference, same value

    const result1 = memoizedFn(obj1)
    const result2 = memoizedFn(obj1) // Same reference
    const result3 = memoizedFn(obj2) // Different reference, same value

    expect(result1).toBe(10)
    expect(result1).toBe(result2) // Same reference should return cached result
    // obj2 is a different reference, so it should recompute
    expect(result3).toBe(10)
    expect(fn).toHaveBeenCalledTimes(2) // Called once for obj1, once for obj2
  })

  it.skip('should handle arrays as arguments', () => {
    const fn = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0)
    const memoizedFn = memoize(fn)

    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3] // Different reference

    const result1 = memoizedFn(arr1)
    const result2 = memoizedFn(arr1) // Same reference
    const result3 = memoizedFn(arr2) // Different reference

    expect(result1).toBe(6)
    expect(result1).toBe(result2)
    expect(result3).toBe(6)
  })

  it.skip('should handle nested objects', () => {
    const fn = (obj: { nested: { value: number } }) => obj.nested.value
    const memoizedFn = memoize(fn)

    const obj1 = { nested: { value: 42 } }
    const obj2 = { nested: { value: 42 } }

    const result1 = memoizedFn(obj1)
    const result2 = memoizedFn(obj1)
    const result3 = memoizedFn(obj2)

    expect(result1).toBe(42)
    expect(result1).toBe(result2)
    expect(result3).toBe(42)
  })
})

// ============================================================================
// STEP 3: Circular References
// ============================================================================

describe('Step 3: Circular References', () => {
  it.skip('should handle objects with circular references', () => {
    const fn = (obj: any) => obj.value
    const memoizedFn = memoize(fn)

    const circular: any = { value: 42 }
    circular.self = circular // Create circular reference

    // Should not throw when memoizing
    expect(() => {
      const result1 = memoizedFn(circular)
      const result2 = memoizedFn(circular)
      expect(result1).toBe(42)
      expect(result1).toBe(result2)
    }).not.toThrow()
  })

  it.skip('should handle deeply nested circular references', () => {
    const fn = (obj: any) => obj.level1.value
    const memoizedFn = memoize(fn)

    const obj: any = {
      level1: {
        value: 100,
        level2: {
          value: 200
        }
      }
    }
    obj.level1.level2.parent = obj.level1 // Create circular reference

    expect(() => {
      const result = memoizedFn(obj)
      expect(result).toBe(100)
    }).not.toThrow()
  })

  it.skip('should memoize circular objects by reference', () => {
    const fn = (obj: any) => obj.id
    const memoizedFn = memoize(fn)

    const circular1: any = { id: 1 }
    circular1.self = circular1

    const circular2: any = { id: 1 }
    circular2.self = circular2

    const result1 = memoizedFn(circular1)
    const result2 = memoizedFn(circular1) // Same reference
    const result3 = memoizedFn(circular2) // Different reference

    expect(result1).toBe(1)
    expect(result1).toBe(result2)
    expect(result3).toBe(1)
  })
})

// ============================================================================
// STEP 4: Functions as Arguments
// ============================================================================

describe('Step 4: Functions as Arguments', () => {
  it.skip('should handle functions as arguments', () => {
    const fn = (callback: (x: number) => number, value: number) => callback(value)
    const memoizedFn = memoize(fn)

    const callback1 = (x: number) => x * 2
    const callback2 = (x: number) => x * 2 // Different function, same behavior

    const result1 = memoizedFn(callback1, 5)
    const result2 = memoizedFn(callback1, 5) // Same function
    const result3 = memoizedFn(callback2, 5) // Different function reference

    expect(result1).toBe(10)
    expect(result1).toBe(result2)
    expect(result3).toBe(10)
  })

  it.skip('should distinguish between different function references', () => {
    const fn = (callback: () => string) => callback()
    const memoizedFn = memoize(fn)

    const callback1 = () => 'hello'
    const callback2 = () => 'hello' // Same behavior, different reference

    const result1 = memoizedFn(callback1)
    const result2 = memoizedFn(callback1)
    const result3 = memoizedFn(callback2)

    expect(result1).toBe('hello')
    expect(result1).toBe(result2)
    expect(result3).toBe('hello')
  })

  it.skip('should handle mixed arguments: functions and objects', () => {
    const fn = (callback: (x: number) => number, obj: { value: number }) =>
      callback(obj.value)
    const memoizedFn = memoize(fn)

    const callback = (x: number) => x * 2
    const obj1 = { value: 5 }
    const obj2 = { value: 5 }

    const result1 = memoizedFn(callback, obj1)
    const result2 = memoizedFn(callback, obj1) // Same function and object
    const result3 = memoizedFn(callback, obj2) // Same function, different object

    expect(result1).toBe(10)
    expect(result1).toBe(result2)
    expect(result3).toBe(10)
  })
})

// ============================================================================
// STEP 5: Complex Scenarios
// ============================================================================

describe('Step 5: Complex Scenarios', () => {
  it.skip('should handle multiple arguments with different types', () => {
    const fn = (
      str: string,
      num: number,
      obj: { id: number },
      arr: number[],
      callback: (x: number) => number
    ) => callback(arr.reduce((sum, n) => sum + n, num))
    const memoizedFn = memoize(fn)

    const obj = { id: 1 }
    const arr = [1, 2, 3]
    const callback = (x: number) => x * 2

    const result1 = memoizedFn('test', 10, obj, arr, callback)
    const result2 = memoizedFn('test', 10, obj, arr, callback)

    expect(result1).toBe(32) // (10 + 1 + 2 + 3) * 2
    expect(result1).toBe(result2)
  })

  it.skip('should return the same result reference for same arguments', () => {
    const fn = (obj: { values: number[] }) => obj.values.map(x => x * 2)
    const memoizedFn = memoize(fn)

    const obj = { values: [1, 2, 3] }

    const result1 = memoizedFn(obj)
    const result2 = memoizedFn(obj)

    // Should return the same reference (important for React optimization)
    expect(result1).toBe(result2)
    expect(result1).toEqual([2, 4, 6])
  })

  it.skip('should handle empty objects and arrays', () => {
    const fn = (obj: Record<string, unknown>, arr: unknown[]) => ({
      objKeys: Object.keys(obj).length,
      arrLength: arr.length
    })
    const memoizedFn = memoize(fn)

    const obj1 = {}
    const arr1: unknown[] = []
    const obj2 = {}
    const arr2: unknown[] = []

    const result1 = memoizedFn(obj1, arr1)
    const result2 = memoizedFn(obj1, arr1) // Same references
    const result3 = memoizedFn(obj2, arr2) // Different references

    expect(result1).toEqual({ objKeys: 0, arrLength: 0 })
    expect(result1).toBe(result2)
    expect(result3).toEqual({ objKeys: 0, arrLength: 0 })
  })

  it.skip('should handle functions that return functions', () => {
    const fn = (x: number) => (y: number) => x + y
    const memoizedFn = memoize(fn)

    const result1 = memoizedFn(5)
    const result2 = memoizedFn(5)

    expect(result1).toBe(result2) // Same function reference
    expect(result1(10)).toBe(15)
    expect(result2(10)).toBe(15)
  })

  it.skip('should handle Date objects', () => {
    const fn = (date: Date) => date.getTime()
    const memoizedFn = memoize(fn)

    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-01') // Same value, different reference

    const result1 = memoizedFn(date1)
    const result2 = memoizedFn(date1)
    const result3 = memoizedFn(date2)

    expect(result1).toBe(date1.getTime())
    expect(result1).toBe(result2)
    expect(result3).toBe(date2.getTime())
  })

  it.skip('should handle RegExp objects', () => {
    const fn = (regex: RegExp, str: string) => regex.test(str)
    const memoizedFn = memoize(fn)

    const regex1 = /hello/
    const regex2 = /hello/ // Same pattern, different reference

    const result1 = memoizedFn(regex1, 'hello world')
    const result2 = memoizedFn(regex1, 'hello world')
    const result3 = memoizedFn(regex2, 'hello world')

    expect(result1).toBe(true)
    expect(result1).toBe(result2)
    expect(result3).toBe(true)
  })
})

// ============================================================================
// Integration Tests
// ============================================================================

describe('Integration: Real-world Scenarios', () => {
  it.skip('should work with createSelector-like usage', () => {
    // Simulate how createSelector would use memoize
    const selectTodos = (state: { todos: number[] }) => state.todos
    const selectFilter = (state: { filter: string }) => state.filter

    const memoizedSelectTodos = memoize(selectTodos)
    const memoizedSelectFilter = memoize(selectFilter)

    const state1 = { todos: [1, 2, 3], filter: 'all' }
    const state2 = { todos: [1, 2, 3], filter: 'all' } // Same values, different reference

    const todos1 = memoizedSelectTodos(state1)
    const todos2 = memoizedSelectTodos(state1) // Same reference
    const todos3 = memoizedSelectTodos(state2) // Different reference

    expect(todos1).toEqual([1, 2, 3])
    expect(todos1).toBe(todos2) // Same reference should return cached
    expect(todos3).toEqual([1, 2, 3])
  })

  it.skip('should handle selector with multiple arguments', () => {
    const selectItemById = (state: { items: Record<number, string> }, id: number) =>
      state.items[id]
    const memoizedSelect = memoize(selectItemById)

    const state = { items: { 1: 'apple', 2: 'banana' } }

    const result1 = memoizedSelect(state, 1)
    const result2 = memoizedSelect(state, 1) // Same arguments
    const result3 = memoizedSelect(state, 2) // Different id

    expect(result1).toBe('apple')
    expect(result1).toBe(result2)
    expect(result3).toBe('banana')
  })

  it.skip('should be performant with many calls', () => {
    // Verify with a spy that function is only called once
    const spyFn = vi.fn((x: number, y: number) => x + y)
    const memoizedSpyFn = memoize(spyFn)

    // Call with same arguments many times
    for (let i = 0; i < 100; i++) {
      memoizedSpyFn(5, 10)
    }

    // Should only compute once (all other calls use cache)
    expect(spyFn).toHaveBeenCalledTimes(1)
  })
})

