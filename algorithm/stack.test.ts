import {DArray} from "dstructure/array";
import {SList, DList} from "dstructure/list";
import {
    reverse,
    checkParentheses,
    infixToPostfix,
    evaluatePostfix,
} from "algorithm/stack";

describe("reverse(iterable) returns reversed iterable", () => {
    describe.each([
        [[], []],
        [new DArray<number>(), []],
        [new SList<number>(), []],
        [new DList<number>(), []],
        [[10], [10]],
        [new DArray<number>([10]), [10]],
        [new SList<number>([10]), [10]],
        [new DList<number>([10]), [10]],
        [[10, 20], [20, 10]],
        [new DArray<number>([10, 20]), [20, 10]],
        [new SList<number>([10, 20].reverse()), [20, 10]],
        [new DList<number>([10, 20]), [20, 10]],
        [[10, 20, 30], [30, 20, 10]],
        [new DArray<number>([10, 20, 30]), [30, 20, 10]],
        [new SList<number>([10, 20, 30].reverse()), [30, 20, 10]],
        [new DList<number>([10, 20, 30]), [30, 20, 10]],
    ])("reverse(%s) should be %p", (iterable: any, expectedIterable) => {
        it("Should return reversed iterable", () => {
            const reversed = reverse(iterable);
            expect(reversed).toEqual(expectedIterable);
        });
    });
});

describe("checkParentheses(expression) returns the index of invalid parentheses or -1 otherwise", () => {
    it("Should throw a TypeError on invalid supported parentheses", () => {
        expect(() => checkParentheses("expression", "x")).toThrow(
            new TypeError("Invalid parameter")
        );
    });
    describe.each([
        ["", -1],
        ["x + y", -1],
        ["()", -1],
        ["({[]}),[()],{}", -1],
        ["(x + y)", -1],
        ["(x + y)[z]{w}", -1],
        ["(x + {y + [z + w]})", -1],
        ["(x + y", 5],
        ["x + y)", 5],
        ["(x + y]", 6],
        ["(x + [y + {z + w)])", 16],
        ["(x + [y + {z + w])", 16],
        ["(x + [y + {z + w})])", 17],
    ])("checkParentheses(%p) should be %p", (expression: any, expectedIndex) => {
        it("Should return the index of invalid parentheses or -1 otherwise", () => {
            const index = checkParentheses(expression);
            expect(index).toBe(expectedIndex);
        });
    });
    describe.each([
        ["AB", "AB", -1],
        ["AxB", "AB", -1],
        ["A x + y B", "AB", -1],
        ["A C x + y D B, C z D", "ABCD", -1],
        ["A", "AB", 0],
        ["Ax", "AB", 1],
        ["xB", "AB", 1],
    ])(
        "checkParentheses(%p, %p) should be %p",
        (expression: any, supportedParentheses: any, expectedIndex) => {
            it("Should return the index of invalid parentheses or -1 otherwise", () => {
                const index = checkParentheses(expression, supportedParentheses);
                expect(index).toBe(expectedIndex);
            });
        }
    );
});

describe("infixToPostfix(infix, precedence) converts an infix expression into a postfix expression", () => {
    it("should throw a TypeError when precedence is not a Map", () => {
        expect(() => infixToPostfix("infix", {"+": 1})).toThrow(
            new TypeError("Optional recedence must be a Map")
        );
    });
    describe.each([
        ["a+b", "ab+"],
        ["a+b+c", "ab+c+"],
        ["a+b+c+d", "ab+c+d+"],
        ["a*b+c", "ab*c+"],
        ["a+b*c", "abc*+"],
        ["a+b*c+d", "abc*+d+"],
        ["a+b*c+d*e", "abc*+de*+"],
        ["a*b+c*d", "ab*cd*+"],
        ["(a+b)*c", "ab+c*"],
        ["(a*b+c)+d", "ab*c+d+"],
        ["a*(b+(c+d))", "abcd++*"],
        ["(a+b)*(c+d)", "ab+cd+*"],
        ["(a*b)+(c*d)", "ab*cd*+"],
        ["a+(((b+c)+d)+e)", "abc+d+e++"],
    ])("infixtoPostfix(%p) should be %p", (infix, expectedPosfix) => {
        it("should convert an infix expression into a postfix expression", () => {
            const postfix = infixToPostfix(infix);
            expect(postfix).toEqual(expectedPosfix);
        });
    });
});

describe("evaluatePostfix(postfix, operators) evaluates a postfix expression of one-digit integers", () => {
    it("should throw a TypeError when operators is not a Map", () => {
        expect(() => evaluatePostfix("postfix", {})).toThrow(
            new TypeError("Optional operators must be a Map")
        );
    });
    describe.each([["a"], ["1+"], ["11"]])(
        "evaluatePostfix(%p) should throw a TypeError",
        (invalidInfix: any) => {
            it("should throw a TypeError on an invalidad expression", () => {
                expect(() => {
                    const invalidPostfix = infixToPostfix(invalidInfix);
                    evaluatePostfix(invalidPostfix);
                }).toThrow(new TypeError("Invalid expression"));
            });
        }
    );
    describe.each([
        ["0", 0],
        ["1+2", 3],
        ["1+2*3", 7],
        ["1*2+3", 5],
        ["1+2+3+4", 10],
        ["1*2+3*4", 14],
        ["(1+2)*3", 9],
        ["(1+2)*(3+4)", 21],
        ["(((1-2)-3)-4)*5", -40],
        ["(1+(2+(3+4)))/5", 2],
        ["(1+(2+3))*((4+5)-6)", 18],
    ])("evaluatePostfix(%p) should be %p", (infix: any, expectedValue) => {
        it("should return a value of a postfix expression", () => {
            const postfix = infixToPostfix(infix);
            const value = evaluatePostfix(postfix);
            expect(value).toEqual(expectedValue);
        });
    });
});
