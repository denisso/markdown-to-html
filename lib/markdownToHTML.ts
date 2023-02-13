import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import { rehypeCodeBlock } from "./plugins/rehypeCodeBlock";
import { rehypeAhref } from "./plugins/rehypeAhref";
import  rehypePrismCustom  from "./plugins/rehypePrismCustom";

export const convertMarkdownToHtml = (markdownString: string) => {
    try {
        return (
            unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype, { allowDangerousHtml: true })
                .use(rehypePrismCustom )
                .use(rehypeCodeBlock)
                .use(rehypeAhref)
                .use(rehypeStringify, { allowDangerousHtml: true })
                .processSync(markdownString)
                .toString()
        );
    } catch (error:any) {
        let errorMessage = "unknown error while HTML processing";
        if (typeof error === "string") {
            errorMessage = error;
        } else if (error?.message) {
            errorMessage = error.message;
        }

        return errorMessage;
    }
};