import {SLinkedList} from "./linkedList";

describe("SLinkedList implements a singly-lined list", () => {
    /* Construction */
    describe("new SLinkedList(iterable?) creates an SLinkedList from an iterable", () => {
        it("Should throw a TypeError when a non-iterable is provided", () => {
            expect(() => new SLinkedList(0)).toThrow(
                new TypeError("iterable is not iterable")
            );
        });
        it("Should create an empty SLinkedList when the iterable is not provided", () => {
            const slist = new SLinkedList();
            expect(slist.values).toEqual([]);
            expect(slist.length).toBe(0);
        });
        describe.each([
            [[], []],
            [[10], [10]],
            [[10, 20], [10, 20].reverse()],
            [[10, 20, 30], [10, 20, 30].reverse()],
        ])("new SLinkedList(%p) should be %p", (list, expectedList) => {
            it("Should create an SLinkedList from an iterable", () => {
                const slist = new SLinkedList(list);
                expect(slist.values).toEqual(expectedList);
                expect(slist.length).toBe(expectedList.length);
            });
        });
    });
    describe("SLinkedList.concat(iterable) concatenates the existing SLinkedList with an iterable", () => {
        describe.each([
            [[], [], []],
            [[10], [20], [10, 20].reverse()],
            [[10, 20], [30, 40], [10, 20, 30, 40].reverse()],
        ])("%p.concat(%p) should be %p", (list, iterable, expectedList) => {
            it("Should concatente the existing SLinkedList with an iterable", () => {
                const slist = new SLinkedList(list);
                const concatedList = slist.concat(iterable);
                expect(concatedList.values).toEqual(expectedList);
                expect(concatedList.length).toBe(expectedList.length);
                expect(slist.values).toEqual(list.reverse());
                expect(slist.length).toBe(list.length);
            });
        });
    });
    /* Observation */
    // TODO: length, values
    /* Indexing */
    /* Insertion */
    describe("SLinkedList.pushFront(value) inserts a value at the beginning of a SLinkedList", () => {
        describe.each([
            [[], 10, [10]],
            [[10], 20, [10, 20].reverse()],
            [[10, 20], 30, [10, 20, 30].reverse()],
        ])("%p.pushFront(%p) should be %p", (list, value, expectedList: any) => {
            it("Should insert a value at the beginning of a SLinkedList", () => {
                const slist = new SLinkedList(list);
                slist.pushFront(value);
                expect(slist.values).toEqual(expectedList);
                expect(slist.length).toBe(expectedList.length);
            });
        });
    });
    /* Deletion */
    describe("SLinkedList.popFront() deletes a value from the beginning of a SLinkedList", () => {
        it("Should throw a RangeError when doing popFront() on an empty SLinkedList", () => {
            const slist = new SLinkedList();
            expect(() => slist.popFront()).toThrow(
                new RangeError("Index out of bounds")
            );
        });
        describe.each([
            [[10], [], 10],
            [[10, 20], [10], 20],
            [[10, 20, 30], [20, 10], 30],
        ])(
            "%p.popFront() should be %p with the deleted value %p",
            (list, expectedList: any, deletedValue) => {
                it("Should delete a value from the beginning of a SLinkedList", () => {
                    const slist = new SLinkedList(list);
                    const value = slist.popFront();
                    expect(slist.values).toEqual(expectedList);
                    expect(slist.length).toBe(expectedList.length);
                    expect(value).toEqual(deletedValue);
                });
            }
        );
    });
    /* Traversal */
    /* Searching */
});
