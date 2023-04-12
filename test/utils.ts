import { processor } from "../lib/processorMtoH.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Node } from "../lib/unified.types.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processFile = (fileName: string): Node => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName), {
    encoding: "utf8",
  });
  const result = processor().runSync(processor().parse(buffer)) as Node;
  fs.writeFile(
    path.join(__dirname, path.parse(fileName).name + ".json"),
    JSON.stringify(result, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
  const html = processor().processSync(buffer).toString();
  fs.writeFile(
    path.join(__dirname, path.parse(fileName).name + ".html"),
    html,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
  return result;
};
