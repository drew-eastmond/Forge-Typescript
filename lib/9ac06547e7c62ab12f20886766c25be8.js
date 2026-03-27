#! /usr/bin/env node

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../Forge-Typescript-Source/src/ts/formless/FormlessHTMLElement.ts
var FormlessHTMLElement_exports = {};
__export(FormlessHTMLElement_exports, {
  FormlessHTMLElement: () => FormlessHTMLElement
});
module.exports = __toCommonJS(FormlessHTMLElement_exports);
var import_Formless = require("./82b84a3600044d4c7f5da52239d1f3a1.js");
var import_FormlessManager = require("./77a6ca05fb7a127e3e5c081337e50a63.js");
var FormlessHTMLElement = class _FormlessHTMLElement extends HTMLElement {
  static Events = {
    ...import_FormlessManager.FormlessManager.Events,
    Validate: "validate"
  };
  static Register(name) {
    name = name || "forge-formless";
    if (customElements.get(name) === void 0) customElements.define(name, _FormlessHTMLElement);
  }
  _bindings = /* @__PURE__ */ new Map([
    [this._onElementChange, this._onElementChange.bind(this)]
  ]);
  _manager = new import_FormlessManager.FormlessManager(this);
  _$onParse;
  // public [Reactivity] = this._manager[Reactivity];
  constructor() {
    super();
    const manager = this._manager;
    manager.subscribe(_FormlessHTMLElement.Events.Change, this._bindings.get(this._onElementChange));
  }
  _onElementChange(notify, element, store) {
    console.log("_$onElementChange _$onElementChange");
    const value = (0, import_Formless.ParseElement)(element, { parse: this._$onParse });
    const validateEvent = new import_Formless.FormlessEvent(_FormlessHTMLElement.Events.Validate, { element, store, value });
    if (this.dispatchEvent(validateEvent)) {
      const changeEvent = new import_Formless.FormlessEvent(_FormlessHTMLElement.Events.Change, { element, store, value: validateEvent.value });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormlessHTMLElement
});
