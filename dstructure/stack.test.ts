import {AStack, LStack} from "dstructure/stack";

function newAStack(): AStack<number> {
    return new AStack<number>();
}

function newLStack(): LStack<number> {
    return new LStack<number>();
}

// describe.each([["AStack", "DArray", new AStack<number>()]])(
describe.each([["AStack", "DArray", newAStack], ["LStack", "SList", newLStack]])(
    "%s implements a stack using an %s",
    (stackClass, arrayClass, newStack: any) => {
        /* Observation */
        describe(`${stackClass}.length returns the length of an ${stackClass}`, () => {
            it(`Should return the length of an ${stackClass}`, () => {
                const stack = newStack();
                expect(stack.length).toBe(0);
                stack.push(1);
                expect(stack.length).toBe(1);
                stack.push(2);
                expect(stack.length).toBe(2);
                stack.pop();
                expect(stack.length).toBe(1);
                stack.pop();
                expect(stack.length).toBe(0);
            });
        });
        /* Indexing */
        describe(`${stackClass}.peek() returns a value from the top of an ${stackClass}`, () => {
            it(`Should throw a RangeError on an empty ${stackClass}`, () => {
                const stack = newStack();
                expect(() => stack.peek()).toThrow(/Index out of bounds|Empty list/);
            });
            it(`Should return a value from the top of an ${stackClass}`, () => {
                const stack = newStack();
                const value1 = 1;
                stack.push(value1);
                let peekedValue = stack.peek();
                expect(peekedValue).toEqual(value1);
                const value2 = 2;
                stack.push(value2);
                peekedValue = stack.peek();
                expect(peekedValue).toEqual(value2);
                stack.pop();
                peekedValue = stack.peek();
                expect(peekedValue).toEqual(value1);
            });
        });
        /* Insertion */
        describe(`${stackClass}.push(value) inserts a value on top of an ${stackClass}`, () => {
            it(`Should insert a value on top of an ${stackClass}`, () => {
                const stack = newStack();
                const value1 = 1;
                stack.push(value1);
                let peekedValue = stack.peek();
                expect(peekedValue).toEqual(value1);
                const value2 = 2;
                stack.push(value2);
                peekedValue = stack.peek();
                expect(peekedValue).toEqual(value2);
            });
        });
        /* Deletion */
        describe(`${stackClass}.pop() deletes a value from the top of an $stackClass`, () => {
            it(`Should throw a RangeError on an empty ${stackClass}`, () => {
                const stack = newStack();
                expect(() => stack.pop()).toThrow(/Index out of bounds|Empty list/);
            });
            it(`Should delete a value from the top of an $stackClass`, () => {
                const stack = newStack();
                const value1 = 1;
                stack.push(value1);
                const value2 = 2;
                stack.push(value2);
                let popedValue = stack.pop();
                expect(popedValue).toEqual(value2);
                popedValue = stack.pop();
                expect(popedValue).toEqual(value1);
            });
        });
    }
);
