import {SList} from "./list";

describe("SList implements a singly-lined list", () => {
    /* Construction */
    describe("new SList(iterable?) creates an SList from an iterable", () => {
        it("Should throw a TypeError when a non-iterable is provided", () => {
            expect(() => new SList(0)).toThrow(
                new TypeError("iterable is not iterable")
            );
        });
        it("Should create an empty SList when the iterable is not provided", () => {
            const slist = new SList();
            expect(slist.values).toEqual([]);
            expect(slist.length).toBe(0);
        });
        describe.each([
            [[], []],
            [[10], [10]],
            [[10, 20], [10, 20].reverse()],
            [[10, 20, 30], [10, 20, 30].reverse()],
        ])("new SList(%p) should be %p", (list, expectedList) => {
            it("Should create an SList from an iterable", () => {
                const slist = new SList(list);
                expect(slist.values).toEqual(expectedList);
                expect(slist.length).toBe(expectedList.length);
            });
        });
    });
    describe("SList.concat(iterable) concatenates the existing SList with an iterable", () => {
        describe.each([
            [[], [], []],
            [[10], [20], [10, 20].reverse()],
            [[10, 20], [30, 40], [10, 20, 30, 40].reverse()],
        ])("%p.concat(%p) should be %p", (list, iterable, expectedList) => {
            it("Should concatente the existing SList with an iterable", () => {
                const slist = new SList(list);
                const concatedList = slist.concat(iterable);
                expect(concatedList.values).toEqual(expectedList);
                expect(concatedList.length).toBe(expectedList.length);
                expect(slist.values).toEqual(list.reverse());
                expect(slist.length).toBe(list.length);
            });
        });
    });
    /* Observation */
    describe("Slist.length returns the length of an SList", () => {
        it("Should return the length of an SList", () => {
            const list = [10, 20];
            const slist = new SList(list);
            expect(slist.length).toBe(list.length);
        });
    });
    describe("SList.values returns the underlaying list in a reverse order", () => {
        it("Should return the underlaying list in a reverse order", () => {
            const list = [10, 20];
            const slist = new SList(list);
            slist.values.push(30);
            expect(slist.values).toEqual(list.reverse());
        });
    });
    /* Indexing */
    describe("SList.at(index) returns a value at an index", () => {
        describe.each([[[], -1], [[], 0], [[10], 1]])(
            "%p.at(%p) should throw a TypeError",
            (list, index: any) => {
                it("Should throw a TypeError when the index is out of bounds", () => {
                    const slist = new SList(list);
                    expect(() => slist.at(index)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([
            [[10], 0, 10],
            [[10, 20], 0, 20],
            [[10, 20], 1, 10],
            [[10, 20, 30], 0, 30],
            [[10, 20, 30], 2, 10],
        ])("%p.at(%p) should be %p", (list, index: any, expectedValue) => {
            it("Should return a value at an index when the index is within the bounds", () => {
                const slist = new SList(list);
                const value = slist.at(index);
                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe("SList.update(index, value) updates a value at an index", () => {
        describe.each([[[], -1], [[], 0], [[10], 1]])(
            "%p.update(%p, 10) should throw a TypeError",
            (list, index: any) => {
                it("Should throw a TypeError when the index is out of bounds", () => {
                    const slist = new SList(list);
                    expect(() => slist.update(index, 10)).toThrow(
                        new RangeError("Index out of bounds")
                    );
                });
            }
        );
        describe.each([
            [[10], 0, 20, [20]],
            [[10, 20], 0, 30, [30, 10]],
            [[10, 20], 1, 30, [20, 30]],
            [[10, 20, 30], 0, 40, [40, 20, 10]],
            [[10, 20, 30], 1, 40, [30, 40, 10]],
            [[10, 20, 30], 2, 40, [30, 20, 40]],
        ])(
            "%p.update(%p, %p) should be %p",
            (list, index: any, value, expectedList) => {
                it("Should update a value at an index when the index is within the bounds", () => {
                    const slist = new SList(list);
                    slist.update(index, value);
                    expect(slist.values).toEqual(expectedList);
                });
            }
        );
    });
    /* Insertion */
    describe("SList.pushFront(value) inserts a value at the beginning of a SList", () => {
        describe.each([
            [[], 10, [10]],
            [[10], 20, [10, 20].reverse()],
            [[10, 20], 30, [10, 20, 30].reverse()],
        ])("%p.pushFront(%p) should be %p", (list, value, expectedList: any) => {
            it("Should insert a value at the beginning of a SList", () => {
                const slist = new SList(list);
                slist.pushFront(value);
                expect(slist.values).toEqual(expectedList);
                expect(slist.length).toBe(expectedList.length);
            });
        });
    });
    describe("SList.insertAfter(node, value) inserts a value after a node", () => {
        describe.each([
            [[10], 10, 20, [10, 20]],
            [[10, 20], 10, 30, [20, 10, 30]],
            [[10, 20], 20, 30, [20, 30, 10]],
            [[10, 20, 30], 30, 40, [30, 40, 20, 10]],
        ])(
            "%p.insertAfter(%p, %p) should be %p",
            (list, nodeValue, newValue, expectedList: any) => {
                it("Should insert a value after a node", () => {
                    const slist = new SList(list);
                    const node = slist.search(nodeValue);
                    if (node === null) {
                        throw new ReferenceError("Value is not found in a list");
                    }
                    slist.insertAfter(node, newValue);
                    expect(slist.values).toEqual(expectedList);
                    expect(slist.length).toBe(expectedList.length);
                });
            }
        );
    });
    /* Deletion */
    describe("SList.popFront() deletes a value from the beginning of a SList", () => {
        it("Should throw a RangeError when doing popFront() on an empty SList", () => {
            const slist = new SList();
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
                it("Should delete a value from the beginning of a SList", () => {
                    const slist = new SList(list);
                    const value = slist.popFront();
                    expect(slist.values).toEqual(expectedList);
                    expect(slist.length).toBe(expectedList.length);
                    expect(value).toEqual(deletedValue);
                });
            }
        );
    });
    describe("SList.deleteAfter(node) deletes a value after a node", () => {
        describe.each([
            [[10], 10, [10], null],
            [[10, 20], 10, [20, 10], null],
            [[10, 20], 20, [20], 10],
            [[10, 20, 30], 10, [30, 20, 10], null],
            [[10, 20, 30], 20, [30, 20], 10],
            [[10, 20, 30], 30, [30, 10], 20],
        ])(
            "%p.deleteAfter(%p) should be % with the deleted value %p",
            (list, nodeValue, expectedList: any, expectedValue) => {
                it("Should delete a value afeter a node", () => {
                    const slist = new SList(list);
                    const node = slist.search(nodeValue);
                    if (node === null) {
                        throw new ReferenceError("Value is not found in a list");
                    }
                    const deletedValue = slist.deleteAfter(node);
                    expect(slist.values).toEqual(expectedList);
                    expect(slist.length).toBe(expectedList.length);
                    if (deletedValue === null) {
                        expect(expectedValue).toBeNull();
                    } else {
                        expect(deletedValue).toEqual(expectedValue);
                    }
                });
            }
        );
    });
    /* Traversal */
    describe("SList supports a forward traversal of values in a for/of loop", () => {
        describe.each([
            [[], []],
            [[10], [10]],
            [[10, 20], [10, 20].reverse()],
            [[10, 20, 30], [10, 20, 30].reverse()],
        ])("for (const value in %p) should be %p", (list, expectedList) => {
            it("Should perform a forward traversal of values in a for/of loop", () => {
                const slist = new SList(list);
                const traversed = [];
                for (const value of slist) {
                    traversed.push(value);
                }
                expect(traversed).toEqual(expectedList);
            });
        });
    });
    describe("SList.entries supports a forward traversal of index/node pairs in a for/of loop", () => {
        describe.each([
            [[], []],
            [[10], [[0, 10]]],
            [[10, 20], [[0, 20], [1, 10]]],
            [[10, 20, 30], [[0, 30], [1, 20], [2, 10]]],
        ])(
            "for (const [index, node] of %p.entries) should be %p",
            (list, expectedList) => {
                it("Should perform a forward traversal of index/node pairs in a for/of loop", () => {
                    const slist = new SList(list);
                    const entries = [];
                    const listEntries: any = slist.entries;
                    for (const [index, node] of listEntries) {
                        entries.push([index, node.value]);
                    }
                    expect(entries).toEqual(expectedList);
                });
            }
        );
    });
    /* Searching */
    describe("SList.search(value) returns the first SNode or null", () => {
        describe.each([
            [[], 10, null],
            [[10], 10, 10],
            [[10, 20], 20, 20],
            [[10, 20, 30], 20, 20],
            [[10, 20, 30], 40, null],
        ])("%p.search(%p) should be %p", (list, value, expectedValue) => {
            it("Should return the first SNode or null", () => {
                const slist = new SList(list);
                const node = slist.search(value);
                if (node === null) {
                    expect(expectedValue).toBeNull();
                } else {
                    expect(node.value).toEqual(expectedValue);
                }
            });
        });
    });
});
