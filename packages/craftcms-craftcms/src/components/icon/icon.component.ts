import { SlIcon } from "@shoelace-style/shoelace";

class CraftIcon extends SlIcon {
  override connectedCallback(): void {
    super.connectedCallback();
    this.library = this.getAttribute("library") || "craft";
  }

  override attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "library" && newValue) {
      this.library = newValue;
    }
  }
}

export default CraftIcon;
