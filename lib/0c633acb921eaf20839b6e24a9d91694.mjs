#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/Formless.ts
import { $UsePromise } from "@onyx-ignition/forge";
var FormlessEvent = class extends Event {
  static Render = "render";
  static Parse = "parse";
  static Error = "error";
  static Connect = "connect";
  static Select = "select";
  store;
  value;
  element;
  error;
  connect;
  interaction;
  constructor(type, options) {
    super(type);
    this.store = options?.store;
    this.value = options?.value;
    this.element = options?.element;
    this.error = options?.error;
    this.connect = options?.connect;
    this.interaction = options?.interaction;
  }
};
function ParseElement(element, options) {
  if (element === void 0 || element === null) return void 0;
  const whereElements = new Set(options?.where);
  const ignoreElements = new Set(options?.ignore);
  const parse = options?.parse;
  const name = element.getAttribute("name");
  if (element.tagName.toLowerCase() == "forge-formlet" || element.hasAttribute("formlet")) {
    if (parse) return { [name]: parse(element) };
    const formlet = element;
    const value = formlet.value;
    return { [name]: value };
  }
  const descendants = new Set(Array.from(element.querySelectorAll(`[name]:not(& [name] [name])`)));
  if (whereElements && whereElements.size) {
    for (const child of [...descendants]) if (whereElements.has(child) === false) descendants.delete(child);
  }
  if (ignoreElements && ignoreElements.size) {
    for (const child of [...descendants]) if (ignoreElements.has(child) === true) descendants.delete(child);
  }
  let result = {};
  if (descendants.size) {
    for (const child of descendants) {
      const name2 = child.getAttribute("name");
      const value = ParseElement(child, options);
      if (result[name2] === void 0) {
        result[name2] = value[name2] === void 0 ? value : value[name2];
      } else if (result[name2].constructor.name == "Array") {
        result[name2] = result[name2].push(value);
      } else {
        result[name2] = [result[name2], value];
      }
    }
  } else {
    if (parse) return { [name]: parse(element) };
    return { [name]: ParseInput(element) };
  }
  return { [name]: result };
}
function ParseInput(element) {
  const name = element.getAttribute("name");
  switch (element.tagName.toLowerCase()) {
    case "input":
      switch (element.type.toLowerCase()) {
        case "checkbox":
          return element.checked;
        case "radio":
          const containerElement = element.closest("formless, .formless, [name]");
          const radioName = element.getAttribute("name");
          const radioElement = containerElement.querySelector(`input[type="radio"][name="${radioName}"]:checked:not(& [name] [name])`);
          return radioElement?.value;
        case "text":
        default:
          return element.value;
      }
      break;
    case "select":
      return element.value;
    default:
      return element.value;
  }
}
function RenderInput(element, value) {
  if (value === void 0) return;
  const inputElement = element;
  switch (inputElement.tagName.toLowerCase()) {
    case "input":
      switch (inputElement.type.toLowerCase()) {
        case "checkbox":
          inputElement.checked = value;
          break;
        case "radio":
          inputElement.checked = inputElement.value == value ? true : false;
          break;
        case "text":
        default:
          inputElement.value = value;
      }
      break;
    case "select":
      inputElement.value = value;
      break;
    default:
      inputElement.value = value;
  }
}
function RenderElement(element, attributes, options) {
  if (element === void 0 || element === null || attributes === void 0) return false;
  const name = element.getAttribute("name");
  if (element.tagName.toLowerCase() == "forge-formlet" || element.hasAttribute("formlet")) {
    const rendered = options?.render(element, attributes[name]) || false;
    const formlet = element;
    if (rendered === false) formlet.value = attributes[name];
    return true;
  }
  if (attributes.constructor.name != "Object") throw new Error(`Incorrect formatting at ${element} : ${name} : ${attributes}`);
  const scope = attributes[name];
  if (scope === void 0) return false;
  if (scope.constructor.name == "Object") {
    for (const [key, value] of Object.entries(scope)) {
      const descendents = Array.from(element.querySelectorAll(`[name="${key}"]:not(& [name] [name])`));
      if (descendents.length == 0) continue;
      if (descendents.length > 1) {
        let cursor = 0;
        for (let i = 0; i < descendents.length; i++) {
          const descendent = descendents[i];
          if (descendent === void 0) continue;
          if (value.constructor.name == "Array") {
            if (RenderElement(descendent, value[cursor], options)) cursor++;
          } else {
            const rendered = options?.render && options?.render(descendent, value) || false;
            if (rendered === false) RenderInput(descendent, value);
          }
        }
      } else {
        const descendent = descendents[0];
        RenderElement(descendent, scope, options);
      }
    }
  }
  if (scope.constructor.name == "Array") {
    const descendents = Array.from(element.querySelectorAll(`[name]:not(& [name] [name])`));
    let cursor = 0;
    const values = scope;
    for (let i = 0; i < descendents.length; i++) {
      const descendent = descendents[i];
      if (descendent === void 0) continue;
      if (values[cursor].constructor.name != "Object") throw new Error(`Formatting error. Should be an Object`);
      if (RenderElement(descendent, values[cursor], options)) cursor++;
    }
  } else {
    const rendered = options?.render && options?.render(element, scope) || false;
    if (rendered === false) RenderInput(element, scope);
  }
  return true;
}
function IsConnected(element, store) {
  const attributes = store.attributes;
  const selector = element.getAttribute("data-selector") || element.getAttribute("selector");
  const regExp = /\.?(?<query>\w+)\((?<parameters>\{.+?\})\)/g;
  let result;
  while (result = regExp.exec(selector)) {
    if (result === null) return false;
    const query = result.groups.query;
    const parameters = JSON.parse(result.groups.parameters);
    switch (query.toLowerCase()) {
      case "and":
        for (const [key, value] of Object.entries(parameters)) if (value != attributes[key]) return false;
        break;
      case "or":
        let matched = false;
        for (const [key, value] of Object.entries(parameters)) if (value == attributes[key]) matched = true;
        if (matched === false) return false;
        break;
      case "not":
        for (const [key, value] of Object.entries(parameters)) if (value == attributes[key]) return false;
        break;
      default:
        throw new Error(`Invalid query : "${query}"`);
    }
  }
  return true;
}
var FormlessElement = class extends HTMLElement {
  static Register(name, constructorRef) {
    if (customElements.get(name) === void 0) customElements.define(name, constructorRef);
  }
  _$connect = $UsePromise();
  _onDOMContentLoaded() {
    const root = this;
    const event = new FormlessEvent(FormlessEvent.Connect, { connect: { root }, element: this });
    this._$connect[1](event);
  }
  connectedCallback() {
    if (document.readyState === "interactive" || document.readyState === "complete") {
      this._onDOMContentLoaded();
    } else {
      document.addEventListener("DOMContentLoaded", this._onDOMContentLoaded.bind(this));
    }
  }
  addEventListener(type, listener, options) {
    switch (type) {
      case FormlessEvent.Connect:
        this._$connect[0].then(listener);
        break;
      default:
        super.addEventListener(type, listener, options);
    }
  }
};
export {
  FormlessElement,
  FormlessEvent,
  IsConnected,
  ParseElement,
  ParseInput,
  RenderElement,
  RenderInput
};
