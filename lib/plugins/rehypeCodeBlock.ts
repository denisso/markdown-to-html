import type { Node } from "../unified.types";
const createBlockWithText = (content: number | string): Node => {
    const result: Node = {
        type: "element",
        tagName: "div",
        properties: { className: ["codeline"] },
        children: [{ type: "text", value: `${content}` }],
    };
    return result;
};

const createCodeBlockWrapperAST = () => {
    const codelines: Array<Node> = [];
    const codebox: Array<Node> = [];
    const codeblock = {
        type: "element",
        tagName: "section",
        properties: { className: ["codeblock"] },
        children: [
            {
                type: "element",
                tagName: "div",
                properties: { className: ["codelines"] },
                children: codelines,
            },
            {
                type: "element",
                tagName: "div",
                properties: { className: ["codebox"] },
                children: codebox,
            }
        ],
    };
    return { codeblock, codelines, codebox };
};

export const rehypeCodeBlock = () => {
    return (node: Node) => {
        if (!Array.isArray(node?.children)) return;
        for (const child of node?.children || []) {
            if (
                child?.tagName === "pre" &&
                child?.children?.[0]?.tagName === "code"
            ) {
                if (child instanceof Object === false) continue;
                const { codeblock, codelines, codebox } =
                    createCodeBlockWrapperAST();
                
                let code
                try {
                    code = JSON.parse(JSON.stringify(child));
                } catch (err: any) {
                    if (typeof err === "string")
                        codebox.push(createBlockWithText(err));
                    if (typeof err?.message === "string")
                        codebox.push(createBlockWithText(err?.message));
                        return
                }
                Object.assign(child, codeblock);
                codebox.push(code);
                const pos = code.position;
                for (
                    let i = 1;
                    i <= pos.end.line - pos.start.line - 1;
                    i++
                ) {
                    codelines.push(createBlockWithText(i));
                }
            }
        }
    };
};
