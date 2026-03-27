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

// ../Forge-Typescript-Source/src/ts/formless/FormlessManager.ts
var FormlessManager_exports = {};
__export(FormlessManager_exports, {
  FormlessManager: () => FormlessManager
});
module.exports = __toCommonJS(FormlessManager_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Formless = require("./82b84a3600044d4c7f5da52239d1f3a1.js");
var FormlessManager = class _FormlessManager extends import_forge.Subscription {
  static Events = {
    Change: "formless_change",
    StoreFault: "store_fault"
  };
  static Race = 5e3;
  _abortController;
  _$ready = (0, import_forge.$UsePromise)();
  _root;
  _stores = /* @__PURE__ */ new Set();
  _connections = /* @__PURE__ */ new Map();
  ignore = /* @__PURE__ */ new Set();
  _bindings = /* @__PURE__ */ new Map([
    [this._onChange, this._onChange.bind(this)]
  ]);
  [import_forge.Reactivity] = new import_forge.Reactor();
  constructor(root) {
    super();
    this._abortController = new AbortController();
    const signal = this._abortController.signal;
    this._root = root;
    this._root.addEventListener("change", this._bindings.get(this._onChange), { signal });
  }
  async _onChange(event) {
    console.error("_onChange", event);
    const target = event.constructor.name == "FormlessEvent" ? event.element : event.target;
    for (const [store, element] of this._connections) {
      if (element.contains(target)) return this.notify(_FormlessManager.Events.Change, element, store);
    }
  }
  _$connectStore(store) {
    const storedElements = Array.from(this._root.querySelectorAll(`[data-selector], [selector]`));
    for (const element of storedElements) {
      if ((0, import_Formless.IsConnected)(element, store)) {
        this._connections.set(store, element);
        return true;
      }
    }
    return false;
  }
  set root(root) {
    this._root;
  }
  async $connect(values) {
    if (values === void 0) return;
    const stores = /* @__PURE__ */ new Set([...values]);
    const changed = /* @__PURE__ */ new Set();
    for (const store of stores) {
      if (this._stores.has(store) === false) changed.add(store);
    }
    for (const store of [...this._stores]) {
      if (stores.has(store)) continue;
    }
    this._connections.clear();
    this._stores.clear();
    console.log([...stores].map((store) => store.hash));
    const elements = Array.from(this._root.querySelectorAll(`[data-selector], [selector]`));
    for (const element of elements) {
      for (const store of stores) {
        if ((0, import_Formless.IsConnected)(element, store)) {
          this._connections.set(store, element);
          this._stores.add(store);
          stores.delete(store);
          break;
        }
      }
    }
    return this.$render([...values]);
  }
  get stores() {
    return [...this._stores];
  }
  get $ready() {
    return this._$ready[0];
  }
  async $parse(stores, options) {
    const results = /* @__PURE__ */ new Map();
    for (const store of stores) {
      if (this._connections.has(store) === false) throw new import_Formless.FormlessEvent(_FormlessManager.Events.StoreFault, { value: { store } });
      const element = this._connections.get(store);
      const value = await (0, import_Formless.ParseElement)(element, options);
      results.set(store, value);
    }
    return results;
  }
  async $render(stores, options) {
    const promises = [];
    for (const store of stores) {
      const element = this._connections.get(store);
      if (element === void 0) continue;
      promises.push(store.$read().then(function([buffer, mime]) {
        const value = (0, import_forge.DecodeAttributes)(buffer);
        return (0, import_Formless.RenderElement)(element, value, options);
      }));
    }
    await Promise.allSettled(promises);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormlessManager
});
