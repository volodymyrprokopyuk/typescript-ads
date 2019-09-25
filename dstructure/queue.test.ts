import {Queue} from "dstructure/queue";

describe("Queue implements a queue (FIFO)", () => {
    /* Observation */
    describe("Queue.length returns a length of a Queue", () => {
        it("should return a length of a Queue", () => {
            const queue = new Queue<number>();
            expect(queue.length).toBe(0);
            queue.enqueue(10);
            expect(queue.length).toBe(1);
            queue.enqueue(20);
            expect(queue.length).toBe(2);
            queue.dequeue();
            expect(queue.length).toBe(1);
            queue.dequeue();
            expect(queue.length).toBe(0);
        });
    });
    /* Indexing */
    describe("Queue.peek() returns a value from the front of a Queue without removing it", () => {
        it("shoudl throw a RangeError when peeking from an empty Queue", () => {
            const queue = new Queue<number>();
            expect(() => queue.peek()).toThrow(new RangeError("Index out of bounds"));
        });
        it("should return a value from the front of a Queue without removing it", () => {
            const queue = new Queue<number>();
            const value1 = 10;
            queue.enqueue(value1);
            let value = queue.peek();
            expect(value).toEqual(value1);
            const value2 = 20;
            queue.enqueue(value2);
            value = queue.peek();
            expect(value).toEqual(value1);
            queue.dequeue();
            value = queue.peek();
            expect(value).toEqual(value2);
        });
    });
    /* Insertion */
    describe("Queue.enqueue(value) inserts a value into the back of a Queue", () => {
        it("should insert a value into the back of a Queue", () => {
            const queue = new Queue<number>();
            const value1 = 10;
            queue.enqueue(value1);
            let value = queue.peek();
            expect(value).toEqual(value1);
            const value2 = 20;
            queue.enqueue(value2);
            queue.dequeue();
            value = queue.peek();
            expect(value).toEqual(value2);
        });
    });
    /* Deletion */
    describe("Queueu.dequeue() deletes and returns a value from the front of a Queue", () => {
        it("should throw a RangeError when dequeueing from an empty Queue", () => {
            const queue = new Queue<number>();
            expect(() => queue.dequeue()).toThrow(new RangeError("Empty list"));
        });
        it("should delete and return a value from the front of a Queue", () => {
            const queue = new Queue<number>();
            const value1 = 10;
            queue.enqueue(value1);
            const value2 = 20;
            queue.enqueue(value2);
            const value3 = 30;
            queue.enqueue(value3);
            let value = queue.dequeue();
            expect(value).toEqual(value1);
            value = queue.dequeue();
            expect(value).toEqual(value2);
            value = queue.dequeue();
            expect(value).toEqual(value3);
        });
    });
});
