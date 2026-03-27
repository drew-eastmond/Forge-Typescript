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

// ../Forge-Typescript-Source/src/ts/formless/FormletHTMLElement.ts
var FormletHTMLElement_exports = {};
__export(FormletHTMLElement_exports, {
  FormletHTMLElement: () => FormletHTMLElement
});
module.exports = __toCommonJS(FormletHTMLElement_exports);
var import_Formless = require("./82b84a3600044d4c7f5da52239d1f3a1.js");
var FormletHTMLElement = class _FormletHTMLElement extends import_Formless.FormlessElement {
  static Register(name) {
    name = name || "forge-formlet";
    if (customElements.get(name) === void 0) customElements.define(name, _FormletHTMLElement);
  }
  renderer;
  parser;
  constructor() {
    super();
    this.renderer = import_Formless.RenderElement;
    this.parser = import_Formless.ParseElement;
  }
  set value(value) {
    if (this.renderer) this.renderer(this, value);
  }
  get value() {
    const results = {};
    const descendants = Array.from(this.querySelectorAll("[name]:not(& [name] [name])"));
    for (const element of descendants) results[element.getAttribute("name")] = (0, import_Formless.ParseElement)(element);
    return this.parser(this);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormletHTMLElement
});
