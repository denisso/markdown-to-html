import React from "react";

export const CodeSection = ({
  className,
  children,
}: JSX.IntrinsicElements["section"]) => {
  const refCodeBlock = React.useRef<HTMLElement | null>(null);
  const refCodeBox = React.useRef<HTMLElement | null>(null);
  const refBtnCopy = React.useRef<HTMLButtonElement | null>(null);
  const [copyBtn, setCopyBtn] = React.useState(false);
  const [textBthCopy, setTextBtnCopy] = React.useState("Copy");

  const handlerCopy = () => {
    const range = document.createRange();
    range.selectNodeContents(refCodeBox.current as Node);
    const buffer = range.valueOf().toString();
    navigator.clipboard
      .writeText(buffer)
      .then(() => {
        setTextBtnCopy("Copied");
        refBtnCopy.current?.classList?.add("copied");
        setTimeout(() => {
          refBtnCopy.current?.classList?.remove("copied");
          setTextBtnCopy("Copy");
        }, 2000);
      })
      .catch(() => {
        setTextBtnCopy("Copy error");
        refBtnCopy.current?.classList?.add("error");
        setTimeout(() => {
          refBtnCopy.current?.classList?.remove("error");
          setTextBtnCopy("Copy");
        }, 2000);
      });
  };
  return (
    <section
      className={className}
      ref={(node: HTMLElement) => {
        if (node && refCodeBlock.current === null) {
          refCodeBlock.current = node;
          refCodeBox.current = node.querySelector(".codebox");
          if (refCodeBox.current) {
            setCopyBtn(true);
          }
        }
      }}
    >
      {copyBtn && (
        <button className="codecopy" onClick={handlerCopy} ref={refBtnCopy}>
          {textBthCopy}
        </button>
      )}
      {children}
    </section>
  );
};
