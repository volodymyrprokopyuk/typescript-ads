import {CArray} from "./array";

describe("CArray implements the IArray interface", () => {
    describe("CArray.from(iterable) creates a CArray from an iterable", () => {
        it("Should throw a TypeError when a non-iterble is provided", () => {
            expect(() => CArray.from(0)).toThrow(
                new TypeError("iterable is not iterable")
            );
        });
        describe.each([[[], []], [[1], [1]], [[1, 2], [1, 2]]])(
            "CArray.from(%p) should be %p",
            (iterable, expectedResult) => {
                it("Should create a CArray from an iterable", () => {
                    const result = CArray.from(iterable);
                    expect(result.values).toEqual(iterable);
                });
            }
        );
    });
    describe("CArray.of(...parameters) creates a CArray from parameters", () => {
        describe.each([[[], []], [[1], [1]], [[1, 2], [1, 2]]])(
            "CArray.of(%p) should be %p",
            (parameters, expectedResult) => {
                it("Should create a CArray from parameters", () => {
                    const result = CArray.of(...parameters);
                    expect(result.values).toEqual(parameters);
                });
            }
        );
    });
    describe("new CArray(array?) creates a CArray empty or from an array", () => {
        it("Should create an empty CArray when the array is not provided", () => {
            const result = new CArray();
            expect(result.values).toEqual([]);
        });
        it("Should create a CArray from an array", () => {
            const array = [1, 2];
            const result = new CArray(array);
            expect(result.values).toEqual(array);
        });
    });
    describe("CArray.length is the read-only length of a CArray", () => {
        it("Should be the length of a CArray when a CArray is created", () => {
            const array = [1, 2];
            const result = new CArray(array);
            expect(result.length).toBe(array.length);
        });
    });
    describe("CArray.values is the underlaying read-only elements of a CArray", () => {
        it("Should be the read-only elements of a CArray when a CArray is created", () => {
            const array = [1, 2];
            const result = new CArray(array);
            result.values.push(3);
            expect(result.values).toEqual(array);
        });
    });
    describe("CArray supports the for/of traversal via the [Symbol.iterator]()", () => {
        describe.each([[[], []], [[1], [1]], [[1, 2], [1, 2]]])(
            "for (element of %p) should be %p",
            (array, expectedResult) => {
                it("Should return the elements of a CArray when doing the for/of traversal", () => {
                    const result = new CArray(array);
                    const traversed = [];
                    for (const element of result) {
                        traversed.push(element);
                    }
                    expect(traversed).toEqual(array);
                });
            }
        );
    });
    describe("CArray.insert(position, element) inserts an element at a position", () => {
        describe.each([[[], -1, 10], [[], 1, 10]])(
            "%p.insert(%p, %p) should throw a RangeError",
            (array: any, position: any, element) => {
                it("Should throw a RangeError when inserting before [0] or after [length]", () => {
                    const result = new CArray(array);
                    expect(() => result.insert(position, element)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([
            [[], 0, 10, [10]],
            [[1], 0, 10, [10, 1]],
            [[1], 1, 10, [1, 10]],
            [[1, 2], 0, 10, [10, 1, 2]],
            [[1, 2], 1, 10, [1, 10, 2]],
            [[1, 2], 2, 10, [1, 2, 10]],
        ])(
            "%p.insertAt(%p, %p) should be %p",
            (array: any, position: any, element, expectedResult: any) => {
                it("Should insert an element at a position when a position is within the bounds", () => {
                    const result = new CArray(array);
                    result.insert(position, element);
                    expect(result.values).toEqual(expectedResult);
                    expect(result.length).toBe(expectedResult.length);
                });
            }
        );
    });
    describe("CArray.push(element) inserts an element at the end of the CArray", () => {
        describe.each([[[], 10, [10]], [[1], 10, [1, 10]]])(
            "%p.push(%p) should be %p",
            (array: any, element, expectedResult) => {
                it("Should insert an element at the end of the CArray", () => {
                    const result = new CArray(array);
                    result.push(element);
                    expect(result.values).toEqual(expectedResult);
                });
            }
        );
    });
    describe("CArray.unshift(element) inserts an element at the beginning of the CArray", () => {
        describe.each([[[], 10, [10]], [[1], 10, [10, 1]]])(
            "%p.unshift(%p) should be %p",
            (array: any, element, expectedResult) => {
                it("Should insert an element at the beginning of the CArray", () => {
                    const result = new CArray(array);
                    result.unshift(element);
                    expect(result.values).toEqual(expectedResult);
                });
            }
        );
    });
});
