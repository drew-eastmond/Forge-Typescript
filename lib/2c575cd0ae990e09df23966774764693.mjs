#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/FormletHTMLElement.ts
import { ParseElement, RenderElement, FormlessElement } from "./0c633acb921eaf20839b6e24a9d91694.mjs";
var FormletHTMLElement = class _FormletHTMLElement extends FormlessElement {
  static Register(name) {
    name = name || "forge-formlet";
    if (customElements.get(name) === void 0) customElements.define(name, _FormletHTMLElement);
  }
  renderer;
  parser;
  constructor() {
    super();
    this.renderer = RenderElement;
    this.parser = ParseElement;
  }
  set value(value) {
    if (this.renderer) this.renderer(this, value);
  }
  get value() {
    const results = {};
    const descendants = Array.from(this.querySelectorAll("[name]:not(& [name] [name])"));
    for (const element of descendants) results[element.getAttribute("name")] = ParseElement(element);
    return this.parser(this);
  }
};
export {
  FormletHTMLElement
};
