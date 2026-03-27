#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/component/list/FormletListHTMLElement.ts
import { $UsePromise, QuickHash, Subscription } from "@onyx-ignition/forge";
import { FormlessEvent, ParseElement, RenderElement } from "./0c633acb921eaf20839b6e24a9d91694.mjs";
import { FormletHTMLElement } from "./2c575cd0ae990e09df23966774764693.mjs";
import { SortableHTMLElement } from "./cdc80176a78aeacf0527de502e129bae.mjs";
FormletHTMLElement.Register();
SortableHTMLElement.Register();
var ListHandle = class {
  _value;
  _container;
  constructor(value) {
    this._value = value;
  }
  set container(container) {
    if (this._container === void 0) this._container = container;
    if (this._value !== void 0) {
      this.value = this._value;
    }
  }
  get container() {
    return this._container;
  }
  set value(value) {
    this._value = value;
    if (this._container) {
      const entries = Object.entries(this._value);
      for (const [name, value2] of entries) {
        const element = this._container.querySelector(`[name="${name}"]`);
        RenderElement(element, { [name]: value2 });
      }
    }
  }
  get value() {
    if (this._container === void 0) return null;
    let result = {};
    const descedants = this._container.querySelectorAll(`[name]`);
    for (const descedant of descedants) {
      const name = descedant.getAttribute("name");
      result = { ...result, ...ParseElement(descedant) };
    }
    return result;
  }
  reset() {
  }
};
var ListState = class _ListState extends Subscription {
  static Events = {
    Add: "add",
    After: "after",
    Before: "before",
    Insert: "insert",
    Move: "move",
    Remove: "remove",
    Clear: "clear"
  };
  container;
  replicant;
  _elements = /* @__PURE__ */ new Map();
  _handles = /* @__PURE__ */ new Map();
  _$locks = /* @__PURE__ */ new Map();
  *[Symbol.iterator]() {
    const entries = this.container.children;
    for (const element of entries) yield this._handles.get(element);
  }
  _connect(value) {
    if (this.replicant === void 0) throw new FormlessEvent(FormlessEvent.Error, { error: "Replicant component not present to add entries into" });
    if (this.container === void 0) throw new FormlessEvent(FormlessEvent.Error, { error: "Entries component not present to add entries into" });
    const handle = new ListHandle(value);
    const clonedElement = this.replicant.cloneNode(true);
    const formlet = new FormletHTMLElement();
    formlet.append(clonedElement);
    handle.container = formlet;
    this._elements.set(handle, formlet);
    this._handles.set(formlet, handle);
    return [handle, formlet];
  }
  lock() {
    const hash = QuickHash();
    const $lock = $UsePromise();
    this._$locks.set(hash, $lock);
    return [hash, $lock[0]];
  }
  $unlock(handle) {
    if (this._$locks.has(handle) === false) return Promise.resolve(this);
    this._$locks;
  }
  load(values) {
    const results = [];
    for (const value of values) {
      const [handle, element] = this._connect(value);
      this.container.append(element);
      results.push(handle);
    }
    return results;
  }
  get value() {
    const result = [];
    const entries = this.container.children;
    for (const entry of entries) {
      const handle = this._handles.get(entry);
      result.push(handle.value);
    }
    return result;
  }
  indexOf(element) {
    const entries = this.container.children;
    for (let i = 0; i < entries.length; i++) if (entries[i] == element) return i;
    return -1;
  }
  handle(element) {
    for (const [handle, container] of this._elements) if (container == element) return handle;
  }
  add(value) {
    const [handle, element] = this._connect(value);
    this.container.append(element);
    this.notify(_ListState.Events.Add, this, handle);
    return handle;
  }
  remove(handle) {
    if (this._elements.has(handle) === void 0) return false;
    const formlet = handle.container;
    formlet.remove();
    this._elements.delete(handle);
    this._handles.delete(formlet);
    this.notify(_ListState.Events.Remove, this, handle);
    return true;
  }
  before(value, before) {
    const [handle, element] = this._connect(value);
    if (element === void 0) return;
    const beforeElement = this._elements.get(before);
    if (beforeElement === void 0) throw new Error(`<before> parameter is invalid`);
    beforeElement.before(element);
    this.notify([_ListState.Events.Add, _ListState.Events.Before], this, handle);
    return handle;
  }
  after(value, after) {
    const [handle, element] = this._connect(value);
    if (element === void 0) return;
    const afterElement = this._elements.get(after);
    if (afterElement === void 0) throw new Error(`<before> parameter is invalid`);
    afterElement.after(element);
    this.notify([_ListState.Events.Add, _ListState.Events.After], this, handle);
    return handle;
  }
  insert(value, index) {
    const [handle, element] = this._connect(value);
    if (element === void 0) return;
    const entries = this.container.children;
    const length = entries.length;
    index = index < 0 ? Math.max(0, length - index) : Math.min(index, length);
    const insertElement = this.container.children[index];
    if (index == length) {
      this.container.append(element);
    } else {
      insertElement.before(element);
    }
    this.notify([_ListState.Events.Add, _ListState.Events.Insert], this, handle);
    return handle;
  }
  move(handle, index) {
    const container = handle.container;
    const children = Array.from(this.container.children);
    const length = children.length;
    if (index == length) {
      this.container.append(container);
    } else {
      const insertElement = children[index];
      insertElement.insertAdjacentElement("beforebegin", container);
    }
    this.notify([_ListState.Events.Move], this, handle);
  }
  swap(handleA, handleB) {
  }
  clear() {
    this.container.innerHTML = "";
    const results = [...this._handles.values()];
    this._handles.clear();
    this._elements.clear();
    this.notify([_ListState.Events.Clear], this, results);
    return results;
  }
  refresh() {
  }
};
var FormletListHTMLElement = class _FormletListHTMLElement extends FormletHTMLElement {
  static Register(name) {
    name = name || "forge-formlet-list";
    if (customElements.get(name) === void 0) customElements.define(name, _FormletListHTMLElement);
  }
  _root;
  _abort = new AbortController();
  _state = new ListState();
  _sortable = new SortableHTMLElement();
  _bindings = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._bindings.set(this._onChange, this._onChange.bind(this));
    this._bindings.set(this._onDropStart, this._onDropStart.bind(this));
    const signal = this._abort.signal;
    this._sortable.addEventListener(SortableHTMLElement.Events.DROP_START, this._bindings.get(this._onDropStart), { signal });
    this._state.container = this._sortable;
    this._state.subscribe(/.+/, this._bindings.get(this._onChange));
    console.log("FormletListHTMLElement");
    console.log("FormletListHTMLElement");
    console.log("FormletListHTMLElement");
    console.log("FormletListHTMLElement");
    console.log("FormletListHTMLElement");
  }
  _onDropStart(event) {
    const { drag, drop } = event.attributes;
    const manager = this._state;
    const index = manager.indexOf(drop);
    const handle = manager.handle(drag);
    manager.move(handle, index);
  }
  _onChange(event) {
    console.log("ok change found", event);
    this.closest("forge-formless").dispatchEvent(new FormlessEvent("change", { element: this }));
  }
  connect() {
    if (this._root) return;
    this._root = this;
    const entriesSelector = this.getAttribute("entries") == null ? `entries, [id="entries"]` : this.getAttribute("entries");
    const entries = this.querySelector(entriesSelector);
    if (entries === null) throw new FormlessEvent(FormlessEvent.Error, { error: `Does not have a descendant that matches [${entriesSelector}]` });
    entries.append(this._sortable);
    const event = new FormlessEvent(FormlessEvent.Connect, { connect: { root: this._root }, element: this });
    this._$connect[1](event);
    return { root: this._root, element: this, entries: this._sortable };
  }
  connectedCallback() {
    if (document.readyState === "interactive" || document.readyState === "complete") {
      this.connect();
    } else {
      document.addEventListener("DOMContentLoaded", this.connect.bind(this));
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
  get sortable() {
    return this._sortable;
  }
  get state() {
    return this._state;
  }
  set replicant(element) {
    this._state.replicant = element;
  }
  set value(value) {
    console.warn("list value", value);
    const handles = this.state.load(value);
    for (const handle of handles) {
      const event = new FormlessEvent(FormlessEvent.Render, { value: handle, element: handle.container });
      this.dispatchEvent(event);
    }
  }
  get value() {
    return this.state.value;
  }
};
export {
  FormletListHTMLElement,
  ListHandle,
  ListState
};
