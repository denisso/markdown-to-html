import type { Node } from "../../unified.types";
import { IProcess, TState, addLineIdToElement } from "./utils";

interface IChildProcess {
  (arg: { child: Node; lineCurrent: number; lineStartParagraph: number }):
    | { [key: string]: TState["element"][] }
    | undefined;
}
/**
 * get text inside paragraph
 * @param {*} param0
 * @returns
 */
const childText: IChildProcess = ({
  child,
  lineStartParagraph,
  lineCurrent,
}) => {
  if (child?.type !== "text") return;

  const lineStart = child?.position?.start?.line as number;
  // if (!child?.position?.start?.line) return;
  // lineStart = child?.position?.start?.line;

  const lineEnd = child?.position?.end?.line as number;

  const lines = lineEnd - lineStart;

  if (lines === 0) return { [lineStart]: [child] };

  let chunks: string[] = [];

  if (child?.value && child?.value?.indexOf("\r\n") !== -1) {
    chunks = child?.value?.split("\r\n");
  } else {
    chunks = child?.value?.split("\n") || [];
  }

  if (chunks.length && chunks[chunks.length - 1] === "") {
    chunks.pop();
  }

  const result: { [key: string]: Node[] } = {};
  for (let l = lineStart; l <= lineEnd; l++) {
    const chunk = chunks[l - lineStart];
    if (!chunk || chunk === "") continue;

    if (!result[l]) {
      result[l] = [];
    }
    result[l].push({
      type: "text",
      value: chunk,
    });
  }
  return result;
};

/**
 * get img inside paragraph
 * @param child
 * @returns
 */
const childIMG: IChildProcess = ({
  child,
  lineStartParagraph,
  lineCurrent,
}) => {
  if (child?.tagName !== "img") return;

  const lineStart = child?.position?.start?.line;
  if (lineStart === undefined) return;
  return { [lineStart]: [child] };
};

const accumulateElements = ({
  arrTo,
  arrFrom,
}: {
  arrTo: { [key: string]: Node[] };
  arrFrom: { [key: string]: Node[] };
}) => {
  if (arrTo instanceof Object === false) return;
  if (arrFrom instanceof Object === false) return;
  for (const [line, value] of Object.entries(arrFrom)) {
    if (!arrTo[line]) arrTo[line] = [];
    arrTo[line].push(...value);
  }
};

/**
 * processing element paragraph
 * if paragraph is multiline:
 * p>text1\ntest2 => p>span{text1}+br+span{text2}
 * p>text1\r\ntest2 => p>span{text1}+br+span{text2}
 * @param e element
 * @returns
 */
export const processParagraph: IProcess = (state, element) => {
  const e = element || state.element;

  if (e?.type !== "element" || e?.tagName !== "p") {
    return;
  }
  const lineStart = e?.position?.start?.line as number;
  const lineEnd = e?.position?.end?.line as number;
  const lines = lineEnd - lineStart;

  if (lines === 0) {
    addLineIdToElement(state, e);
    return true;
  }

  const elementsByLines: { [line: string]: Node[] } = {};

  if (!e?.children) return;

  let lineCurrent = lineStart;

  for (let l = 0; l < e?.children.length; l++) {
    const child = e?.children[l];
    // get Text inside paragraph
    let element = childText({
      child,
      lineStartParagraph: lineStart,
      lineCurrent,
    });
    if (element) {
      accumulateElements({
        arrTo: elementsByLines,
        arrFrom: element,
      });
    } else if (
      (element = childIMG({
        child,
        lineStartParagraph: lineStart,
        lineCurrent,
      }))
    ) {
      // get IMG inside paragraph
      accumulateElements({
        arrTo: elementsByLines,
        arrFrom: element,
      });
    } else {
      const lineStart = child?.position?.start?.line;
      if (typeof lineStart === "number")
        accumulateElements({
          arrTo: elementsByLines,
          arrFrom: { [lineStart]: [child] },
        });
    }
    lineCurrent = child?.position?.end?.line as number;
  }

  const children: Node[] = [];
  const linesArr = Object.keys(elementsByLines);
  for (const l of linesArr) {
    const wrapper: Node = {
      type: "element",
      tagName: "span",
      properties: {},
      children: elementsByLines[l],
    };
    addLineIdToElement(state, wrapper);
    children.push(wrapper);
    if (l === linesArr[linesArr.length - 1]) continue;
    children.push({
      type: "element",
      tagName: "br",
      properties: {},
      children: [],
    });
  }

  e.children = children;
  return true;
};
