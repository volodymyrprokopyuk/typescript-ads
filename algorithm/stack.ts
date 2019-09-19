import {Stack, AStack, LStack} from "dstructure/stack";

// O(n)
export function reverse<T>(iterable: Iterable<T>): Iterable<T> {
    const stack: Stack<T> = new LStack<T>();
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
    const stack: Stack<string> = new AStack<string>();
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

// O(n)
export function infixToPostfix(
    infix: string,
    precedence: any = new Map([["+", 1], ["-", 1], ["*", 2], ["/", 2]])
): string {
    if (!(precedence instanceof Map)) {
        throw new TypeError("Optional recedence must be a Map");
    }
    const availableOperators = new Set(precedence.keys());
    precedence.set("(", Number.MIN_VALUE);
    const operators: Stack<string> = new LStack<string>();
    let postfix = "";
    for (const symbol of infix.split("")) {
        if (symbol === "(") {
            operators.push(symbol);
        } else if (symbol === ")") {
            let operator = operators.pop();
            while (operator !== "(") {
                postfix += operator;
                operator = operators.pop();
            }
        } else if (availableOperators.has(symbol)) {
            while (
                operators.length !== 0 &&
                precedence.get(operators.peek()) >= precedence.get(symbol)
            ) {
                const operator = operators.pop();
                postfix += operator;
            }
            operators.push(symbol);
        } else {
            postfix += symbol;
        }
    }
    while (operators.length !== 0) {
        const operator = operators.pop();
        postfix += operator;
    }
    return postfix;
}
