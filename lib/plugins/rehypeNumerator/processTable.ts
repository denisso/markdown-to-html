import { IProcess, TState, addLineIdToElement } from "./utils";

/**
 * process table
 * @param e state
 * @returns
 */
export const processTable: IProcess = (state, element) => {
  const e = element || state.element;
  if (e?.type !== "element" || e?.tagName !== "table") {
    return;
  }
  const children = e.children;
  if (!children) return true;
  for (const child of children) {
    if (
      (child.tagName !== "thead" && child.tagName !== "tbody") ||
      !child.children
    )
      continue;
    for (const tr of child.children) {
      if (tr.tagName !== "tr") continue;
      addLineIdToElement(state, tr);
    }
    if (child.tagName === "thead") {
      const elements = [
        {
          type: "element",
          tagName: "tr",
          properties: {},
        },
        {
          type: "text",
          value: "\n",
        },
      ];
      child.children.push(...elements);
      addLineIdToElement(state, elements[0]);
    }
  }
  return true;
};
