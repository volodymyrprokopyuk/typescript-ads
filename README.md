# Algorithms and data structures in TypeScript

Common data structures and algorithms are building blocks for creating correct,
maintainable, and efficient in time and memory programs.

## Installation

```bash
yarn install
./bin/verify.sh
```

## Data structures

**Data structure** is a collection of data elements that are put together under one name
and are organized in a particular way so the data elements can be used efficiently.
**Primitive data structures** are fundamental data types supported by a programming
language (boolean, number, string)

### Linear data structures

**Linear data structures** data elements of the same data type are stored in a linear
order using sequential memory locations or links between data elements

**Array** is a collection of related data items of the same data type (homogeneous)
stored together under a single name that allow indexing [] operation

**Structure** is a collection of related data items of different data types
(heterogeneous) stored together under a single name that allow referencing (.)
operation. Structure is a user-defined data type

#### Array

- **Definition**. Array is a fixed size linear collection of elements of the same data
  type that are stored in consecutive memory locations and are referenced by an integer
  index. Array provides random access and constant time indexing
- **Time complexity**
    - Indexing: O(1) < random access
    - Insertion: O(n) < shift, resize
    - Deletion: O(n) < shift, resize
    - Searching: O(n) < scan
- **Characteristics**
    - **Dynamic array** automatically realocates memory when needed on insertions or
      deletions
    - **Vector** is a one-dimensional array
    - **Matrix** is a two-dimensional array

#### Linked list

- **Definition**. Linked list is a dynamic linear collection of elements (nodes) of the
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
    - **Singly-linked list** is a farward-only traversal linked list in which every node
      points to the next node in a list (space-efficient). Only a singly-lined list
      always stores values in a reverse order
    - **Doubly-linked list** is a bidirectional traversal linked list in which every
      node points to the previous and the next node in a list (less space-efficient)

#### Stack

- **Definition**. Stack is a sequential collection of elements in which insertion and
  deletion of data elements are done at only one end. Stack provides constant time push,
  pop, and peek operaitons at the top of the stack. Stack is a LIFO data structure
- **Time complexity**
    - Top indexing: O(1) < peek
    - Top insertion: O(1) < push
    - Top deletion: O(1) < pop
- **Characteristics**
    - System (call) stack ensures the proper execution order of nested function calls
    - Stack can be implemented using either an array or a singly-linked list

#### Queue

- **Definition**. Data elements are inserted at the back of a queue and are deleted from
  the front of a queue. Queue is a FIFO data structure
- **Time complexity**
    - Front indexing: O(1) < peek
    - Back insertion: O(1) < enqueue
    - Front deletion: O(1) < dequeue
- **Characteristics**
    - Deque allows enqueing/dequeueing on both sides of a queue (push/popBack/Front)
    - Queue can be implemented using either an array (space-inefficient implementation
      because of wasted space reserved for already dequeued values, otherwise implement
      a circular queue) or a doubly-linked list

### Tree data structures

**Tree data structures** data elements (nodes) are arranged in a hierarchical order with
  the root node, and the remaining nodes partitioned into disjoint sets such that each
  set is a sub-tree of the root

#### Binary search tree (BST)

#### AVL tree

#### Splay tree

#### Binary heap

#### Treap

### Hash data structures

#### Hash table

### Graph data structures

**Graph data structures** is a collection of vertices and edges that connect these
vertices. Graph (any kind of complex relationships) is a generalization of a tree
(one-parent-many-children relationship**

## Algorithms

**Algorithm** is a formally defined effective procedure to solve a problem in a finit
number of steps that can be implemented using a formal language. Algorithms are used to
manipulate data in data structures

**Big O notation** O(n) (order of magnitude) provides the upper bound (worst case)
ignoring constant multipliers for time complexity and memory requirements of an
algorithm for large values of input size n

- Constant time: O(1)
- Logarithmic time: O(log n)
- Linear time: O(n)
- Polinomial time: O(n ** k)
- Exponential time: O(2 ** n)

Time complexity of a loop

- Linear loop: O(n). for(i = 0; i < 1000; ++i) // add/subtract i
- Logarithmic loop: O(log n). for (i = 0; i < 1000; i *= 2) // multiply/divide i
- Linear logarithmic nested loops: O(n log n). for (++i) { for (i *= 2) }
- Quadratic nested loops: O(n ** 2). for (++i) { for (++j) }
- Dependent quadratic nested loops: O(n * (n + 1) / 2). for (++i) { for (j < i; ++j) }
