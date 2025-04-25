import CraftIcon from './icon.component.js';

export * from './icon.component.js';
export default CraftIcon;

customElements.define('craft-icon', CraftIcon);

declare global {
  interface HTMLElementTagNameMap {
    'craft-icon': CraftIcon;
  }
}
