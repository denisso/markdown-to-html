import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("special cases", () => {
  test("special 001", () => {
    const result = processFile("specialCase001.md");
    expect(result?.children?.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(result?.children?.[i]?.properties?.id?.[0]).toBe(
        "line-" + (i + 1)
      );
    }
    debugger;
  });

  test("special 002", () => {
    const result = processFile("specialCase002.md");
    expect(result?.children?.length).toBe(2);
    for (let i = 0; i < 2; i++) {
      expect(result?.children?.[i]?.properties?.id?.[0]).toBe(
        "line-" + (i + 1)
      );
      expect(result?.children?.[i]?.properties?.id?.length).toBe(1);
    }
    debugger;
  });

  test("special 003", () => {
    const result = processFile("specialCase003.md");
    const childs = result?.children?.[0]?.children;
    expect(childs?.length).toBe(3);

    for (
      let i = 0, line = 1;
      Array.isArray(childs) && i < childs?.length;
      i++
    ) {
      if (childs?.[i]?.tagName === "span")
        expect(childs?.[i]?.properties?.id?.includes("line-" + line++)).toBe(
          true
        );
    }
    debugger;
  });

  test("special 004", () => {
    const result = processFile("specialCase004.md");

    debugger;
  });
});
