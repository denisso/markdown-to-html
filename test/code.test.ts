import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";
import { Node } from "../lib/unified.types";

const testLines = (
  n: Node[],
  length: number,
  startLine: number = 0
): boolean => {
  expect(n?.length).toBe(length);
  for (let i = 0; Array.isArray(n) && i < n?.length; i++) {
    expect(n[i]?.properties?.id?.includes("line-" + (i + startLine + 1))).toBe(
      true
    );
  }
  return true;
};

describe("code Cases", () => {
  test("code 001", () => {
    const result = processFile("code001.md");
    expect(result.type).toBe("root");
    const linesChilds = result?.children?.[0].children?.[0].children;
    expect(Array.isArray(linesChilds)).toBe(true);
    if (Array.isArray(linesChilds)) testLines(linesChilds, 7);

    debugger;
  });

  test("code 002", () => {
    const result = processFile("code002.md");
    expect(result.type).toBe("root");
    expect(result?.children?.length).toBe(5);
    expect(result?.children?.[0]?.properties?.id?.includes("line-1")).toBe(
      true
    );
    expect(result?.children?.[1]?.properties?.id?.includes("line-2")).toBe(
      true
    );
    expect(
      result?.children?.[1]?.properties?.className?.includes("emptyLine")
    ).toBe(true);

    const linesChilds1 = result?.children?.[2].children?.[0].children;
    expect(Array.isArray(linesChilds1)).toBe(true);
    if (Array.isArray(linesChilds1)) testLines(linesChilds1, 5, 2);
    expect(result?.children?.[3]?.properties?.id?.includes("line-8")).toBe(
      true
    );
    const linesChilds2 = result?.children?.[4].children?.[0].children;
    expect(Array.isArray(linesChilds2)).toBe(true);
    if (Array.isArray(linesChilds2)) testLines(linesChilds2, 6, 8);
    debugger;
  });
});
