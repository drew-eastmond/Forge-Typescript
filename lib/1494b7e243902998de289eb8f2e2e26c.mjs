#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/FormlessHTMLElement.ts
import { ParseElement, FormlessEvent } from "./0c633acb921eaf20839b6e24a9d91694.mjs";
import { FormlessManager } from "./fda27465dc3feb2420c39c2f15edf95c.mjs";
var FormlessHTMLElement = class _FormlessHTMLElement extends HTMLElement {
  static Events = {
    ...FormlessManager.Events,
    Validate: "validate"
  };
  static Register(name) {
    name = name || "forge-formless";
    if (customElements.get(name) === void 0) customElements.define(name, _FormlessHTMLElement);
  }
  _bindings = /* @__PURE__ */ new Map([
    [this._onElementChange, this._onElementChange.bind(this)]
  ]);
  _manager = new FormlessManager(this);
  _$onParse;
  // public [Reactivity] = this._manager[Reactivity];
  constructor() {
    super();
    const manager = this._manager;
    manager.subscribe(_FormlessHTMLElement.Events.Change, this._bindings.get(this._onElementChange));
  }
  _onElementChange(notify, element, store) {
    console.log("_$onElementChange _$onElementChange");
    const value = ParseElement(element, { parse: this._$onParse });
    const validateEvent = new FormlessEvent(_FormlessHTMLElement.Events.Validate, { element, store, value });
    if (this.dispatchEvent(validateEvent)) {
      const changeEvent = new FormlessEvent(_FormlessHTMLElement.Events.Change, { element, store, value: validateEvent.value });
      this.dispatchEvent(changeEvent);
    }
  }
  _loadTheme() {
    console.log("_loadTheme");
    const style = document.createElement("style");
    style.textContent = `
:host(${this.tagName}) {
    background: #1E88E5;
    color: white;
    padding: 2rem 4rem;
    border: 0;
    font-size: 1.5rem;
    margin-block-end: 2rem;
}
    `;
    this.shadowRoot.appendChild(style);
  }
  $connect(values) {
    return this._manager.$connect(values);
  }
  get stores() {
    return this._manager.stores;
  }
  connectedCallback() {
    const manager = this._manager;
    const self = this;
    if (document.readyState === "interactive" || document.readyState === "complete") {
      manager.root = this;
    } else {
      document.addEventListener("DOMContentLoaded", function(event) {
        manager.root = self;
      });
    }
  }
  disconnectedCallback() {
    console.error("disconnectedCallback");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.warn("attributeChangedCallback", name, oldValue, newValue);
  }
  clear() {
  }
};
export {
  FormlessHTMLElement
};
