// Node of a slingly-linked list
export class SNode<T> {
    constructor(public value: T, public next: SNode<T> | null = null) {}
}

// Slingly-linked list
export class SList<T> implements Iterable<T> {
    private head: SNode<T> | null = null;
    private _length: number = 0;

    /* Construction */

    // O(n)
    constructor(iterable?: any) {
        if (iterable !== undefined) {
            for (const value of iterable) {
                this.pushFront(value);
            }
        }
    }

    // O(n)
    concat(iterable: Iterable<T>): SList<T> {
        const newList = new SList<T>(this.values.reverse());
        for (const value of iterable) {
            newList.pushFront(value);
        }
        return newList;
    }

    /* Observation */

    get length() {
        return this._length;
    }

    get values() {
        const values = [];
        for (const value of this) {
            values.push(value);
        }
        return values;
    }

    /* Indexing */

    // O(n)
    at(index: number): T {
        if (index < 0 || index >= this.length || this.head === null) {
            throw new RangeError("Index out of bounds");
        }
        let value = this.head.value;
        const listEntries: any = this.entries;
        for (const [listIndex, node] of listEntries) {
            if (listIndex === index) {
                value = node.value;
            }
        }
        return value;
    }

    // O(n)
    update(index: number, value: T): void {
        if (index < 0 || index >= this.length || this.head === null) {
            throw new RangeError("Index out of bounds");
        }
        const listEntries: any = this.entries;
        for (const [listIndex, node] of listEntries) {
            if (listIndex === index) {
                node.value = value;
            }
        }
    }

    /* Insertion */

    // O(1)
    pushFront(value: T): SList<T> {
        const node = new SNode<T>(value);
        if (this.head !== null) {
            node.next = this.head;
        }
        this.head = node;
        ++this._length;
        return this;
    }

    // O(1)
    insertAfter(node: SNode<T>, value: T): void {
        const newNode = new SNode(value, node.next);
        node.next = newNode;
        ++this._length;
    }

    /* Deletion */

    // O(1)
    popFront(): T {
        if (this._length === 0 || this.head === null) {
            throw new RangeError("Index out of bounds");
        }
        const deletedNode = this.head;
        this.head = deletedNode.next;
        --this._length;
        return deletedNode.value;
    }

    // O(1)
    deleteAfter(node: SNode<T>): T | null {
        const deletedNode = node.next;
        if (deletedNode === null) {
            return deletedNode;
        }
        node.next = deletedNode.next;
        --this._length;
        return deletedNode.value;
    }

    /* Traversal */

    // O(n)
    [Symbol.iterator](): Iterator<T> {
        let node = this.head;
        const next = function() {
            if (node === null) {
                return {value: undefined, done: true};
            } else {
                const value = {value: node.value, done: false};
                node = node.next;
                return value;
            }
        }.bind(this);
        const iterator = {next};
        return iterator;
    }

    // O(n)
    get entries() {
        const iterable = {
            [Symbol.iterator]: () => {
                let node = this.head;
                let index = 0;
                const next = () => {
                    if (node === null) {
                        return {value: undefined, done: true};
                    } else {
                        const value = {value: [index++, node], done: false};
                        node = node.next;
                        return value;
                    }
                };
                const iterator = {next};
                return iterator;
            },
        };
        return iterable;
    }

    /* Searching */
    search(value: T): SNode<T> | null {
        let node = null;
        const listEntries: any = this.entries;
        for (const [index, listNode] of listEntries) {
            if (listNode.value === value) {
                node = listNode;
                break;
            }
        }
        return node;
    }
}
