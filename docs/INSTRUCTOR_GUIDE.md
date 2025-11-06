# Instructor Guide: TDD Workshop for `memoize()` and `createSelector()`

This guide helps instructors facilitate the two-part workshop effectively.

## Workshop Overview

**Total Duration**: 3-5 hours (depending on student experience level)
**Difficulty**: Intermediate
**Prerequisites**: JavaScript/TypeScript basics, testing familiarity

**Part 1: memoize()** - 1.5-2 hours
**Part 2: createSelector()** - 1.5-2 hours

## Learning Objectives

By the end of this workshop, students will:
1. Understand how memoization works internally
2. Know how to handle functions and circular references in memoization
3. Understand how `createSelector()` works internally
4. Learn to use TDD to build complex functionality incrementally
5. Understand memoization patterns and reference equality
6. Gain confidence in reading and implementing library code

## Workshop Structure

### Part 1: Building `memoize()` (Start Here!)

#### Phase 1: Introduction (10 minutes)
- Explain what memoization is and why it's useful
- Show examples of memoization
- Explain the TDD workflow
- Set up the workspace

#### Phase 2: Guided Implementation (60-90 minutes)
Students work through tests in order:
1. **Step 1**: Basic memoization with primitives (15-20 min)
2. **Step 2**: Memoization with objects (15-20 min)
3. **Step 3**: Circular references (15-20 min)
4. **Step 4**: Functions as arguments (10-15 min)
5. **Step 5**: Complex scenarios (10-15 min)

#### Phase 3: Discussion & Transition (10 minutes)
- Review solutions
- Discuss challenges
- Transition to Part 2

### Part 2: Building `createSelector()`

#### Phase 1: Introduction (5 minutes)
- Explain what `createSelector()` does
- Show how it uses `memoize()`
- Explain the connection to Part 1

#### Phase 2: Guided Implementation (60-90 minutes)
Students work through tests in order:
1. **Step 1**: Basic memoization (15-20 min)
2. **Step 2**: Multiple input selectors (15-20 min)
3. **Step 3**: Flexible arguments (10-15 min)
4. **Step 4**: Reference equality (15-20 min)
5. **Step 5**: Bonus features (10-15 min)

#### Phase 3: Discussion & Review (15-30 minutes)
- Review solutions
- Discuss challenges
- Compare with real implementation
- Answer questions

## Part 1: Common Student Challenges (memoize)

### Challenge 1: Circular References
**Problem**: Students try to use JSON.stringify which fails on circular refs.

**Hint**: "What if we don't try to serialize objects at all? What if we just use the object itself as a key?"

**Solution**: Use WeakMap with the object as the key. Reference equality handles circular refs naturally.

### Challenge 2: Functions as Arguments
**Problem**: Students don't know how to handle functions.

**Hint**: "Functions are objects in JavaScript. Can we use the same approach as objects?"

**Solution**: Treat functions like objects - use WeakMap.

### Challenge 3: Multiple Arguments
**Problem**: Students struggle with combining primitives and objects.

**Hint**: "What if we navigate through a tree, where each level represents one argument?"

**Solution**: Use a tree structure where each argument navigates to the next level.

### Challenge 4: Understanding WeakMap vs Map
**Problem**: Students don't understand when to use which.

**Hint**: "WeakMap uses reference equality and allows garbage collection. Map uses value equality. Which is better for objects?"

**Solution**: WeakMap for objects/functions, Map for primitives.

## Part 2: Common Student Challenges (createSelector)

### Challenge 1: Understanding Two-Level Memoization
**Problem**: Students often only memoize the result function, forgetting to memoize the selector itself.

**Hint**: Ask them "What should trigger a recomputation? The state object changing, or the input selector results changing?"

**Solution**: They need to memoize the selector based on input selector results, not the state.

### Challenge 2: Reference Equality
**Problem**: Students return new objects/arrays even when inputs haven't changed.

**Hint**: "React components re-render when props change by reference. What should happen if we call the selector twice with the same input selector results?"

**Solution**: The memoization should return the same reference when input results are equal.

### Challenge 3: Extracting Input Selectors
**Problem**: Handling both array and separate arguments can be confusing.

**Hint**: "Check if the first argument is an array. If it is, use it. Otherwise, use all arguments."

### Challenge 4: Understanding the Flow
**Problem**: Students get confused about the order of operations.

**Flow Diagram**:
```
State → Input Selectors → Input Results → Memoized Result Func → Final Result
                                      ↓
                              Memoized Selector (argsMemoize)
```

## Facilitation Tips

### 1. Start with a Demo
For Part 1, show a simple memoization example:
```typescript
const add = memoize((a, b) => a + b)
add(2, 3) // Computes
add(2, 3) // Cached
```

For Part 2, show how createSelector uses memoize:
```typescript
const selectTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.length
)
```

### 2. Emphasize Part 1 Before Part 2
Make sure students complete Part 1 before starting Part 2. Part 2 depends on Part 1!

### 3. Encourage Pair Programming
Have students work in pairs - one writes tests, one writes code, then switch.

### 4. Use Breakpoints
Encourage students to use debugger/console.log to understand the flow.

### 5. Provide Hints, Not Solutions
When students are stuck:
- Ask leading questions
- Point them to specific test cases
- Suggest they trace through the code execution

### 6. Celebrate Small Wins
When a test passes, have students celebrate! TDD is about incremental progress.

## Time Management

### Part 1: memoize()
| Phase | Time | Notes |
|-------|------|-------|
| Intro | 10 min | Keep it brief, get them coding quickly |
| Step 1 | 15-20 min | Most important - sets foundation |
| Step 2 | 15-20 min | Objects are key concept |
| Step 3 | 15-20 min | Circular refs are tricky |
| Step 4 | 10-15 min | Functions are objects |
| Step 5 | 10-15 min | Integration |
| Discussion | 10 min | Transition to Part 2 |

### Part 2: createSelector()
| Phase | Time | Notes |
|-------|------|-------|
| Intro | 5 min | Quick recap, show connection |
| Step 1 | 15-20 min | Most important - sets foundation |
| Step 2 | 15-20 min | Multiple inputs is key concept |
| Step 3 | 10-15 min | Usually straightforward |
| Step 4 | 15-20 min | Reference equality is tricky |
| Step 5 | 10-15 min | Optional bonus |
| Discussion | 15-30 min | Varies based on questions |

## Assessment

### Formative Assessment (During Workshop)
- Check if students are following TDD (red → green → refactor)
- Observe if they're reading tests carefully
- Notice if they're trying to skip ahead
- Verify Part 1 is complete before Part 2

### Summative Assessment (After Workshop)
- Can they explain how memoization works?
- Can they handle circular references?
- Can they identify when a selector would recompute?
- Can they debug a failing selector?

## Extension Activities (If Time Permits)

### After Part 1
1. Add a `clearCache()` method
2. Add result equality checking
3. Implement LRU cache for primitives
4. Compare with real Reselect implementation

### After Part 2
1. Add TypeScript types properly
2. Performance testing: Compare memoized vs non-memoized selectors
3. Real-world scenario: Build a selector for a Redux store
4. Explore real Reselect implementation
5. Implement `createSelectorCreator`

## Troubleshooting

### Students Can't Run Tests
- Check that they're in the right directory
- Verify dependencies are installed: `yarn install`
- Check Node version (should be 18+)

### Tests Are Too Hard
- Break down the first test into smaller steps
- Provide a partial solution and have them complete it
- Pair strong students with struggling ones

### Students Skip Part 1
- Emphasize that Part 2 depends on Part 1
- Check that their `memoize()` implementation works
- Have them run the memoize tests first

### Students Finish Early
**Part 1**: 
- Add a `clearCache()` method
- Implement LRU cache
- Compare with real implementation

**Part 2**:
- Add TypeScript types properly
- Explore the real Reselect implementation
- Implement `createSelectorCreator`

## Resources

- [Reselect Documentation](https://reselect.js.org)
- [TDD Guide](http://www.agiledata.org/essays/tdd.html)
- Real Reselect repository: https://github.com/reduxjs/reselect

## Post-Workshop Follow-up

1. Share the solution files
2. Provide links to advanced topics (argsMemoize, custom memoization)
3. Encourage students to contribute to open source
4. Share resources for further learning

## Feedback Collection

After the workshop, ask students:
- What was the most challenging part? (Part 1 or Part 2?)
- What did you learn?
- What would you do differently?
- Rate the workshop (1-5)
- Was Part 1 helpful for understanding Part 2?

Use feedback to improve future workshops!

