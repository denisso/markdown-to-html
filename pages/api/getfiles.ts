import type { NextApiRequest, NextApiResponse } from "next";
import { getMarkdownFiles } from "../../lib/getMarkdownFiles";
type TResponse = {
    data?: Array<string>;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TResponse>
) {
    const result: TResponse = {};

    try {
        result.data = await getMarkdownFiles();
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
