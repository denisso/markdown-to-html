import type { NextApiRequest, NextApiResponse } from "next";
import { getMarkdownFile } from "../../lib/getMarkdownFiles";
type TResponse = {
    data?: string;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TResponse>
) {
    const result: TResponse = {};
    const { filename } = req?.query;

    try {
        if (typeof filename !== "string") throw Error("filename not string");
        result.data = await getMarkdownFile(filename);
    } catch (err: any) {
        let error = "unknown error";
        if (typeof err === "string") error = err;
        if (err?.message) {
            error = err.message;
        }
        return res.status(500).send({ error });
    }

    res.status(200).json(result);
}
