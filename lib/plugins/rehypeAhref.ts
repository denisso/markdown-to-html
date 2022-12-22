import type { Node } from "../unified.types";
import { visit, Node as NodeVisitor } from "unist-util-visit";

export const rehypeAhref = () => {
    return (tree: NodeVisitor) => {
        try {
            visit(tree, { tagName: "a" }, (node: Node) => {
                if(!node?.properties){
                    node.properties = {}
                }
                const props = node.properties
                if(props.href[0] !== "#"){
                    props.target = "_blank";
                    props.rel = "noreferrer";
                }   
            });
        } catch (err) {}
    };
};
