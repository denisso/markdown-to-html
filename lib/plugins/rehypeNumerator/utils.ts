import type { Node } from "../../unified.types";

export type TState = {
  // abstract syntax tree see more https://github.com/unifiedjs/handbook#constructing-an-ast
  tree: Node;
  // current index for tree.children
  index: number;
  // element by tree.children[index]
  element: Node;
  // current output line
  line: number;
};

export interface IProcess {
  (state: TState, element?: Node): boolean | undefined | void;
}
interface ICreateElement {
  (
    arg: Partial<{
      className: string[];
      done: boolean;
      tagName: string;
      position: {
        start: { line: number; column: number; offset: number };
        end: { line: number; column: number; offset: number };
      };
      line: number;
      children: Node[];
    }>
  ): Node;
}

/**
 *
 * @param className
 * @param done - this element was done
 * @param children
 * @param position
 * @param line
 * @returns
 */
export const createElement: ICreateElement = ({
  className = [],
  done = true,
  tagName = "p",
  position = {
    start: { line: 0, column: 0, offset: 0 },
    end: { line: 0, column: 0, offset: 0 },
  },
  line = 0,
  children = [
    {
      type: "text",
      value: "",
    },
  ],
}) => {
  position.start.line = line;
  position.end.line = line;

  return {
    type: "element",
    tagName,
    position,
    properties: { className, done },
    children,
  };
};

/**
 * add identifier to element
 * @param e - elemenet
 * @param l - line identificator
 */
export const addLineIdToElement = (state: TState, element?: Node) => {
  const e = element || state.element;

  if (!e?.properties) {
    e.properties = {};
  }
  if (!e?.properties?.id) {
    e.properties.id = [];
  }
  e.properties.id.push("line-" + state.line);
  state.line++;
};

/**
 * replace chars "\n" or "\r\n" in text with pragraph
 * @param tree abstract syntax tree
 * @param e  current element syntax tree
 * @param line current line
 */
export const replaceEmpty: IProcess = (state) => {
  const e = state?.element;

  if (e?.type === "text" && (e?.value === "\n" || e?.value === "\r\n")) {
    const tree = state?.tree;
    tree?.children?.splice(state.index, 1);
    state.index -= 1;
    return true;
  }
};

/**
 * Add new line with "\r\n"
 * if there are empty lines between the previous and next element, they will be replaced with a paragraph
 * @param {*} state - ast with elements
 */
export const addEmpty: IProcess = (state) => {
  const e = state?.element;

  const tree = state?.tree;
  const indexStart = state.index;

  const arr = [];
  const lineStart = e?.position?.start?.line;
  if (!lineStart) return;
  const lines = lineStart - state?.line;
  if (lines <= 0) return;

  for (let i = 1; i <= lines; i++) {
    const className = ["emptyLine"];
    const p = createElement({ className, line: state?.line });
    addLineIdToElement(state, p);
    arr.push(p);
  }
  if (arr.length && tree.children) tree.children.splice(indexStart, 0, ...arr);
  state.index += lines - 1;
  return true;
};
