import React from "react";

type TContext = {
    html: string;
    setHTML: (arg: string) => void;
    markdown: { data: string };
    setMarkdown: (arg: { data: string }) => void;
};

export const Context = React.createContext<TContext>({
    html: "",
    setHTML: () => undefined,
    markdown: { data: "" },
    setMarkdown: () => undefined,
});
