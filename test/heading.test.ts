import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Heading", () => {
  test("head 001", () => {
    const result = processFile("heading001.md");
    expect(result.type).toBe("root");
    expect(result.children?.[0]?.properties?.id.includes("line-1")).toBe(true);
    debugger;
  });
});
