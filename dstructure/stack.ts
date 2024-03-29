import {DArray} from "dstructure/array";
import {SList} from "dstructure/list";

export interface Stack<T> {
    readonly length: number;
    peek(): T;
    push(value: T): Stack<T>;
    pop(): T;
}

export class AStack<T> implements Stack<T> {
    private darray: DArray<T> = new DArray<T>();

    /* Observation */

    // O(1)
    get length(): number {
        return this.darray.length;
    }

    /* Indexing */

    // O(1)
    peek(): T {
        return this.darray.at(this.length - 1);
    }

    /* Insertion */

    // O(1)
    push(value: T): AStack<T> {
        this.darray.push(value);
        return this;
    }

    /* Deletion */

    // O(1)
    pop(): T {
        return this.darray.pop();
    }
}

export class LStack<T> implements Stack<T> {
    private slist: SList<T> = new SList<T>();

    /* Observation */

    // O(1)
    get length(): number {
        return this.slist.length;
    }

    /* Indexing */

    // O(1)
    peek(): T {
        return this.slist.at(0);
    }

    /* Insertion */

    // O(1)

    push(value: T): LStack<T> {
        this.slist.pushFront(value);
        return this;
    }

    /* Deletion */

    // O(1)
    pop(): T {
        return this.slist.popFront();
    }
}
