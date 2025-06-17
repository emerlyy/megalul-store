import { describe, expect, it } from "vitest";
import { formatPrice } from "../formatPrice";

describe("formatPrice", () => {
  it("Formats integer numbers correctly", () => {
    expect(formatPrice(1000)).toBe("1,000");
  });

  it("Formats decimal numbers with up to two digits", () => {
    expect(formatPrice(1234.56)).toBe("1,234.56");
  });

  it("Rounds numbers to two decimal places", () => {
    expect(formatPrice(9.999)).toBe("10");
  });
});
