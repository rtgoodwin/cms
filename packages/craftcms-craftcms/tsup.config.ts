import { defineConfig } from "tsup";
import { globby } from "globby";

export default defineConfig({
  entry: [
    "src/index.ts",
    ...(await globby("./src/components/**/!(*.(style|test)).ts")),
    ...(await globby("./src/utilities/**/!(*.test).ts")),
  ],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  clean: true,
});
