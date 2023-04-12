import { IProcess, addLineIdToElement } from "./utils";

/**
 * process horizontal rule
 * @param e element
 * @returns
 */
export const processHorizontalRule:IProcess = (state, element) => {
  const e = element || state.element;
  if (
    e?.type !== "element" ||
    e?.tagName !== "hr"
  ) {
    return;
  }
  addLineIdToElement(state, e);
  return true;
};