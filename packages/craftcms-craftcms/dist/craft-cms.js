import { r as t, g as s } from "./chunk.JQBT7BOV-NFX1XzKm.js";
import { s as a } from "./chunk.JQBT7BOV-NFX1XzKm.js";
t("craft", {
  /**
   * This is a bit hacky because the resolver only gets the `name` prop.
   * I believe that is resolve in the web awesome version
   */
  resolver: (r) => (r.includes("/") || (r = `solid/${r}`), `${s()}/${r}.svg`),
  mutator: (r) => r.setAttribute("fill", "currentColor")
});
export {
  t as registerIconLibrary,
  a as setBasePath
};
