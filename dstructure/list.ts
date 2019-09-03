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

    // O(1)
    get length() {
        return this._length;
    }

    // O(n)
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
        if (this.length === 0 || this.head === null) {
            throw new RangeError("Empty list");
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

    // O(n)
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

// Node of a doubly-lined list
export class DNode<T> {
    constructor(
        public value: T,
        public prev: DNode<T> | null = null,
        public next: DNode<T> | null = null
    ) {}
}

export class DList<T> implements Iterable<T> {
    private head: DNode<T> | null = null;
    private tail: DNode<T> | null = null;
    private _length: number = 0;

    /* Construction */

    // O(n)
    constructor(iterable?: any) {
        if (iterable !== undefined) {
            for (const value of iterable) {
                this.pushBack(value);
            }
        }
    }

    // O(n)
    concat(iterable: Iterable<T>): DList<T> {
        const newList = new DList<T>(this.values);
        for (const value of iterable) {
            newList.pushBack(value);
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
        if (index < 0 || index >= this.length) {
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
    pushFront(value: T): DList<T> {
        const node = new DNode(value);
        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        ++this._length;
        return this;
    }

    // O(1)
    pushBack(value: T): DList<T> {
        const node = new DNode(value);
        if (this.tail === null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        ++this._length;
        return this;
    }

    // O(1)
    insert(node: DNode<T>, value: T): void {
        const newNode = new DNode(value, node.prev, node);
        if (node.prev === null) {
            this.head = newNode;
        } else {
            node.prev.next = newNode;
        }
        node.prev = newNode;
        ++this._length;
    }

    /* Deletion */

    // O(1)
    popFront(): T {
        if (this.length === 0 || this.head === null) {
            throw new RangeError("Empty list");
        }
        const deletedNode = this.head;
        this.head = deletedNode.next;
        if (this.head === null) {
            this.tail = this.head;
        } else {
            this.head.prev = null;
        }
        --this._length;
        return deletedNode.value;
    }

    // O(1)
    popBack(): T {
        if (this.length === 0 || this.tail === null) {
            throw new RangeError("Empty list");
        }
        const deletedNode = this.tail;
        this.tail = deletedNode.prev;
        if (this.tail === null) {
            this.head = this.tail;
        } else {
            this.tail.next = null;
        }
        --this._length;
        return deletedNode.value;
    }

    // O(1)
    delete(node: DNode<T>): T {
        if (node.prev === null) {
            this.head = node.next;
            if (this.head !== null) {
                this.head.prev = null;
            }
        } else {
            node.prev.next = node.next;
        }
        if (node.next === null) {
            this.tail = node.prev;
            if (this.tail != null) {
                this.tail.next = null;
            }
        } else {
            node.next.prev = node.prev;
        }
        --this._length;
        return node.value;
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
    get reversed() {
        const iterable = {
            [Symbol.iterator]: () => {
                let node = this.tail;
                const next = () => {
                    if (node === null) {
                        return {value: undefined, done: true};
                    } else {
                        const value = {value: node.value, done: false};
                        node = node.prev;
                        return value;
                    }
                };
                const iterator = {next};
                return iterator;
            },
        };
        return iterable;
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

    // O(n)
    search(value: T): DNode<T> | null {
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
