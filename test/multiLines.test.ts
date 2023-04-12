import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("multi Lines", () => {
  test("multi 001", () => {
    const result = processFile("multiLines001.md");
    expect(result.type).toBe("root");
    let line = 1;
    const childs = result?.children?.[0].children;
    expect(Array.isArray(childs)).toBe(true);
    for (let i = 0; Array.isArray(childs) && i < childs.length; i++) {
      const child = childs[i];
      if (child?.tagName === "span") {
        expect(child.properties?.id?.includes("lines-" + line));
        line++;
      }
    }
    debugger;
  });

  test("multi 002", () => {
    const result = processFile("multiLines002.md");
    expect(result.type).toBe("root");
    let line = 1;
    const childs = result?.children?.[0].children;
    expect(Array.isArray(childs)).toBe(true);
    for (let i = 0; Array.isArray(childs) && i < childs.length; i++) {
      const child = childs[i];
      if (child?.tagName === "span") {
        expect(child.properties?.id?.includes("lines-" + line));
        line++;
      }
    }
    debugger;
  });
});
