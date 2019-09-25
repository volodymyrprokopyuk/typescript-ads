import {DList} from "dstructure/list";

export class Queue<T> {
    private dlist: DList<T> = new DList<T>();

    /* Observation */

    // O(1)
    get length(): number {
        return this.dlist.length;
    }

    /* Indexing */

    // O(1)
    peek(): T {
        return this.dlist.at(0);
    }

    /* Insertion */

    // O(1)
    enqueue(value: T): Queue<T> {
        this.dlist.pushBack(value);
        return this;
    }

    /* Deletion */

    // O(1)
    dequeue(): T {
        const value = this.dlist.popFront();
        return value;
    }
}
