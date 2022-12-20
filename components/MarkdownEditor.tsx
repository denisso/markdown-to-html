import React from "react";
import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});
import "easymde/dist/easymde.min.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Context } from "./Context";
import style from "../styles/MarkdownEditor.module.scss";
import debounce from "lodash.debounce";

type TResponse = {
    data?: string;
    error?: string;
};

export const MarkdownEditor = () => {
    const [value, setValue] = React.useState("Initial value");
    const { setHTML, markdown } = React.useContext(Context);
    const onChange = React.useCallback((value: string) => {
        setValue(value);
    }, []);
    React.useEffect(()=>{
        if(typeof markdown.data === "string"){
            setValue(markdown.data)
        }
    },[markdown])
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
        convertHTMLDebounce(value);
    }, [value, convertHTMLDebounce]);

    return (
        <div className={style.container}>
            <SimpleMdeReact
                value={value}
                onChange={onChange}
                className="Editor"
            />
        </div>
    );
};
