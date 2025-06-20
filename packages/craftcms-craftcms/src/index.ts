import type { CraftGlobal } from "./types.js";

export { default as CraftDisclosure } from "./components/disclosure/disclosure.js";
export * from "./utilities/cookies.js";

declare var Craft: CraftGlobal;

declare global {
  interface Window {
    Craft: CraftGlobal;
  }
}
