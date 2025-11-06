/**
 * TDD Workshop: Building createSelector() from Scratch
 * 
 * This test file guides you through building createSelector() step by step.
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
 * 
 * REMEMBER: Complete Part 1 (memoize) first! You'll use your memoize() function here.
 */

import { describe, it, expect, vi } from 'vitest'
import { createSelector } from '../src/createSelector'

// Test data types
interface RootState {
  todos: { id: number; completed: boolean; text: string }[]
  filter: string
  count: number
}

// ============================================================================
// STEP 1: Basic Memoization with Single Input Selector
// ============================================================================

describe('Step 1: Basic Memoization', () => {
  it.skip('should create a selector that memoizes results', () => {
    const state: RootState = {
      todos: [
        { id: 1, completed: false, text: 'Learn TDD' },
        { id: 2, completed: true, text: 'Build createSelector' }
      ],
      filter: 'all',
      count: 0
    }

    // Create a selector that extracts todos
    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos) => todos
    )

    const result1 = selectTodos(state)
    const result2 = selectTodos(state)

    // Results should be the same (memoized)
    expect(result1).toBe(result2)
    expect(result1).toEqual(state.todos)
  })

  it.skip('should recompute when input selector result changes', () => {
    const state1: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task 1' }],
      filter: 'all',
      count: 0
    }

    const state2: RootState = {
      todos: [{ id: 2, completed: true, text: 'Task 2' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos) => todos.map(t => t.id)
    )

    const result1 = selectTodos(state1)
    const result2 = selectTodos(state2)

    // Results should be different (different inputs)
    expect(result1).not.toEqual(result2)
    expect(result1).toEqual([1])
    expect(result2).toEqual([2])
  })

  it.skip('should call result function only when inputs change', () => {
    const resultFunc = vi.fn((todos: RootState['todos']) => todos.length)

    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectCount = createSelector(
      (state: RootState) => state.todos,
      resultFunc
    )

    // First call - should execute result function
    selectCount(state)
    expect(resultFunc).toHaveBeenCalledTimes(1)

    // Second call with same state - should NOT execute again (memoized)
    selectCount(state)
    expect(resultFunc).toHaveBeenCalledTimes(1)

    // Call with different state - should execute again
    const newState: RootState = {
      ...state,
      todos: [...state.todos, { id: 2, completed: false, text: 'Task 2' }]
    }
    selectCount(newState)
    expect(resultFunc).toHaveBeenCalledTimes(2)
  })
})

// ============================================================================
// STEP 2: Multiple Input Selectors
// ============================================================================

describe('Step 2: Multiple Input Selectors', () => {
  it.skip('should work with multiple input selectors', () => {
    const state: RootState = {
      todos: [
        { id: 1, completed: false, text: 'Task 1' },
        { id: 2, completed: true, text: 'Task 2' }
      ],
      filter: 'all',
      count: 0
    }

    const selectFilteredTodos = createSelector(
      (state: RootState) => state.todos,
      (state: RootState) => state.filter,
      (todos, filter) => {
        if (filter === 'completed') {
          return todos.filter(t => t.completed)
        }
        if (filter === 'active') {
          return todos.filter(t => !t.completed)
        }
        return todos
      }
    )

    const result = selectFilteredTodos(state)
    expect(result).toHaveLength(2)

    // Should be memoized
    const result2 = selectFilteredTodos(state)
    expect(result).toBe(result2)
  })

  it.skip('should recompute when any input selector result changes', () => {
    const state1: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const state2: RootState = {
      ...state1,
      filter: 'completed' // Filter changed
    }

    const resultFunc = vi.fn((todos: RootState['todos'], filter: string) => {
      return filter === 'completed' ? todos.filter(t => t.completed) : todos
    })

    const selectFiltered = createSelector(
      (state: RootState) => state.todos,
      (state: RootState) => state.filter,
      resultFunc
    )

    selectFiltered(state1)
    expect(resultFunc).toHaveBeenCalledTimes(1)

    // Filter changed, should recompute
    selectFiltered(state2)
    expect(resultFunc).toHaveBeenCalledTimes(2)

    // Back to original state, should use cache
    selectFiltered(state1)
    expect(resultFunc).toHaveBeenCalledTimes(2)
  })

  it.skip('should pass all input selector results to the result function', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 5
    }

    const selectSum = createSelector(
      (state: RootState) => state.todos.length,
      (state: RootState) => state.count,
      (todoCount: number, count: number) => todoCount + count
    )

    const result = selectSum(state)
    expect(result).toBe(6) // 1 + 5
  })
})

// ============================================================================
// STEP 3: Flexible Arguments (Array vs Separate Arguments)
// ============================================================================

describe('Step 3: Flexible Arguments', () => {
  it.skip('should accept input selectors as an array', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      [(state: RootState) => state.todos],
      (todos: RootState['todos']) => todos.length
    )

    const result = selectTodos(state)
    expect(result).toBe(1)
  })

  it.skip('should accept input selectors as separate arguments', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos: RootState['todos']) => todos.length
    )

    const result = selectTodos(state)
    expect(result).toBe(1)
  })

  it.skip('should work the same way whether selectors are in array or separate', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectArray = createSelector(
      [(state: RootState) => state.todos],
      (todos: RootState['todos']) => todos.length
    )

    const selectSeparate = createSelector(
      (state: RootState) => state.todos,
      (todos: RootState['todos']) => todos.length
    )

    expect(selectArray(state)).toBe(selectSeparate(state))
  })
})

// ============================================================================
// STEP 4: Result Reference Equality
// ============================================================================

describe('Step 4: Result Reference Equality', () => {
  it.skip('should return the same reference when inputs have not changed', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    // Create a new state object with same values (different reference)
    const state2: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos: RootState['todos']) => todos.map(t => t.id) // Returns new array each time
    )

    const result1 = selectTodos(state)
    const result2 = selectTodos(state2) // Same values, different state object

    // Even though state objects are different, if input selector results
    // are the same, we should return the same reference
    expect(result1).toBe(result2)
  })

  it.skip('should return new reference when inputs have changed', () => {
    const state1: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task 1' }],
      filter: 'all',
      count: 0
    }

    const state2: RootState = {
      todos: [{ id: 2, completed: false, text: 'Task 2' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos: RootState['todos']) => todos.map(t => t.id)
    )

    const result1 = selectTodos(state1)
    const result2 = selectTodos(state2)

    // Different inputs should produce different results
    expect(result1).not.toBe(result2)
    expect(result1).not.toEqual(result2)
  })
})

// ============================================================================
// STEP 5: Bonus Features (Optional)
// ============================================================================

describe('Step 5: Bonus Features', () => {
  it.skip('should track number of recomputations', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos: RootState['todos']) => todos.length
    )

    selectTodos(state)
    expect(selectTodos.recomputations()).toBe(1)

    selectTodos(state) // Same input, should not recompute
    expect(selectTodos.recomputations()).toBe(1)

    const newState: RootState = {
      ...state,
      todos: [...state.todos, { id: 2, completed: false, text: 'Task 2' }]
    }
    selectTodos(newState) // Different input, should recompute
    expect(selectTodos.recomputations()).toBe(2)
  })

  it.skip('should expose the last result', () => {
    const state: RootState = {
      todos: [{ id: 1, completed: false, text: 'Task' }],
      filter: 'all',
      count: 0
    }

    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos: RootState['todos']) => todos.length
    )

    const result = selectTodos(state)
    expect(selectTodos.lastResult()).toBe(result)
  })

  it.skip('should support additional parameters passed to selector', () => {
    const state: RootState = {
      todos: [
        { id: 1, completed: false, text: 'Task 1' },
        { id: 2, completed: true, text: 'Task 2' }
      ],
      filter: 'all',
      count: 0
    }

    const selectTodosByStatus = createSelector(
      (state: RootState, completed?: boolean) => state.todos,
      (state: RootState, completed?: boolean) => completed,
      (todos: RootState['todos'], completed: boolean | undefined) => {
        if (completed === undefined) return todos
        return todos.filter(t => t.completed === completed)
      }
    )

    const allTodos = selectTodosByStatus(state)
    expect(allTodos).toHaveLength(2)

    const completedTodos = selectTodosByStatus(state, true)
    expect(completedTodos).toHaveLength(1)

    const activeTodos = selectTodosByStatus(state, false)
    expect(activeTodos).toHaveLength(1)
  })
})

// ============================================================================
// Integration Tests
// ============================================================================

describe('Integration: Real-world Scenarios', () => {
  it.skip('should work with nested selectors', () => {
    const state: RootState = {
      todos: [
        { id: 1, completed: false, text: 'Buy milk' },
        { id: 2, completed: true, text: 'Walk dog' },
        { id: 3, completed: false, text: 'Learn TDD' }
      ],
      filter: 'active',
      count: 0
    }

    // Base selector
    const selectTodos = createSelector(
      (state: RootState) => state.todos,
      (todos) => todos
    )

    // Derived selector using base selector
    const selectActiveTodos = createSelector(
      selectTodos,
      (state: RootState) => state.filter,
      (todos, filter) => {
        if (filter === 'active') return todos.filter(t => !t.completed)
        if (filter === 'completed') return todos.filter(t => t.completed)
        return todos
      }
    )

    const result = selectActiveTodos(state)
    expect(result).toHaveLength(2)
    expect(result.every(t => !t.completed)).toBe(true)

    // Should be memoized
    const result2 = selectActiveTodos(state)
    expect(result).toBe(result2)
  })

  it.skip('should handle complex computations efficiently', () => {
    const largeState: RootState = {
      todos: Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        completed: i % 2 === 0,
        text: `Task ${i}`
      })),
      filter: 'all',
      count: 0
    }

    let computationCount = 0

    const selectExpensiveComputation = createSelector(
      (state: RootState) => state.todos,
      (state: RootState) => state.filter,
      (todos, filter) => {
        computationCount++
        // Simulate expensive computation
        const filtered = todos.filter(t => {
          if (filter === 'completed') return t.completed
          if (filter === 'active') return !t.completed
          return true
        })
        return filtered.map(t => ({ ...t, processed: true }))
      }
    )

    // First call
    selectExpensiveComputation(largeState)
    expect(computationCount).toBe(1)

    // Second call with same state - should use cache
    selectExpensiveComputation(largeState)
    expect(computationCount).toBe(1)

    // Call with different filter
    const newState: RootState = { ...largeState, filter: 'completed' }
    selectExpensiveComputation(newState)
    expect(computationCount).toBe(2)

    // Back to original state - should use cache
    selectExpensiveComputation(largeState)
    expect(computationCount).toBe(2)
  })
})

