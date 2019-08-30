// Dynamic array
export class DArray<T> implements Iterable<T> {
    private array: T[] = [];

    /* Creation */

    // O(n)
    constructor(iterable?: any) {
        if (iterable !== undefined) {
            for (const value of iterable) {
                this.array.push(value);
            }
        }
    }

    // O(n)
    concat(iterable: Iterable<T>): DArray<T> {
        const newArray = new DArray<T>(this.array);
        for (const value of iterable) {
            newArray.push(value);
        }
        return newArray;
    }

    /* Observation */

    // O(1)
    get length(): number {
        return this.array.length;
    }

    // O(1)
    get values(): T[] {
        return this.array.slice();
    }

    /* Indexing */

    // O(1)
    at(index: number): T {
        if (index < 0 || index >= this.length) {
            throw new RangeError("Index out of bounds");
        }
        const value = this.array[index];
        return value;
    }

    // O(1)
    update(index: number, value: T): void {
        if (index < 0 || index >= this.length) {
            throw new RangeError("Index out of bounds");
        }
        this.array[index] = value;
    }

    /* Insertion */

    // O(n)
    insert(value: T, index: number): void {
        if (index < 0 || index > this.array.length) {
            throw new RangeError("Index out of bounds");
        }
        let shiftIndex = this.array.length;
        while (shiftIndex > index) {
            this.array[shiftIndex] = this.array[shiftIndex - 1];
            --shiftIndex;
        }
        this.array[index] = value;
    }

    // O(1)
    push(value: T): void {
        this.insert(value, this.array.length);
    }

    // O(n)
    unshift(value: T): void {
        this.insert(value, 0);
    }

    /* Deletion */

    // O(n)
    delete(index: number): T {
        if (index < 0 || index >= this.array.length) {
            throw new RangeError("Index out of bounds");
        }
        const deletedValue = this.array[index];
        let shiftIndex = index;
        while (shiftIndex < this.array.length - 1) {
            this.array[shiftIndex] = this.array[shiftIndex + 1];
            ++shiftIndex;
        }
        --this.array.length;
        return deletedValue;
    }

    // O(1)
    pop(): T {
        return this.delete(this.array.length - 1);
    }

    // O(n)
    shift(): T {
        return this.delete(0);
    }

    /* Traversal */

    // O(n)
    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const next = function() {
            return index < this.array.length
                ? {value: this.array[index++], done: false}
                : {value: undefined, done: true};
        }.bind(this);
        const iterator = {next};
        return iterator;
    }

    // O(n)
    get reversed() {
        const iterable = {
            [Symbol.iterator]: () => {
                let index = this.array.length;
                const next = () => {
                    return index > 0
                        ? {value: this.array[--index], done: false}
                        : {value: undefined, done: true};
                };
                const iterator = {next};
                return iterator;
            },
        };
        return iterable;
    }

    /* Searching */

    // O(n)
    search(element: T): number {
        let result = -1;
        for (const [index, value] of this.array.entries()) {
            if (value === element) {
                result = index;
                break;
            }
        }
        return result;
    }
}
