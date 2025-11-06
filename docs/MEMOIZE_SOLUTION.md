# Solution Guide for Part 1: memoize()

This file contains hints and solutions for the memoize workshop. Use this to help guide students when they get stuck, but encourage them to solve it themselves first!

## Key Concepts

1. **WeakMap for Objects/Functions**: Allows garbage collection and handles circular references naturally via reference equality
2. **Map for Primitives**: Efficient storage for primitive values
3. **Reference Equality**: Objects/functions are compared by identity (===), not deep equality
4. **Tree Structure**: Navigate through cache nodes based on argument structure

## Implementation Approach

### Step 1: Basic Primitives

Start simple with a Map:

```typescript
export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  const cache = new Map<string, Result>()

  return function memoized(...args: Args): Result {
    const key = JSON.stringify(args) // Works for primitives
    
    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}
```

### Step 2: Handling Objects

Objects need reference equality. Use WeakMap:

```typescript
const objectCache = new WeakMap<object, Result>()

// For single object argument
if (!isPrimitive(args[0])) {
  const arg = args[0] as object
  if (objectCache.has(arg)) {
    return objectCache.get(arg)!
  }
  const result = fn(...args)
  objectCache.set(arg, result)
  return result
}
```

### Step 3: Tree Structure for Multiple Arguments

For multiple arguments or mixed types, use a tree:

```typescript
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
```

Navigate through the tree:

```typescript
let currentNode = rootCache

for (const arg of args) {
  if (isPrimitive(arg)) {
    // Handle primitive
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
    // Handle object/function
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
```

## Why This Approach Works

1. **WeakMap for Objects**: 
   - Uses reference equality (handles circular refs naturally)
   - Allows garbage collection (doesn't prevent objects from being GC'd)
   - Can't iterate (perfect for caching)

2. **Map for Primitives**:
   - Efficient lookup
   - Can use values directly as keys

3. **Tree Structure**:
   - Handles multiple arguments elegantly
   - Each argument navigates to the next level
   - Final node stores the result

## Common Student Challenges

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

### Challenge 4: isPrimitive Function

**Problem**: Students might forget edge cases.

**Solution**: Check for null, undefined, and all primitive types:

```typescript
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
```

## Hints to Give Students

- Start with primitives only - get that working first
- WeakMap is your friend for objects and functions
- Reference equality (===) handles circular refs for free
- Don't try to serialize objects - use them as keys directly
- Think tree structure for multiple arguments

## Extension Ideas

If students finish early:
- Add a `clearCache()` method
- Add result equality checking
- Implement LRU cache for primitives (limit cache size)
- Add TypeScript types properly
- Compare with real Reselect implementation

