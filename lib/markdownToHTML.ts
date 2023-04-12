import { processor } from "./processorMtoH";

export const convertMarkdownToHtml = (markdownString: string) => {
  try {
    return processor().processSync(markdownString).toString();
  } catch (error: any) {
    let errorMessage = "unknown error while HTML processing";
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
};
