import React from "react";
import style from "../styles/Header.module.scss";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Context } from "./Context";

export const Header = () => {
    const { setMarkdown } = React.useContext(Context);
    const [files, setFiles] = React.useState<Array<string>>([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const getMarkdownFromServer = (file: string) => {
        setLoading(true);
        axios
            .get("/api/getfile?filename=" + file)
            .then(({ data }: AxiosResponse<{ data: string }>) => {
                if (typeof data.data === "string")
                    setMarkdown({ data: data.data });
                setLoading(false);
            })
            .catch((err: AxiosError) => {
                setMarkdown({ data: err.message });
                setLoading(false);
            });
    };

    React.useEffect(() => {
        axios
            .get("/api/getfiles")
            .then(({ data }: AxiosResponse<{ data: Array<string> }>) => {
                if (Array.isArray(data.data)) setFiles(data.data);
            })
            .catch((err: AxiosError) => {
                setError(err.message);
            });
    }, []);

    return (
        <div className={style.container}>
            <a
                href="https://github.com/denisso/markdown-to-html-converter"
                rel="noreferrer"
                target="_blank"
            >Githib</a>
            Load markdown examples:{" "}
            {error !== ""
                ? error
                : loading
                ? "Loading"
                : files.map((filename: string) => (
                      <a
                          key={filename}
                          onClick={() => getMarkdownFromServer(filename)}
                      >
                          {filename}
                      </a>
                  ))}
        </div>
    );
};
