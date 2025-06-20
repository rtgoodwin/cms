import type { Preview } from "@storybook/web-components-vite";
import "../src/styles/craftcms.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
