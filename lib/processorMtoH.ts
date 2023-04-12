import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import { rehypeCodeBlock } from "./plugins/rehypeCodeBlock";
import { rehypeAhref } from "./plugins/rehypeAhref";
import rehypePrismCustom from "./plugins/rehypePrismCustom";
import rehypeNumerator from "./plugins/rehypeNumerator";

export const processor = () => {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrismCustom)
    .use(rehypeCodeBlock)
    .use(rehypeAhref)
    .use(rehypeNumerator)
    .use(rehypeStringify, { allowDangerousHtml: true });
};
