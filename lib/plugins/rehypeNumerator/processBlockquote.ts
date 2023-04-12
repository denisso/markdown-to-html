import { processParagraph } from "./processParagraph";
import { IProcess, addLineIdToElement } from "./utils";

/**
 * process blockquote
 * @param e element
 * @returns
 */
export const processBlockquote: IProcess = (state, element) => {
  const e = element || state.element;
  if (
    e?.type !== "element" ||
    e?.tagName !== "blockquote"
  ) {
    return;
  }

  let isDone = false;
  if (!e?.children) return;
  for (let i = 0; i < e?.children?.length; i++) {
    const child = e?.children[i];
    if (child.tagName === "p") {
      processParagraph(state, child);
      isDone = true;
    }
  }
  if (!isDone) {
    addLineIdToElement(state, e);
  }
  return true;
};
