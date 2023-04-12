import React from "react";
import type { Editor } from "codemirror";

type TContext = {
  html: string;
  setHTML: React.Dispatch<React.SetStateAction<string>>;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  line: number;
  setLine: React.Dispatch<React.SetStateAction<number>>;
  setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
  editor: Editor | null;
};

const Context = React.createContext<TContext | undefined>(undefined);

interface IContextProvider {
  (props: { children: React.ReactNode }): JSX.Element;
}

export const ContextProvider: IContextProvider = ({ children }) => {
  const [html, setHTML] = React.useState("");
  const [markdown, setMarkdown] = React.useState("");
  const [line, setLine] = React.useState(0);
  const [editor, setEditor] = React.useState<Editor | null>(null);
  return (
    <Context.Provider
      value={{
        html,
        setHTML,
        markdown,
        setMarkdown,
        line,
        setLine,
        editor,
        setEditor,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContext = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
