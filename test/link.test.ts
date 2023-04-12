import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Links", () => {
  test("link 001", () => {
    const result = processFile("link001.md");
    expect(result.type).toBe("root");
    expect(result?.children?.[0]?.properties?.id.includes("line-1")).toBe(true);
    debugger;
  });

  test("link 002", () => {
    const result = processFile("link002.md");
    expect(result.type).toBe("root");
    debugger;
  });
});
