import {add} from "./array";

test("Test add success", () => {
    const result = add(1, 2);
    expect(result).toBe(3);
});
