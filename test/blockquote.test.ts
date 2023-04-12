import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Blockquote", () => {
  test("blockquote 001", () => {
    const result = processFile("blockquote001.md");
    expect(result.type).toBe("root");
    expect(result?.children?.length).toBe(1);
    expect(
      result?.children?.[0]?.children?.[1]?.properties?.id.includes("line-1")
    ).toBe(true);
    debugger;
  });

  test("blockquote 002", () => {
    const result = processFile("blockquote002.md");
    expect(result.type).toBe("root");
    expect(result?.children?.length).toBe(1);
    expect(
      result?.children?.[0]?.children?.[1]?.children?.[0]?.properties?.id.includes(
        "line-1"
      )
    ).toBe(true);
    expect(
      result?.children?.[0]?.children?.[1]?.children?.[2]?.properties?.id.includes(
        "line-2"
      )
    ).toBe(true);
    debugger;
  });
});
