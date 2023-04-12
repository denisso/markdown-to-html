import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("Tables", () => {
  test("table 001", () => {
    const result = processFile("table001.md");
    expect(result.type).toBe("root");
    
    const table = result?.children?.[0];
    expect(table?.tagName === "table").toBe(true);

    // // thead
    // expect(result?.children?.[0]?.children?.[1]?.children?.[1]?.properties?.id?.includes(
    //   "line-1"
    // )).toBe(true);
    
    // // tbody
    // expect(result?.children?.[0]?.children?.[3]?.children?.[1]?.properties?.id?.includes(
    //   "line-3"
    // )).toBe(true);
    
    debugger;
  });
});
