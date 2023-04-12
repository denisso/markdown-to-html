import { IProcess, addLineIdToElement } from "./utils";

/**
 * process heading
 * @param e element
 * @returns
 */
export const processHeader: IProcess = (state, element) => {
  const e = element || state.element;
  if (
    e?.type !== "element" ||
    !/^h[1-6]$/.test(e?.tagName || "")
  ) {
    return;
  }
  addLineIdToElement(state, element);
  return true;
};
