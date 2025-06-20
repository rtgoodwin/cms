import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { html } from "lit";

import "./disclosure.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Components/Disclosure",
  component: "craft-disclosure",
  argTypes: {
    state: {
      control: {
        type: "select",
      },
      options: ["collapsed", "expanded"],
      defaultValue: null,
    },
  },
  render: (args) => html`
    <craft-disclosure state="${args.state}" ${args.cookieName ? `cookie-name="${args.cookieName}` : ""}">
      <button type="button" aria-controls="target">Toggle</button>
      <div id="target">This will toggle</div>
    </craft-disclosure>
  `,
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {},
};

export const Expanded: Story = {
  args: {
    state: "expanded",
  },
};

export const Persistant: Story = {
  args: {
    cookieName: "persistent-disclosure",
  },
};
