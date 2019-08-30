export class SNode<T> {
    // tslint:disable-next-line:no-empty
    constructor(value: T, next: SNode<T> | null = null) {}
}

export interface LinkedList<T> extends /* Traversal */ Iterable<T> {
    // Observation
    readonly length: number;
    readonly values: T[];
    // Creation
    concat(linkedList: LinkedList<T>): LinkedList<T>;
    // Insertion
    pushFront(value: T): LinkedList<T>;
    pushBack(value: T): LinkedList<T>;
    // insert(value: T, index: number): LinkedList<T>;
    // Deletion
    popFront(): T;
    popBack(): T;
    // delete(index: number): T;
    // Search
    // TODO
}

// export class SLinkedList<T> implements LinkedList<T> {
//     private head: SNode<T> | null = null;
//     private tail: SNode<T> | null = null;
// }
