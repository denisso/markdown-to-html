import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Hotizontal Rule", () => {
  test("hr 001", () => {
    const result = processFile("hr001.md");
    expect(result.type).toBe("root");
    expect(result?.children?.[0]?.properties?.id.includes("line-1")).toBe(true);
    debugger;
  });
});
