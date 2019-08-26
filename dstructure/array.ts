export interface IArray<T> extends Iterable<T> {
    readonly length: number;
    readonly values: T[];
    insert(element: T): void;
}

export class CArray<T> implements IArray<T> {
    static from(iterable: any) {
        const array = new CArray();
        for (const element of iterable) {
            array.insert(element);
        }
        return array;
    }

    static of(...values: any[]) {
        const array = new CArray();
        for (const element of values) {
            array.insert(element);
        }
        return array;
    }

    private array: T[];

    constructor(array?: T[]) {
        this.array = array === undefined ? [] : array.slice();
    }

    get length(): number {
        return this.array.length;
    }

    get values(): T[] {
        return this.array.slice();
    }

    // Insertion
    insert(element: T): void {
        this.array[this.array.length] = element;
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
