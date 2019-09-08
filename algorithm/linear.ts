import {AStack, LStack} from "dstructure/stack";

// O(n)
export function reverse<T>(iterable: Iterable<T>): Iterable<T> {
    const stack = new LStack();
    for (const value of iterable) {
        stack.push(value);
    }
    const reversed = [];
    while (stack.length !== 0) {
        const value = stack.pop();
        reversed.push(value);
    }
    return reversed as Iterable<T>;
}

// O(n)
export function checkParentheses(
    expression: string,
    supportedParentheses = "()[]{}"
): number {
    const match = supportedParentheses.match(/.{2}/g);
    if (match === null) {
        throw new TypeError("Invalid parameter");
    }
    const openingToClosing = new Map(match.map((ps) => ps.split("")) as any);
    const opening = new Set(openingToClosing.keys());
    const closing = new Set(openingToClosing.values());
    const stack = new AStack();
    let index = 0;
    for (const symbol of expression) {
        if (opening.has(symbol)) {
            stack.push(symbol);
        } else if (closing.has(symbol)) {
            if (stack.length === 0) {
                return index;
            }
            const lastOpening = stack.pop();
            const expectedClosing = openingToClosing.get(lastOpening);
            if (symbol !== expectedClosing) {
                return index;
            }
        }
        ++index;
    }
    if (stack.length !== 0) {
        return expression.length - 1;
    }
    return -1;
}
