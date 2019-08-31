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
