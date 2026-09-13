import counterReducer from "./counterReducer";

describe("Counter Reducer", () => {
  test("should return initial state", () => {
    expect(counterReducer(undefined, {})).toEqual({
      count: 0
    });
  });

  test("should increment", () => {
    expect(
      counterReducer({ count: 0 }, { type: "INCREMENT" })
    ).toEqual({
      count: 1
    });
  });

  test("should decrement", () => {
    expect(
      counterReducer({ count: 5 }, { type: "DECREMENT" })
    ).toEqual({
      count: 4
    });
  });

  test("should reset", () => {
    expect(
      counterReducer({ count: 10 }, { type: "RESET" })
    ).toEqual({
      count: 0
    });
  });
});
