import { calculatePercentage } from "./calculatePercentage";

describe("Test calculatePercentage", () => {
  test("It should return the correct percentage from a number", async () => {
    expect(calculatePercentage(10, 100)).toEqual(10);
    expect(calculatePercentage(10, 200)).toEqual(20);
    expect(calculatePercentage(2, 679)).toEqual(13.58);
    expect(calculatePercentage(150, 40)).toEqual(60);
  });
});
