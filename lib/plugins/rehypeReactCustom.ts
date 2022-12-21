import { ReactNode } from "react";
import { toH } from "hast-to-hyperscript";
// @ts-expect-error: hush.
import tableCellStyle from "@mapbox/hast-util-table-cell-style";
import { whitespace } from "hast-util-whitespace";
import type { Options } from "rehype-react";
const own = {}.hasOwnProperty;
const tableElements = new Set([
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
]);

export default function rehypeReactCustom(options: Options) {
    if (!options || typeof options.createElement !== "function") {
        throw new TypeError("createElement is not a function");
    }

    const createElement = options.createElement;
    
    // @ts-expect-error: hush.
    Object.assign(this, { Compiler: compiler });

    /** @type {import('unified').CompilerFunction<Root, ReactNode>} */
    function compiler(node: any) {
        /** @type {ReactNode} */
        // @ts-expect-error: assume `name` is a known element.
        let result = toH(h, tableCellStyle(node), options.prefix);

        if (node.type === "root") {
            // Invert <https://github.com/syntax-tree/hast-to-hyperscript/blob/d227372/index.js#L46-L56>.
            result =
                result &&
                typeof result === "object" &&
                "type" in result &&
                "props" in result &&
                result.type === "div" &&
                (node.children.length !== 1 ||
                    node.children[0].type !== "element")
                    ? // `children` does exist.
                      // type-coverage:ignore-next-line
                      result.props.children
                    : [result];

            return createElement(options.Fragment || "div", {}, result);
        }

        return result;
    }

    function h(
        name: keyof JSX.IntrinsicElements,
        props: Record<string, unknown>,
        children: Array<ReactNode>
    ) {
        if (props?.ref) {
            props.ref = null;
        }

        if (children && tableElements.has(name)) {
            children = children.filter((child) => !whitespace(child));
        }

        if (options.components && own.call(options.components, name)) {
            const component = options.components[name];

            if (options.passNode && typeof component === "function") {
                // @ts-expect-error: `toH` passes the current node.
                // type-coverage:ignore-next-line
                props = Object.assign({ node: this }, props);
            }

            return createElement(component, props, children);
        }

        return createElement(name, props, children);
    }
}
