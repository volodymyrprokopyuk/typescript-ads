export interface IArray<T> extends /* Traversal */ Iterable<T> {
    // Observation
    readonly length: number;
    readonly values: T[];
    // Creation
    concat(iterable: Iterable<T>): IArray<T>;
    // Insertion
    insert(position: number, element: T): void;
    push(element: T): void;
    unshift(element: T): void;
    // Deletion
    delete(position: number): T;
    pop(): T;
    shift(): T;
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
        // Make a cope of the source array
        this.array = array === undefined ? [] : array.slice();
    }

    // Create a new CArray from the existing CArray and an iterable
    concat(iterable: Iterable<T>): IArray<T> {
        const newArray = new CArray(this.array);
        for (const element of iterable) {
            newArray.push(element);
        }
        return newArray;
    }

    // Observation
    get length(): number {
        return this.array.length;
    }

    get values(): T[] {
        // Make a cope of the internal array
        return this.array.slice();
    }

    // Insertion
    insert(position: number, element: T): void {
        // Insertion before [0] or after [length] is forbidden
        if (position < 0 || position > this.array.length) {
            throw new RangeError("Index out of bounds");
        }
        // Move one posiiton to the right all the elements starting from the end of the
        // array till the position inclusive to make room for the new element
        let index = this.array.length;
        while (index > position) {
            this.array[index] = this.array[index - 1];
            --index;
        }
        // Set the new element at the posiiton
        this.array[position] = element;
    }

    // Insert at the end of the array
    push(element: T): void {
        this.insert(this.array.length, element);
    }

    // Insert at the beginning of the array
    unshift(element: T): void {
        this.insert(0, element);
    }

    // Deletion
    delete(position: number): T {
        // Deletion before [0] or at/after [length] is forbidden
        if (position < 0 || position >= this.array.length) {
            throw new RangeError("Index out of bounds");
        }
        // Get the element to be deleted
        const element = this.array[position];
        // Move one position to the left all the elements starting from the position + 1
        // till the end of the array to delete the element at the position
        let index = position;
        while (index < this.array.length - 1) {
            this.array[index] = this.array[index + 1];
            ++index;
        }
        // Decrement the array length
        --this.array.length;
        // Return the deleted element
        return element;
    }

    // Delete from the end of the array
    pop(): T {
        return this.delete(this.array.length - 1);
    }

    // Delete from the beginning of the array
    shift(): T {
        return this.delete(0);
    }

    // Traversal
    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        // Create an Iterator<T> with the next() function
        const next = function() {
            return index < this.array.length
                ? {value: this.array[index++], done: false}
                : {value: undefined, done: true};
        }.bind(this);
        const iterator = {next};
        return iterator;
    }
}
