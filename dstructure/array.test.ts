import {CArray} from "./array";

describe("CArray implements the IArray interface", () => {
    // Creation
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
    describe("CArray.concat(iterable) creates a new CArray from the existing CArray and an iterable", () => {
        describe.each([
            [[], [], []],
            [[1], [2], [1, 2]],
            [[1, 2], [3, 4], [1, 2, 3, 4]],
        ])("%p.concat(%p) should be %p", (array, iterable, expectedResult) => {
            it("Should create a new CArray when concatenating with an iterable", () => {
                const result = new CArray(array);
                const newResult = result.concat(iterable);
                expect(newResult.values).toEqual(expectedResult);
                expect(newResult.length).toEqual(expectedResult.length);
            });
        });
    });
    // Observation
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
    // Insertion
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
    // Deletion
    describe("CArray.delete(position) deletes an element at a position", () => {
        describe.each([[[], -1], [[], 0], [[1], 1]])(
            "%p.delete(%p) should throw a RangeError",
            (array: any, position: any) => {
                it("Should throw a RangeError when deleting before [0] or at/after [length]", () => {
                    const result = new CArray(array);
                    expect(() => result.delete(position)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([
            [[1], 0, [], 1],
            [[1, 2], 0, [2], 1],
            [[1, 2], 1, [1], 2],
            [[1, 2, 3], 1, [1, 3], 2],
        ])(
            "%p.delete(%p) should be %p with deleted element %p",
            (array: any, position: any, expectedResult: any, deletedElement) => {
                it("Should delete an element at a position when a posiiton is within the bounds", () => {
                    const result = new CArray(array);
                    const element = result.delete(position);
                    expect(result.values).toEqual(expectedResult);
                    expect(result.length).toBe(expectedResult.length);
                    expect(element).toBe(deletedElement);
                });
            }
        );
    });
    describe("CArray.pop() deletes the last element from a CArray", () => {
        describe.each([[[1], [], 1], [[1, 2], [1], 2]])(
            "%p.pop() should be %p with the deleted element %p",
            (array: any, expectedResult: any, deletedElement) => {
                it("Should delete the last element fron a CArray", () => {
                    const result = new CArray(array);
                    const element = result.pop();
                    expect(result.values).toEqual(expectedResult);
                    expect(result.length).toBe(expectedResult.length);
                    expect(element).toBe(deletedElement);
                });
            }
        );
    });
    describe("CArray.shift() deletes the first element fron a CArray", () => {
        describe.each([[[1], [], 1], [[1, 2], [2], 1]])(
            "%p.shift() should be %p with the deleted element %p",
            (array: any, expectedResult: any, deletedElement) => {
                it("Should delete the first element fron a CArray", () => {
                    const result = new CArray(array);
                    const element = result.shift();
                    expect(result.values).toEqual(expectedResult);
                    expect(result.length).toBe(expectedResult.length);
                    expect(element).toBe(deletedElement);
                });
            }
        );
    });
    // Traversal
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
});
