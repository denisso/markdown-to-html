import type { NextApiRequest, NextApiResponse } from "next";
import { convertMarkdownToHtml } from "../../lib/markdownToHTML";
interface INextApiRequestEndpoint extends NextApiRequest {
    body: {
        content?: string;
    };
}

type TResponse = {
    data?: string;
    error?: string;
};

export default async function handler(
    req: INextApiRequestEndpoint,
    res: NextApiResponse<TResponse>
) {
    const body = req?.body;
    const result: TResponse = {};
    if (typeof body?.content !== "string") {
        return res.status(402).send({
            error: "property content not exist or not string",
        });
    }
    try {
        result.data = convertMarkdownToHtml(body.content);
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
