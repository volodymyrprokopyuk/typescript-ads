import {factorial, gcd, fibonacci} from "algorithm/recursion";

describe("factorial(n) returns a factorial of a number", () => {
    describe.each([
        [1, 1],
        [2, 2],
        [3, 6],
        [4, 24],
        [5, 120],
        [6, 720],
        [7, 5040],
        [8, 40320],
    ])("factorial(%p) should be %p", (n, expectedFactorial) => {
        it("should return a factorial of a number", () => {
            const nFactorial = factorial(n);
            expect(nFactorial).toEqual(expectedFactorial);
        });
    });
});

describe("gcd(a, b) returns a greatest common denominator of two numbers using the Euclid's algorithm", () => {
    describe.each([
        [1, 1, 1],
        [1, 2, 1],
        [2, 2, 2],
        [2, 3, 1],
        [2, 4, 2],
        [4, 5, 1],
        [2, 6, 2],
        [3, 6, 3],
        [62, 8, 2],
        [83, 15, 1],
    ])("gcd(%p, %p) should be %p", (a, b, expectedGcd) => {
        it("should return GCD of two numbers", () => {
            const gcdOfAB = gcd(a, b);
            expect(gcdOfAB).toEqual(expectedGcd);
        });
    });
});

describe("fibonacci(length) generates the Fibonacci sequence of a specified length", () => {
    it("should generate the Fibonacci sequence of a specified length", () => {
        const expectedFibonacciSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
        const fibonacciSequence = fibonacci(12);
        expect(fibonacciSequence).toEqual(expectedFibonacciSequence);
    });
});
