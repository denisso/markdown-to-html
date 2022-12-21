import type { Node } from "../unified.types";
import { visit, Node as NodeVisitor } from "unist-util-visit";

export const rehypeAhref = () => {
    return (tree: NodeVisitor) => {
        try {
            visit(tree, { tagName: "a" }, (node: Node) => {
                if (
                    node?.properties instanceof Object &&
                    node?.properties?.href?.[0] !== "#"
                ) {
                    node.properties.target = "_blank";
                    node.properties.rel = "noreferrer";
                }
            });
        } catch (err) {}
    };
};
