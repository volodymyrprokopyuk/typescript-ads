import {Stack, AStack, LStack} from "dstructure/stack";

// O(n)
export function reverse<T>(iterable: Iterable<T>): T[] {
    const stack: Stack<T> = new LStack<T>();
    for (const value of iterable) {
        stack.push(value);
    }
    const reversed = [];
    while (stack.length !== 0) {
        const value = stack.pop();
        reversed.push(value);
    }
    // return reversed as Iterable<T>;
    return reversed;
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
    const supportedOperators = new Set(precedence.keys());
    precedence.set("(", Number.MIN_VALUE);
    const operators: Stack<string> = new LStack<string>();
    let postfix = "";
    for (const symbol of infix.split("")) {
        if (supportedOperators.has(symbol)) {
            while (
                operators.length !== 0 &&
                precedence.get(symbol) <= precedence.get(operators.peek())
            ) {
                const operator = operators.pop();
                postfix += operator;
            }
            operators.push(symbol);
        } else if (symbol === "(") {
            operators.push(symbol);
        } else if (symbol === ")") {
            let operator = operators.pop();
            while (operator !== "(") {
                postfix += operator;
                operator = operators.pop();
            }
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

// O(n)
export function evaluatePostfix(
    postfix: string,
    operators: any = new Map([
        ["+", (a: number, b: number) => a + b],
        ["-", (a: number, b: number) => a - b],
        ["*", (a: number, b: number) => a * b],
        ["/", (a: number, b: number) => a / b],
    ])
): number {
    if (!(operators instanceof Map)) {
        throw new TypeError("Optional operators must be a Map");
    }
    const supportedOperators = new Set(operators.keys());
    const operatorsPattern = Array.from(supportedOperators.values()).join("\\");
    const expressionPattern = RegExp(`^[\\d\\(\\)\\${operatorsPattern}]+$`);
    if (!expressionPattern.test(postfix)) {
        throw new TypeError("Invalid expression");
    }
    const operands: Stack<number> = new AStack<number>();
    for (const symbol of postfix.split("")) {
        if (supportedOperators.has(symbol)) {
            if (operands.length < 2) {
                throw new TypeError("Invalid expression");
            }
            const b = operands.pop();
            const a = operands.pop();
            const operatorResult = operators.get(symbol)(a, b);
            operands.push(operatorResult);
        } else {
            const operand = parseInt(symbol, 10);
            operands.push(operand);
        }
    }
    if (operands.length !== 1) {
        throw new TypeError("Invalid expression");
    }
    const expressionResult = operands.pop();
    return expressionResult;
}

// O(n)
export function infixToPrefix(
    infix: string,
    precedence: any = new Map([["+", 1], ["-", 1], ["*", 2], ["/", 2]])
): string {
    if (!(precedence instanceof Map)) {
        throw new TypeError("Optional recedence must be a Map");
    }
    const supportedOperators = new Set(precedence.keys());
    precedence.set("(", Number.MIN_VALUE);
    const operands: Stack<string> = new LStack<string>();
    const operators: Stack<string> = new AStack<string>();
    const evaluateSubexpression = () => {
        if (operands.length < 2 || operators.length === 0) {
            throw new TypeError("Invalid expression");
        }
        const b = operands.pop();
        const a = operands.pop();
        const operator = operators.pop();
        const subexpression = `${operator}${a}${b}`;
        operands.push(subexpression);
    };
    for (const symbol of infix.split("")) {
        if (supportedOperators.has(symbol)) {
            while (
                operators.length !== 0 &&
                precedence.get(symbol) <= precedence.get(operators.peek())
            ) {
                evaluateSubexpression();
            }
            operators.push(symbol);
        } else if (symbol === "(") {
            operators.push(symbol);
        } else if (symbol === ")") {
            let operator = operators.peek();
            while (operator !== "(") {
                evaluateSubexpression();
                operator = operators.peek();
            }
            operators.pop();
        } else {
            operands.push(symbol);
        }
    }
    while (operators.length !== 0) {
        evaluateSubexpression();
    }
    if (operands.length !== 1 || operators.length !== 0) {
        throw new TypeError("Invalid expression");
    }
    const prefix = operands.pop();
    return prefix;
}

// O(n)
export function evaluatePrefix(
    prefix: string,
    operators: any = new Map([
        ["+", (a: number, b: number) => b + a],
        ["-", (a: number, b: number) => b - a],
        ["*", (a: number, b: number) => b * a],
        ["/", (a: number, b: number) => b / a],
    ])
): number {
    const reversedPrefix = reverse(prefix).join("");
    const expressionResult = evaluatePostfix(reversedPrefix, operators);
    return expressionResult;
}
