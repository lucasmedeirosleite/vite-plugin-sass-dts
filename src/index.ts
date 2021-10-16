import { Plugin } from "vite";
import postcssJs from "postcss-js";
import postcss from "postcss";
import { extractClassNameKeys } from "./extract";
import { writeToFile } from "./write";
import fs from "fs";
import { parseCss } from "./css";

export default function Plugin(): Plugin {
  return {
    name: "vite-plugin-sass-dts",
    handleHotUpdate(context) {
      if (
        !context.file.endsWith(".css") &&
        !context.file.endsWith(".scss") &&
        !context.file.endsWith(".sass")
      )
        return;

      try {
        fs.readFile(context.file, async (err, file) => {
          if (err) {
            console.error(err);
          } else {
            const css = context.file.endsWith(".css")
              ? file.toString()
              : await parseCss(file, context);
            const classNameKeys = extractClassNameKeys(
              postcssJs.objectify(postcss.parse(css))
            );
            writeToFile(context.file, classNameKeys);
          }
        });
      } catch (e) {
        console.error("e :>> ", e);
      }
      return;
    },
  };
}