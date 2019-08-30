import {DArray} from "./array";

describe("DArray implements a dynamic array", () => {
    /* Creation */
    describe("new DArray(iterable?) creates a DArray from an iterable", () => {
        it("Should throw a TypeError when a non-iterble is provided", () => {
            expect(() => new DArray(0)).toThrow(
                new TypeError("iterable is not iterable")
            );
        });
        it("Should create an empty DArray when an iterble is not provided", () => {
            const darray = new DArray();
            expect(darray.values).toEqual([]);
        });
        it("Should create a DArray from an iterable", () => {
            const array = [1, 2];
            const darray = new DArray(array);
            expect(darray.values).toEqual(array);
        });
    });
    describe("DArray.concat(iterable) concatenates the existing DArray with an iterable", () => {
        describe.each([
            [[], [], []],
            [[1], [2], [1, 2]],
            [[1, 2], [3, 4], [1, 2, 3, 4]],
        ])("%p.concat(%p) should be %p", (array, iterable, expectedArray) => {
            it("Should shocatente the existing DArray with an iterable", () => {
                const darray = new DArray(array);
                const concatedDArray = darray.concat(iterable);
                expect(darray.values).toEqual(array);
                expect(darray.length).toEqual(array.length);
                expect(concatedDArray.values).toEqual(expectedArray);
                expect(concatedDArray.length).toEqual(expectedArray.length);
            });
        });
    });
    /* Observation */
    describe("DArray.length returns the length of a DArray", () => {
        it("Should return the length of a DArray", () => {
            const array = [1, 2];
            const darray = new DArray(array);
            expect(darray.length).toBe(array.length);
        });
    });
    describe("DArray.values returns the underlaying array", () => {
        it("Should return the underlaying array", () => {
            const array = [1, 2];
            const darray = new DArray(array);
            darray.values.push(3);
            expect(darray.values).toEqual(array);
        });
    });
    /* Indexing */
    describe("DArray.at(index) returns a value at index", () => {
        describe.each([[[], -1], [[], 0], [[1], 1]])(
            "%p.at(%p) should throw a RangeError",
            (array, index: any) => {
                it("Should throw a RangeError when the index is out of the bounds", () => {
                    const darray = new DArray(array);
                    expect(() => darray.at(index)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([[[1], 0, 1], [[1, 2], 1, 2], [[1, 2, 3], 1, 2]])(
            "%p.at(%p) should be %p",
            (array, index: any, expectedValue) => {
                it("Should return a value at an index when the index is within the bounds", () => {
                    const darray = new DArray(array);
                    const value = darray.at(index);
                    expect(value).toEqual(expectedValue);
                });
            }
        );
    });
    describe("DArray.update(index, value) updates a value at index", () => {
        describe.each([[[], -1], [[], 0], [[1], 1]])(
            "%p.update(%p) should throw a RangeError",
            (array, index: any) => {
                it("Should throw a RangeError when the index is out of the bounds", () => {
                    const darray = new DArray(array);
                    expect(() => darray.update(index, 10)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([
            [[10], 0, 20, [20]],
            [[10, 20], 1, 30, [10, 30]],
            [[10, 20, 30], 1, 40, [10, 40, 30]],
        ])(
            "%p.update(%p, %p) should be %p",
            (array, index: any, newValue, expectedArray) => {
                it("Should update a value at an index when the index is within the bounds", () => {
                    const darray = new DArray(array);
                    darray.update(index, newValue);
                    expect(darray.values).toEqual(expectedArray);
                });
            }
        );
    });
    /* Insertion */
    describe("DArray.insert(value, index) inserts a value at an index", () => {
        describe.each([[[], 10, -1], [[], 10, 1]])(
            "%p.insert(%p, %p) should throw a RangeError",
            (array: any, value, index: any) => {
                it("Should throw a RangeError when the index is out of the bounds", () => {
                    const darray = new DArray(array);
                    expect(() => darray.insert(value, index)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([
            [[], 10, 0, [10]],
            [[1], 10, 0, [10, 1]],
            [[1], 10, 1, [1, 10]],
            [[1, 2], 10, 0, [10, 1, 2]],
            [[1, 2], 10, 1, [1, 10, 2]],
            [[1, 2], 10, 2, [1, 2, 10]],
        ])(
            "%p.insertAt(%p, %p) should be %p",
            (array: any, value, index: any, expectedArray: any) => {
                it("Should insert a value at an index when the index is within the bounds", () => {
                    const darray = new DArray(array);
                    darray.insert(value, index);
                    expect(darray.values).toEqual(expectedArray);
                    expect(darray.length).toBe(expectedArray.length);
                });
            }
        );
    });
    describe("DArray.push(value) inserts a value at the end of a DArray", () => {
        describe.each([[[], 10, [10]], [[1], 10, [1, 10]]])(
            "%p.push(%p) should be %p",
            (array: any, value, expectedArray) => {
                it("Should insert a value at the end of a DArray", () => {
                    const darray = new DArray(array);
                    darray.push(value);
                    expect(darray.values).toEqual(expectedArray);
                });
            }
        );
    });
    describe("DArray.unshift(value) inserts a value at the beginning of a DArray", () => {
        describe.each([[[], 10, [10]], [[1], 10, [10, 1]]])(
            "%p.unshift(%p) should be %p",
            (array: any, value, expectedArray) => {
                it("Should insert a value at the beginning of a DArray", () => {
                    const darray = new DArray(array);
                    darray.unshift(value);
                    expect(darray.values).toEqual(expectedArray);
                });
            }
        );
    });
    /* Deletion */
    describe("DArray.delete(index) deletes a value at an index", () => {
        describe.each([[[], -1], [[], 0], [[1], 1]])(
            "%p.delete(%p) should throw a RangeError",
            (array: any, index: any) => {
                it("Should throw a RangeError when the index is out of the bounds", () => {
                    const darray = new DArray(array);
                    expect(() => darray.delete(index)).toThrow(
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
            "%p.delete(%p) should be %p with the deleted value %p",
            (array: any, index: any, expectedArray: any, deletedValue) => {
                it("Should delete a value at an index when the index is within the bounds", () => {
                    const darray = new DArray(array);
                    const value = darray.delete(index);
                    expect(darray.values).toEqual(expectedArray);
                    expect(darray.length).toBe(expectedArray.length);
                    expect(value).toEqual(deletedValue);
                });
            }
        );
    });
    describe("DArray.pop() deletes the last value from a DArray", () => {
        describe.each([[[1], [], 1], [[1, 2], [1], 2]])(
            "%p.pop() should be %p with the deleted value %p",
            (array: any, expectedArray: any, deletedValue) => {
                it("Should delete the last value fron a DArray", () => {
                    const darray = new DArray(array);
                    const value = darray.pop();
                    expect(darray.values).toEqual(expectedArray);
                    expect(darray.length).toBe(expectedArray.length);
                    expect(value).toEqual(deletedValue);
                });
            }
        );
    });
    describe("DArray.shift() deletes the first value from a DArray", () => {
        describe.each([[[1], [], 1], [[1, 2], [2], 1]])(
            "%p.shift() should be %p with the deleted value %p",
            (array: any, expectedArray: any, deletedValue) => {
                it("Should delete the first value fron a DArray", () => {
                    const darray = new DArray(array);
                    const value = darray.shift();
                    expect(darray.values).toEqual(expectedArray);
                    expect(darray.length).toBe(expectedArray.length);
                    expect(value).toEqual(deletedValue);
                });
            }
        );
    });
    /* Traversal */
    describe("DArray supports the for/of traversal via a [Symbol.iterator]()", () => {
        describe.each([[[], []], [[1], [1]], [[1, 2], [1, 2]]])(
            "for (value of %p) should be %p",
            (array, expectedArray) => {
                it("Should return the values of a DArray when doing the for/of traversal", () => {
                    const darray = new DArray(array);
                    const traversed = [];
                    for (const value of darray) {
                        traversed.push(value);
                    }
                    expect(traversed).toEqual(expectedArray);
                });
            }
        );
    });
    /* Searching */
    describe("DArray.search(value) returns the index of the first occurrence of the value or -1", () => {
        describe.each([
            [[], 10, -1],
            [[10], 10, 0],
            [[10, 20], 20, 1],
            [[10, 20, 30], 20, 1],
            [[10, 20, 30], 40, -1],
        ])("%p.search(%p) should be %p", (array, value, expectedIndex) => {
            it("Should return the index of the first occurence of the value or -1", () => {
                const darray = new DArray(array);
                const index = darray.search(value);
                expect(index).toBe(expectedIndex);
            });
        });
    });
});
