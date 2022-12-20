export type Node = Partial<{
    type: string; // for example 'element'
    tagName: string; // for example "p"
    properties: { [key: string]: any }; //
    children: Array<Node>;
    value: string;
    position: {
        start: { line: number; column: number; offset: number }; // { line: 1, column: 1, offset: 0 }
        end: { line: number; column: number; offset: number };
    };
}>;
