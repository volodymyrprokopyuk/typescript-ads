import {LStack} from "dstructure/stack";

export function reverse<T>(iterable: Iterable<T>): Iterable<T> {
    const lstack = new LStack();
    for (const value of iterable) {
        lstack.push(value);
    }
    const reversed = [];
    while (lstack.length !== 0) {
        const value = lstack.pop();
        reversed.push(value);
    }
    return reversed as Iterable<T>;
}
