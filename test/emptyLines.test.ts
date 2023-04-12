import { expect, test, describe } from "@jest/globals";
import { processFile } from "./utils";

describe("empty lines", () => {
  test("empty 001", () => {
    const result = processFile("emptyLines001.md");
    const values = ["", "", "123", "", "123"];
    expect(result.type).toBe("root");
    expect(result?.children?.length).toBe(5);
    for (let i = 0; i < values.length; i++) {
      expect(result?.children?.[i]?.children?.[0]?.value).toBe(values[i]);
      expect(result?.children?.[i]?.properties?.id?.[0]).toBe(
        "line-" + (i + 1)
      );
    }
    debugger
  });

  test("empty 002", () => {
    const result = processFile("emptyLines002.md");
    const values = ["123", "", "123"];
    expect(result.type).toBe("root");
    expect(result?.children?.length).toBe(3);
    for (let i = 0; i < values.length; i++) {
      expect(result?.children?.[i]?.children?.[0]?.value).toBe(values[i]);
      expect(result?.children?.[i]?.properties?.id?.[0]).toBe(
        "line-" + (i + 1)
      );
    }
    debugger
  });
});
