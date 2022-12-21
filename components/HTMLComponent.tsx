import React from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReactCustom from "../lib/plugins/rehypeReactCustom";
import { Context } from "./Context";
import style from "../styles/HTMLComponent.module.scss";
import ErrorBoundary from "./ErrorBoundary";
const CodeSection = ({
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
                <button
                    className="codecopy"
                    onClick={handlerCopy}
                    ref={refBtnCopy}
                >
                    {textBthCopy}
                </button>
            )}

            {children}
        </section>
    );
};

export const HTMLComponent = () => {
    const { html } = React.useContext(Context);
    const HTML = React.useMemo(() => {
        let result: JSX.Element = <></>;
        try {
            result = (unified()
                .use(rehypeParse, { fragment: true })
                .use(rehypeReactCustom, {
                    createElement: React.createElement,
                    Fragment: React.Fragment,
                    components: {
                        section: CodeSection,
                    },
                })
                .processSync(html).result || <></>) as JSX.Element;
        } catch (err) {}
        const HTML = () => result;
        return HTML;
    }, [html]);
    return (
        <div className={style.container}>
            <h2 className={style.title}>HTML:</h2>
            <div className={style.content}>
                <ErrorBoundary>
                    <HTML />
                </ErrorBoundary>
            </div>
        </div>
    );
};
