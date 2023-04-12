import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Images", () => {
  test("image 001", () => {
    const result = processFile("image001.md");
    expect(result.type).toBe("root");
    expect(result?.children?.[0]?.properties?.id.includes("line-1")).toBe(true);
    debugger;
  });

  test("image 002", () => {
    const result = processFile("image002.md");
    const arrayElementsInLine = result?.children?.[0]?.children;
    expect(arrayElementsInLine?.length).toBe(3);
    expect(result?.children?.[0]?.properties?.id?.includes("line-1")).toBe(
      true
    );
    expect(result.type).toBe("root");
    debugger;
  });
});
