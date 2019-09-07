import {reverse} from "algorithm/linear";
import {DArray} from "dstructure/array";
import {SList, DList} from "dstructure/list";

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
