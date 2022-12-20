import path from "path";
import fs from "fs";

interface IgetMarkdownFile {
    (arg: string): Promise<string>;
}

export const getMarkdownFile: IgetMarkdownFile = (filename) => {
    const jsonDirectory = path.join(process.cwd(), "markdown");
    return new Promise((resolve, reject) => {
        fs.readFile(
            jsonDirectory + "/" + filename,
            { encoding: "utf8", flag: "r" },
            (err, file) => {
                if (err) reject(err.message);
                else resolve(file);
            }
        );
    });
};

interface IgetMarkdownFiles {
    (): Promise<Array<string>>;
}
export const getMarkdownFiles: IgetMarkdownFiles = () => {
    const jsonDirectory = path.join(process.cwd(), "markdown");
    return new Promise((resolve, reject) => {
        fs.readdir(jsonDirectory, (err, files) => {
            if (err) reject(err.message);
            else resolve(files);
        });
    });
};
