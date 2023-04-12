import React from "react";
import { throttle } from "../utils/throttle";
import { useContext } from "./Context";
import type { Editor } from "codemirror";

type TState = {
  isScroll: boolean;
  progress: number;
  startTime: number;
  currY: number;
  prevY: number;
  diffY: number;
  topVisibleLineEditor: number;
};

function getTopVisibleLine(editor: Editor) {
  const rectWrapperElement = editor.getWrapperElement().getBoundingClientRect();
  const topVisibleLine = editor.lineAtHeight(rectWrapperElement.top, "window");
  return { topVisibleLine, rectWrapperElement };
}

export const useSmoothScroll = () => {
  const refState = React.useRef<Partial<TState>>({});
  const state = refState.current as Required<TState>;
  const { editor } = useContext();
  const refCodeMirrorCode = React.useRef<HTMLDivElement>();
  const refHTMLOutputElement = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (!editor) return;

    const linesElement = document.querySelector(
      ".CodeMirror-code"
    ) as HTMLDivElement;

    if (linesElement) refCodeMirrorCode.current = linesElement;

    editor.on("cursorActivity", () => {
      const cursor = editor.getCursor();
      const lineElement = document.getElementById(
        "user-content-line-" + cursor.line
      );

      if (!lineElement) return;

      const lineElementRect = lineElement.getBoundingClientRect();
      const htmlOutput = refHTMLOutputElement.current as HTMLDivElement;
      const htmlOutputFirstElementRect =
        htmlOutput.children[0].getBoundingClientRect();
      let offset =
        lineElementRect.y -
        htmlOutputFirstElementRect.y -
        document.documentElement.clientHeight / 3;
      if(offset < 0) offset = 0
      htmlOutput.style.transform = `translateY(${-offset}px)`;
    });

    editor.on("scroll", () => {
      const r = getTopVisibleLine(editor);
      const topLine = r.topVisibleLine;
      refState.current.topVisibleLineEditor = topLine;
      const vpLines = editor.getViewport();

      const curLineElement =
        refCodeMirrorCode.current?.children[topLine - vpLines.from];
      if (!curLineElement || curLineElement instanceof HTMLElement === false)
        return;
      const curLineElementRect = curLineElement.getBoundingClientRect();

      let p =
        100 -
        ((curLineElementRect?.top +
          curLineElementRect?.height -
          r.rectWrapperElement?.top -
          32) /
          curLineElementRect?.height) *
          100;

      const lineElement = document.getElementById(
        "user-content-line-" + (topLine + 1)
      );

      if (!lineElement || !refHTMLOutputElement.current) return;

      const htmlOutput = refHTMLOutputElement.current;

      const htmlOutputFirstElementRect =
        htmlOutput.children[0].getBoundingClientRect();
      const lineElementRect = lineElement.getBoundingClientRect();
      const offset =
        lineElementRect.y -
        htmlOutputFirstElementRect.y +
        (lineElement.offsetHeight * p) / 100;
      htmlOutput.style.transform = `translateY(${-offset}px)`;
      // htmlOutput.scrollTop = offset;
    });
  }, [editor]);

  const setHTMLOutputElement = (element: HTMLDivElement) => {
    if (!refHTMLOutputElement.current && element) {
      refHTMLOutputElement.current = element;
      // reset();
    }
  };
  const step = () => {
    if (!state.isScroll) return;
    state.progress = (performance.now() - state.startTime) / 300;

    if (state.progress > 0.9999) {
      state.progress = 1;
      state.isScroll = false;
    }
    // box.style.top = -state.currY + "px";
    // https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    state.currY = state.prevY + state.progress * state.diffY;
    if (refHTMLOutputElement.current)
      refHTMLOutputElement.current.style.transform = `translateY(${-state.currY}px)`;
    window.requestAnimationFrame(step);
  };
  return { setHTMLOutputElement };
};
