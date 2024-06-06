import React from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useContext } from "./Context";

export const Header = () => {
  const { setMarkdown } = useContext();
  const [files, setFiles] = React.useState<Array<string>>([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const getMarkdownFromServer = (file: string) => {
    setLoading(true);
    axios
      .get("/api/getfile?filename=" + file)
      .then(({ data }: AxiosResponse<{ data: string }>) => {
        if (typeof data.data === "string") setMarkdown(data.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setMarkdown(err.message);
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
    <div>
      <h1>Markdown converter @pre-alpha</h1>
      <div>
        <a
          href="https://github.com/denisso/markdown-to-html"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
        {" / "}
        <a
          href="https://mrdramm.vercel.app/posts/biblioteka-unified-dlya-preobrazovanii-markdown-v-html"
          rel="noreferrer"
          target="_blank"
        >
          Прочитать как работает этот конвертер
        </a>
        {" / "}
        <a href="https://mrdramm.vercel.app/" rel="noreferrer" target="_blank">
          developed by @mr_dramm
        </a>
      </div>
      <div>
        Загрузить примеры кода:{" "}
        {error !== ""
          ? error
          : loading
          ? "Loading"
          : files.map((filename: string, i: number) => (
              <span key={filename}>
                <a onClick={() => getMarkdownFromServer(filename)}>
                  {filename}
                </a>
                {i < files.length - 1 && " / "}
              </span>
            ))}
      </div>
    </div>
  );
};
