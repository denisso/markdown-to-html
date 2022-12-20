import type { Node } from "../unified.types";

const parse = (node: Node) => {
    try {
        switch (true) {
            case node instanceof Object:
                if (node.type !== "element") return;
                if (node.tagName === "a") {
                    if (!node?.properties)
                        Object.assign(node, { properties: { src: "#" } });
                    if (node.properties) {
                        node.properties.target = "_blank";
                        node.properties.rel = "noreferrer";
                    }

                    return;
                }

                if (Array.isArray(node?.children))
                    for (const child of node.children) parse(child);
                break;
            default:
        }
    } catch (err) {}
};

export const rehypeAhref = () => {
    return (node: Node) => {
        try {
            const { children } = node;
            if (!Array.isArray(children)) return;
            for (const child of children) parse(child);
        } catch (err) {}
    };
};
