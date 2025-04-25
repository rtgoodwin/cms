import { i } from "./chunk.JQBT7BOV-NFX1XzKm.js";
class c extends i {
  connectedCallback() {
    super.connectedCallback(), this.library = this.getAttribute("library") || "craft";
  }
  attributeChangedCallback(a, r, t) {
    super.attributeChangedCallback(a, r, t), a === "library" && t && (this.library = t);
  }
}
customElements.define("craft-icon", c);
export {
  c as CraftIcon
};
