export class CArray<T> /* Traversal */ implements Iterable<T> {
    private array: T[] = [];

    // Creation from an optional iterable
    constructor(iterable?: any) {
        if (iterable !== undefined) {
            for (const element of iterable) {
                this.array.push(element);
            }
        }
    }

    // Create a new CArray from the existing CArray and an iterable
    concat(iterable: Iterable<T>): CArray<T> {
        const newArray = new CArray<T>(this.array);
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
    insert(element: T, position: number): void {
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
        this.insert(element, this.array.length);
    }

    // Insert at the beginning of the array
    unshift(element: T): void {
        this.insert(element, 0);
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

    // Searching
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
