import type { Node } from "../unified.types";
import { replaceEmpty, addEmpty, IProcess } from "./rehypeNumerator/utils";
import { TState } from "./rehypeNumerator/utils";
import { processParagraph } from "./rehypeNumerator/processParagraph";
import { processHeader } from "./rehypeNumerator/processHeader";
import { processCode } from "./rehypeNumerator/processCode";
import { processBlockquote } from "./rehypeNumerator/processBlockquote";
import { processHorizontalRule } from "./rehypeNumerator/processHorizontalRule";
import { processList } from "./rehypeNumerator/processList";
import { processTable } from "./rehypeNumerator/processTable";

class Process {
  process: IProcess;
  nextHandler: Process | undefined;

  constructor(process: IProcess) {
    this.process = process;
  }

  setNext(handler: Process): Process {
    this.nextHandler = handler;
    return handler;
  }

  handle(state: TState): void {
    try {
      if (state?.element?.properties?.done || this.process(state)) return;
      if (this.nextHandler) {
        return this.nextHandler.handle(state);
      }
    } catch (e) {}
  }
}

/**
 * function plugin
 * @returns
 */
export default function rehypeNumerator() {
  return (tree: Node) => {
    try {
      if (!tree?.children?.[0]) return;

      const state: TState = {
        line: 1,
        index: 0,
        tree,
        element: tree?.children?.[0],
      };

      const process = new Process(replaceEmpty);

      const p: IProcess[] = [
        addEmpty,
        processParagraph,
        processList,
        processTable,
        processCode,
        processHeader,
        processBlockquote,
        processHorizontalRule,
      ];
      for (let i = 0, prev = process; i < p.length; i++) {
        prev = prev.setNext(new Process(p[i]));
      }

      for (
        ;
        state.index < tree?.children?.length;
        state.index += 1, state.element = tree?.children?.[state.index]
      ) {
        process.handle(state);
      }
    } catch (e) {
      console.log("error: ", e);
    }
    return;
  };
}
