import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig(async ({ command, mode }) => {
  const plugins = [];
  if (command === "build" && mode === "production") {
    plugins.push(dts({ rollupTypes: true }));
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      lib: {
        entry: {
          "craft-cms": resolve(__dirname, "src/craft-cms.ts"),
          components: resolve(__dirname, "src/components/index.ts"),
        },
        name: "CraftCMS",
      },
    },
  };
});
