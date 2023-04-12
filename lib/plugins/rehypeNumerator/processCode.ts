import { IProcess, addLineIdToElement } from "./utils";

/**
 * process сгыещь code block, after rehypeCodeBlockPlugin
 * @param e element
 * @returns
 */
export const processCode: IProcess = (state, element) => {
  const e = element || state.element;
  if (
    e?.type !== "element" ||
    !e?.properties?.className?.includes("codeblock")
  ) {
    return;
  }

let codelines = e.children?.[0];

  if(!codelines || !Array.isArray(codelines?.children)) return true;
  
  for (let i =0; i < codelines.children.length; i++){
    const codelinesChild = codelines.children[i]
    addLineIdToElement(state, codelinesChild);
  }
  return true;
};
