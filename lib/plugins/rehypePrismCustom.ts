import { refractor } from "refractor/lib/core.js";
import jsx from "refractor/lang/jsx.js";
import markup from "refractor/lang/markup.js";
import clike from "refractor/lang/clike.js";
import javascript from "refractor/lang/javascript.js";
import css from "refractor/lang/css.js";
import cssExtras from "refractor/lang/css-extras.js";
import jsExtras from "refractor/lang/js-extras.js";
import sql from "refractor/lang/sql.js";
import typescript from "refractor/lang/typescript.js";
import markdown from "refractor/lang/markdown.js";
import json from "refractor/lang/json.js";
import { visit, Node } from "unist-util-visit";
import type { Node as NodeMy } from "../unified.types";
import {
    toString as nodeToString,
    Node as NodeToString,
} from "hast-util-to-string";

type NodeCustom = NodeToString & NodeMy;

refractor.register(jsx);
refractor.register(clike);
refractor.register(markup);
refractor.register(json);
refractor.register(typescript);
refractor.register(javascript);
refractor.register(css);
refractor.register(cssExtras);
refractor.register(jsExtras);
refractor.register(sql);
refractor.register(markdown);
refractor.alias({ jsx: ["js"] });

const getLanguage = (node: NodeCustom) => {
    const className = node?.properties?.className || [];
    for (const classListItem of className) {
        if (classListItem.slice(0, 9) === "language-") {
            return classListItem.slice(9).toLowerCase();
        }
    }
    return null;
};

const rehypePrismCustom = (options: { [key: string]: any } = {}) => {
    if (options.alias) {
        refractor.alias(options.alias);
    }

    return (tree: Node) => {
        visit(tree, "element", visitor);
    };

    function visitor(node: NodeCustom, index: number, parent: NodeCustom) {
        if (!parent || parent.tagName !== "pre" || node.tagName !== "code") {
            return;
        }

        const lang = getLanguage(node);

        if (lang === null) {
            return;
        }

        try {
            if (parent.properties)
                parent.properties.className = (
                    parent?.properties?.className || []
                ).concat("language-" + lang) as string;
            const str = nodeToString(node);

            node.children = refractor.highlight(str, lang)
                .children as Array<NodeMy>;
        } catch (err) {}
    }
};
export default rehypePrismCustom;
