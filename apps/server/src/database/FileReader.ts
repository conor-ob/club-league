import { readFileSync } from "node:fs";
import path from "node:path";

export class FileReader {
  public readFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    return readFileSync(filePath, {
      encoding: "utf-8",
    });
  }
}
