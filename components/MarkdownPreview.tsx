import React from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { HTMLComponent } from "./HTMLComponent";
import { Context } from "./Context";
import style from "../styles/MarkdownPreview.module.scss";
import { Header } from "./Header";
export const MarkdownPreview = () => {
    const [html, setHTML] = React.useState("");
    const [markdown, setMarkdown] = React.useState({data:""});
    return (
        <Context.Provider value={{ html, setHTML, markdown, setMarkdown }}>
            <Header />
            <div className={style.container}>
                <MarkdownEditor />
                <HTMLComponent />
            </div>
        </Context.Provider>
    );
};
