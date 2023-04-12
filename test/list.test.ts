import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Lists", () => {
  test("list 001", () => {
    const result = processFile("list001.md");

    expect(result.type).toBe("root");
    let lineNumber = 1;
    const childs = result?.children?.[0]?.children;
    expect(Array.isArray(childs)).toBe(true);
    for (let i = 0; Array.isArray(childs) && i < childs.length; i++) {
      const child = childs[i];
      if (child.tagName === "li") {
        expect(child?.properties?.id?.includes("line-" + lineNumber)).toBe(
          true
        );
        lineNumber++;
      }
    }
    debugger;
  });

  test("list 002", () => {
    const result = processFile("list002.md");
    expect(result.type).toBe("root");
    let lineNumber = 1;
    const childs = result?.children?.[0]?.children;
    expect(Array.isArray(childs)).toBe(true);
    for (let i = 0; Array.isArray(childs) && i < childs.length; i++) {
      const child = childs[i];
      if (child.tagName === "li") {
        expect(child?.properties?.id?.includes("line-" + lineNumber)).toBe(
          true
        );
        lineNumber++;
      }
    }
    debugger;
  });

  test("list 003", () => {
    // not implemented yet
    // const result = processFile("list003.md");
    // expect(result.type).toBe("root");
    throw new Error("not implemented yet") 
    debugger;
  });

  test("list 004", () => {
    // not implemented yet
    // const result = processFile("list004.md");
    // expect(result.type).toBe("root");
    throw new Error("not implemented yet") 
    debugger;
  });
});
