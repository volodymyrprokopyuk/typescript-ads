# Algorithms and data structures in TypeScript

## Installation

```bash
yarn install
./bin/verify.sh
```

## Data structures

### Linear data structures

#### Array

- **Definition**. Array is a fixed linear collection of elements of the same data type
  that are stored in consecutive memory locations and are referenced by an integer
  index. Array provides random access and constant time indexing
- **Time complexity**
    - Indexing: O(1) < random access
    - Insertion: O(n) < resize
    - Deletion: O(n) < resize
    - Searching: O(n) < scan
- **Characteristics**
    - Dynamic array automatically realocates memory when needed on insertions or
      deletions
    - Vector is a one-dimensional array
    - Matrix is a two-dimensional array

#### Linked list

- **Definition**. Linked list is a growing linear collection of elements (nodes) of the
  same data type that point to the previours/next node in a list and are stored in
  random memory locations. Any number of elements can be added to a linked list at any
  point. Linked list provides sequential access and constant time insertion and deletion
  at any point in the list
- **Time complexity**
    - Indexing: O(n) < sequential access
    - Insertion: O(1) < link
    - Deletion: O(1) < link
    - Searching: O(n) < scan
- **Characteristics**
    - Singly-linked list is a farward-only traversal linked list in which every node
      points to the next node in a list (space-efficient). Only a singly-lined list
      always stores values in a reverse order
    - Doubly-linked list is a bidirectional traversal linked list in which every node
      points to the previous and the next node in a list (less space-efficient)

## Algorithms
