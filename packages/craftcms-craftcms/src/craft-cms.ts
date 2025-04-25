import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";
import { setBasePath, getBasePath } from "@shoelace-style/shoelace";

registerIconLibrary("craft", {
  /**
   * This is a bit hacky because the resolver only gets the `name` prop.
   * I believe that is resolve in the web awesome version
   */
  resolver: (name) => {
    if (!name.includes("/")) {
      name = `solid/${name}`;
    }

    return `${getBasePath()}/${name}.svg`;
  },
  mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});

export { setBasePath, registerIconLibrary };
