export interface IArray<T> extends /* Traversal */ Iterable<T> {
    // Observation
    readonly length: number;
    readonly values: T[];
    // Insertion
    insert(position: number, element: T): void;
    push(element: T): void;
    unshift(element: T): void;
}

export class CArray<T> implements IArray<T> {
    // Creation
    static from(iterable: any) {
        const array = new CArray();
        for (const element of iterable) {
            array.push(element);
        }
        return array;
    }

    static of(...values: any[]) {
        const array = new CArray();
        for (const element of values) {
            array.push(element);
        }
        return array;
    }

    private array: T[];

    constructor(array?: T[]) {
        this.array = array === undefined ? [] : array.slice();
    }

    // Observation
    get length(): number {
        return this.array.length;
    }

    get values(): T[] {
        return this.array.slice();
    }

    // Insertion
    insert(position: number, element: T): void {
        if (position < 0 || position > this.array.length) {
            throw new RangeError("Index out of bounds");
        }
        let index = this.array.length;
        while (index > position) {
            this.array[index] = this.array[index - 1];
            --index;
        }
        this.array[position] = element;
    }

    push(element: T): void {
        this.insert(this.array.length, element);
    }

    unshift(element: T): void {
        this.insert(0, element);
    }

    // Traversal
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
}
