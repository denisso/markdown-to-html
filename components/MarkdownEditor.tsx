import React from "react";
import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import type {
  GetCodemirrorInstance,
} from "react-simplemde-editor";
import type { Editor } from "codemirror";
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useContext } from "./Context";
import style from "./MarkdownEditor.module.scss";
import debounce from "lodash.debounce";

const EditorOptions = {
  autofocus: true,
  spellChecker: false,
  previewRender: function () {
    return ""; // Returns HTML from a custom parser
  },
  toolbar: [
    "bold",
    "italic",
    "strikethrough",
    "heading-1",
    "heading-2",
    "heading-3",
    "quote",
    "unordered-list",
    "ordered-list",
    "link",
    "image",
    "table",
    "horizontal-rule",
    "guide",
  ],
} as SimpleMDE.Options;

type TResponse = {
  data?: string;
  error?: string;
};

export const MarkdownEditor = () => {
  const [value, setValue] = React.useState("Initial value");
  const { setHTML, markdown, setEditor } = useContext();
  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const refEditor = React.useRef<Editor>();

  React.useEffect(() => {
    // update content in editor
    if (typeof markdown === "string") {
      setValue(markdown);
    }
  }, [markdown]);

  const convertHTMLDebounce = React.useMemo(() => {
    return debounce(function (content: string) {
      axios
        .post("/api/convert", { content })
        .then(({ data }: AxiosResponse<TResponse>) => {
          if (typeof data.data === "string") {
            setHTML(data.data);
          }
        })
        .catch((err: AxiosError) => {
          setHTML(err.message);
        });
    }, 1000);
  }, [setHTML]);

  React.useEffect(() => {
    // update content in output
    convertHTMLDebounce(value);
  }, [value, convertHTMLDebounce]);

  const getCodemirrorInstance: GetCodemirrorInstance = (inst) => {
    if (refEditor.current) return;
    refEditor.current = inst;
    // window.editor = inst
    setEditor(inst)
  };

  return (
    <div className={style.container}>
      <SimpleMdeReact
        getCodemirrorInstance={getCodemirrorInstance}
        options={EditorOptions}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
