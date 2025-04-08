import {createActionApi} from './api.js';

export default class CraftForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    if (!this.form) {
      console.error('craft-form must wrap a form element.');
      return;
    }

    this.actionUrl = this.getAttribute('action-url') || this.actionUrl;
    this.form.addEventListener('submit', this.handleSubmit);
  }
  disconnectedCallback() {}

  handleSubmit = async (e) =>  {
    const target = e.target;
    await sendActionRequest(this.actionUrl)
    console.log(target);
  }
}

customElements.define('craft-form', CraftForm);
