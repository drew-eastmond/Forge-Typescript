#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/FormlessManager.ts
import { $UsePromise, DecodeAttributes, Reactivity, Reactor, Subscription } from "@onyx-ignition/forge";
import { IsConnected, ParseElement, RenderElement, FormlessEvent } from "./0c633acb921eaf20839b6e24a9d91694.mjs";
var FormlessManager = class _FormlessManager extends Subscription {
  static Events = {
    Change: "formless_change",
    StoreFault: "store_fault"
  };
  static Race = 5e3;
  _abortController;
  _$ready = $UsePromise();
  _root;
  _stores = /* @__PURE__ */ new Set();
  _connections = /* @__PURE__ */ new Map();
  ignore = /* @__PURE__ */ new Set();
  _bindings = /* @__PURE__ */ new Map([
    [this._onChange, this._onChange.bind(this)]
  ]);
  [Reactivity] = new Reactor();
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
      if (IsConnected(element, store)) {
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
        if (IsConnected(element, store)) {
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
      if (this._connections.has(store) === false) throw new FormlessEvent(_FormlessManager.Events.StoreFault, { value: { store } });
      const element = this._connections.get(store);
      const value = await ParseElement(element, options);
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
        const value = DecodeAttributes(buffer);
        return RenderElement(element, value, options);
      }));
    }
    await Promise.allSettled(promises);
  }
};
export {
  FormlessManager
};
