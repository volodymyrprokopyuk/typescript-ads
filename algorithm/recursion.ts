// _ Iterative approach (bottom-up)
// - Recursive approach (top-down, divide and conquer)
//   clean/concise, but system stack overhead/limitation
// - Prefer recursion over iteration only if there is no iterative solution

// O(n)
export function factorial(n: number): number {
    // Non-Tail-Recursive because of a pending operation (multiplication)
    // return n === 1 ? n : n * factorial(n - 1);

    // Tail-Recursive auxiliary funciton with an auxiliary parameter that holds a
    // pending operation result
    const factorialTR = (nTR: number, result: number): number => {
        return nTR === 1 ? result : factorialTR(nTR - 1, nTR * result);
    };
    return factorialTR(n, 1);
}

// O(log n)
export function gcd(a: number, b: number): number {
    [a, b] = a >= b ? [a, b] : [b, a];
    // Direct, linear recursion - only one recursive call per function
    return a % b === 0 ? b : gcd(b, a % b);
}

// O(n)
function* fibonacciGenerator() {
    let previous = -1;
    let current = 1;
    while (true) {
        const next = previous + current;
        yield next;
        previous = current;
        current = next;
    }
}

// O(n)
export function fibonacci(length: number): number[] {
    const fibonacciSequence = [];
    let index = 0;
    for (const element of fibonacciGenerator()) {
        fibonacciSequence.push(element);
        if (++index === length) {
            break;
        }
    }
    return fibonacciSequence;
}

// O(2 ** n)
export function hanoi(n: number): string[] {
    // 1 - smallest, n - largest
    const movements: string[] = [];
    const move = (m: number, source: string, target: string, spare: string) => {
        if (m === 1) {
            const movement = `${source} -> ${target}`;
            movements.push(movement);
        } else {
            // Direct, tree recursion = more than one recursive call per function
            move(m - 1, source, spare, target);
            move(1, source, target, spare);
            move(m - 1, spare, target, source);
        }
    };
    move(n, "A", "C", "B");
    return movements;
}
