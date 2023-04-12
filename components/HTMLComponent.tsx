import React from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeReact from "rehype-react";
import { useContext } from "./Context";
import style from "./HTMLComponent.module.scss";
import ErrorBoundary from "./ErrorBoundary";
import { useSmoothScroll } from "./useSmoothScroll";
import { CodeSection } from "./CodeSection";

export const HTMLComponent = () => {
  const { html } = useContext();
  const processor = React.useMemo(() => {
    let p = null;
    try {
      p = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeSanitize, {
          ...defaultSchema,
          tagNames: [...(defaultSchema.tagNames || []), "section", "iframe"],

          attributes: {
            ...defaultSchema.attributes,
            "*": ["className", "id"],
            iframe: [
              "width",
              "height",
              "src",
              "title",
              "allow",
              "allowfullscreen",
            ],
            a: ["href", "rel", "target"],
          },
        })
        .use(rehypeReact, {
          createElement: React.createElement,
          Fragment: React.Fragment,
          components: {
            section: CodeSection,
          },
        });
    } catch (e) {}
    return p;
  }, []);

  const HTML = React.useMemo<() => JSX.Element>(() => {
    /**
     * sanitize html, add code plugins
     */
    let Result = () => <></>;
    if (!processor) return Result;

    try {
      const r = (processor.processSync(html).result || <></>) as JSX.Element;
      Result = () => r;
    } catch (err) {}

    return Result;
  }, [html, processor]);

  const { setHTMLOutputElement } = useSmoothScroll();

  return (
    <div className={style.container}>
      <h2 className={style.title}>HTML:</h2>
      <div className={style.content} ref={setHTMLOutputElement}>
        <ErrorBoundary>
          <HTML />
        </ErrorBoundary>
      </div>
    </div>
  );
};
