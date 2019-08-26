import {IArray, CArray} from "./array";

describe("CArray implements the IArray interface", () => {
    describe("CArray.from(iterable) creates a CArray from an iterable", () => {
        it("Should throw an error when a non-iterble is passed", () => {
            expect(() => CArray.from(0)).toThrow(
                new TypeError("iterable is not iterable")
            );
        });
        describe.each([[[]], [[1]], [[1, 2]]])("CArray.from(%p)", (iterable) => {
            it("Should create a CArray from an iterable", () => {
                const result = CArray.from(iterable);
                expect(result.values).toEqual(iterable);
            });
        });
    });
    describe("CArray.of(...parameters) creates a CArray from passed parameters", () => {
        describe.each([[[]], [[1]], [[1, 2]]])("CArray.of(%p)", (parameters) => {
            it("Should create a CArray from parameters", () => {
                const result = CArray.of(...parameters);
                expect(result.values).toEqual(parameters);
            });
        });
    });
    describe("new CArray(array?) creates an CArray empty or from an array", () => {
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
    describe("CArray.length is the read-only array length", () => {
        it("Should be the array length when CArray is created", () => {
            const array = [1, 2];
            const result = new CArray(array);
            expect(result.length).toBe(array.length);
        });
    });
    describe("CArray.values is the underlaying read-only array of values", () => {
        it("Should be the read-only array of values when trying to modify it", () => {
            const array = [1, 2];
            const result = new CArray(array);
            result.values.push(3);
            expect(result.values).toEqual(array);
        });
    });
    describe("CArray supports the for/of traversal", () => {
        describe.each([[[]], [[1]], [[1, 2]]])("for (element of %p)", (array) => {
            it("Should return array values when doing the for/of traversal", () => {
                const result = new CArray(array);
                const traversed = [];
                for (const element of result) {
                    traversed.push(element);
                }
                expect(traversed).toEqual(array);
            });
        });
    });
});
