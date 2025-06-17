import { describe, expect, it } from "vitest";
import { formatKebabCase } from "../formatKebabCase";

describe("formatKebabCase", () => {
  it("Returns an empty string if the input is empty", () => {
    expect(formatKebabCase("")).toBe("");
  });

  it("Capitalizes the first letter of a string without hyphens", () => {
    expect(formatKebabCase("example")).toBe("Example");
  });

  it("Replaces hyphens with spaces and capitalizes the following letter", () => {
    expect(formatKebabCase("test-string")).toBe("Test String");
  });

  it("Correctly formats a string with multiple hyphens", () => {
    expect(formatKebabCase("multi-word-kebab-case")).toBe(
      "Multi Word Kebab Case"
    );
  });

  it("Does not change an already formatted string without hyphens", () => {
    expect(formatKebabCase("AlreadyFormatted")).toBe("AlreadyFormatted");
  });

  it("Handles strings with special characters or digits", () => {
    expect(formatKebabCase("section-1-title")).toBe("Section 1 Title");
  });
});
