import { IProcess, TState, addLineIdToElement } from "./utils";

/**
 * process ul li
 * @param e element
 * @returns
 */
export const processList:IProcess = (state, element) => {
  const e = element || state.element;
  if (
    e?.type !== "element" ||
    (e?.tagName !== "ol" && e?.tagName !== "ul")
  ) {
    return;
  }
  const children = e.children;
  if (!children) return;
  for (const child of children) {
    if (child.tagName !== "li" || !child) continue;
    addLineIdToElement(state, child);
  }
  return true
};
