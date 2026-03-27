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

// ../Forge-Typescript-Source/src/ts/formless/component/Sortable/SortableHTMLElement.ts
var SortableHTMLElement_exports = {};
__export(SortableHTMLElement_exports, {
  SortableConfig: () => SortableConfig,
  SortableEvent: () => SortableEvent,
  SortableHTMLElement: () => SortableHTMLElement
});
module.exports = __toCommonJS(SortableHTMLElement_exports);
var import_DragDropManager = require("@ts/dragdrop/DragDropManager");
var import_Input = require("./4a262a37a895a43592f045d9c4ef3539.js");
var SortableConfig = class {
  selector;
  proxy;
  radius;
  race;
  events;
  constructor(props) {
    this.selector.element = props?.selector.element || "& > *";
    this.selector.handle = props?.selector.element || ".drag-handle";
    this.proxy = props?.proxy;
    this.radius = props?.radius;
    this.race = props?.race;
    this.events = {
      drag: {
        start: props?.events?.drag?.start || [],
        move: props?.events?.drag?.move || [],
        end: props?.events?.drag?.end || []
      },
      drop: {
        start: props?.events?.drop?.start || [],
        move: props?.events?.drop?.move || [],
        over: props?.events?.drop?.over || [],
        cancel: props?.events?.drop?.cancel || [],
        complete: props?.events?.drop?.complete || []
      },
      click: props?.events?.click
    };
  }
  configure(element, options) {
    const abort = options?.abort || new AbortController();
    const signal = abort.signal;
    element.proxy = this.proxy;
    return abort;
  }
};
function RenderProxy(source, ...rest) {
  if (rest.length == 0) {
    return source.cloneNode(true);
  } else if (rest.length == 1) {
    const value = rest[0];
    if (value === void 0) return;
    if (value.constructor.name == "String") {
      const element = document.createElement("sortable.proxy");
      element.innerHTML = value;
      return element;
    } else {
      const element = value;
      return element.cloneNode(true);
    }
  }
}
var ProxyManager = class {
  _renderer;
  _params;
  element;
  constructor(options) {
    this._params = options?.params || [];
    this._renderer = options?.renderer || RenderProxy;
  }
  set params(values) {
    this._params = values;
  }
  set renderer(value) {
    this._renderer = value || RenderProxy;
  }
  get renderer() {
    return this._renderer;
  }
  render(source) {
    return this.element = this._renderer(source, ...this._params);
  }
  reset() {
    this.element = void 0;
  }
};
var SortableEvent = class extends Event {
  sortable;
  attributes;
  interaction;
  constructor(type, sortable, attribute) {
    super(type);
    this.sortable = sortable;
    this.attributes = attribute || {};
  }
  _getElementData(target) {
    const sortable = this.sortable;
    const elements = Array.from(sortable.querySelectorAll(sortable.selectors.closest));
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.isEqualNode(target) || element.contains(target)) return [element, i];
    }
  }
  getDragData() {
    const dragDropManager = this.sortable.dragDropManager;
    const dragManager = dragDropManager.dragManager;
    const [source, index] = this._getElementData(dragManager.current);
    return { dragManager, source, index };
  }
  getDropData() {
    const dragDropManager = this.sortable.dragDropManager;
    const dropManager = dragDropManager.dropManager;
    const [target, index] = this._getElementData(dropManager.target);
    return { dropManager, target, index };
  }
};
var SortableHTMLElement = class _SortableHTMLElement extends HTMLElement {
  static Events = {
    DRAG_START: import_DragDropManager.DragDropManager.DRAG_START,
    DRAG_MOVE: import_DragDropManager.DragDropManager.DRAG_MOVE,
    DRAG_END: import_DragDropManager.DragDropManager.DRAG_END,
    DROP_START: import_DragDropManager.DragDropManager.DROP_START,
    DROP_MOVE: import_DragDropManager.DragDropManager.DROP_MOVE,
    DROP_OVER: import_DragDropManager.DragDropManager.DROP_OVER,
    DROP_CANCEL: import_DragDropManager.DragDropManager.DROP_CANCEL,
    DROP_COMPLETE: import_DragDropManager.DragDropManager.DROP_COMPLETE,
    CLICK: import_Input.PointerOptions.CLICK,
    DOUBLE_CLICK: import_Input.PointerOptions.DoubleClick
  };
  static Register(name) {
    name = name || "forge-sortable";
    if (customElements.get(name) === void 0) customElements.define(name, _SortableHTMLElement);
  }
  _dragDropManager;
  _proxy;
  _selectors;
  _bindings = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._proxy = new ProxyManager();
    this._bindings.set(this._onDragStart, this._onDragStart.bind(this));
    this._bindings.set(this._onDragMove, this._onDragMove.bind(this));
    this._bindings.set(this._onDragEnd, this._onDragEnd.bind(this));
    this._bindings.set(this._onDragEnd, this._onDragEnd.bind(this));
    this._bindings.set(this._onDropStart, this._onDropStart.bind(this));
    this._bindings.set(this._onDropOver, this._onDropOver.bind(this));
    this._bindings.set(this._onDropComplete, this._onDropComplete.bind(this));
    this._bindings.set(this._onDragDropNotify, this._onDragDropNotify.bind(this));
    this._bindings.set(this._onClick, this._onClick.bind(this));
    this._bindings.set(this._onDoubleClick, this._onDoubleClick.bind(this));
    this._selectors = {
      closest: "forge-formlet",
      handle: ".drag-handle"
    };
    this._dragDropManager = new import_DragDropManager.DragDropManager(this, { selectors: this._selectors });
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DRAG_START, this._bindings.get(this._onDragStart));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DRAG_MOVE, this._bindings.get(this._onDragMove));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DRAG_END, this._bindings.get(this._onDragEnd));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DROP_START, this._bindings.get(this._onDropStart));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DROP_OVER, this._bindings.get(this._onDropOver));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DROP_COMPLETE, this._bindings.get(this._onDropComplete));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.CLICK, this._bindings.get(this._onClick));
    this._dragDropManager.subscribe(_SortableHTMLElement.Events.DOUBLE_CLICK, this._bindings.get(this._onDoubleClick));
    const events = [
      _SortableHTMLElement.Events.DROP_MOVE,
      _SortableHTMLElement.Events.DROP_OVER,
      _SortableHTMLElement.Events.DROP_CANCEL,
      _SortableHTMLElement.Events.DROP_COMPLETE
    ];
    this._dragDropManager.subscribe(events, this._bindings.get(this._onDragDropNotify));
    this.activate();
  }
  _onClick(notify, interaction) {
    interaction.current = interaction.target.closest(this._selectors.closest) || interaction.target;
    const event = new SortableEvent(_SortableHTMLElement.Events.CLICK, this);
    event.interaction = interaction;
    this.dispatchEvent(event);
  }
  _onDoubleClick(notify, interaction) {
    console.log("_onDoubleClick", interaction);
    interaction.current = interaction.target.closest(this._selectors.closest) || interaction.target;
    const event = new SortableEvent(_SortableHTMLElement.Events.DOUBLE_CLICK, this);
    event.interaction = interaction;
    this.dispatchEvent(event);
  }
  _onDragStart(notify, dragManager) {
    const proxy = this._proxy.render(dragManager.current);
    const event = new SortableEvent(_SortableHTMLElement.Events.DRAG_START, this, { proxy });
    this.dispatchEvent(event);
    if (event.defaultPrevented) return;
    if (proxy) {
      const left = dragManager.mouseX;
      const top = dragManager.mouseY;
      const clientRect = dragManager.current.getBoundingClientRect();
      proxy.style.left = `${left}px`;
      proxy.style.top = `${top}px`;
      proxy.style.width = `${clientRect.width}px`;
      proxy.style.height = `${clientRect.height}px`;
      proxy.style.position = "absolute";
      proxy.style.pointerEvents = "move";
      document.body.appendChild(proxy);
    }
  }
  _onDragMove(notify, dragManager) {
    const proxy = this._proxy.element;
    const event = new SortableEvent(_SortableHTMLElement.Events.DRAG_MOVE, this, { proxy });
    this.dispatchEvent(event);
    if (event.defaultPrevented) return;
    if (proxy) {
      const left = dragManager.mouseX;
      const top = dragManager.mouseY;
      proxy.style.left = `${left}px`;
      proxy.style.top = `${top}px`;
    }
  }
  _onDragEnd(notify, dragManager) {
    const proxy = this._proxy.element;
    const event = new SortableEvent(_SortableHTMLElement.Events.DRAG_END, this, { proxy });
    this.dispatchEvent(event);
    if (event.defaultPrevented) return;
    if (proxy) proxy?.remove();
    this._proxy.reset();
  }
  _onDropStart(notify, dragManager, dropManager) {
    const drag = dragManager.current;
    const drop = dropManager.current;
    const event = new SortableEvent(_SortableHTMLElement.Events.DROP_START, this, { drag, drop });
    this.dispatchEvent(event);
    return;
    if (drag === void 0) throw new Error(`droptarget is empty`);
    if (drop === void 0) throw new Error(`droptarget is empty`);
    if (drag == drop) return;
    console.log("exhange");
    this.dispatchEvent();
  }
  _onDropOver(notify, dropManager) {
    const elments = Array.from(this.querySelectorAll(this._selectors.closest));
    for (const element of elments) {
      element.style.border = "none";
      element.style.display = "inline-block";
    }
    dropManager.over.style.border = "1px solid #00f";
  }
  _onDropComplete(notify, dropManager) {
    const elments = Array.from(this.querySelectorAll(this._selectors.closest));
    for (const element of elments) {
      element.style.border = "none";
    }
  }
  _onDragDropNotify(notify, ...rest) {
    const event = new SortableEvent(String(notify), this);
    this.dispatchEvent(event);
  }
  _onDOMContentLoaded(event) {
    console.error("_onDOMContentLoaded");
    const handleSelector = this.getAttribute("handle");
    if (handleSelector) this.attributeChangedCallback("handle", void 0, handleSelector);
    const elementSelector = this.getAttribute("element");
    if (elementSelector) this.attributeChangedCallback("element", void 0, elementSelector);
    const proxyTemplate = this.getAttribute("proxy");
    if (proxyTemplate) this.attributeChangedCallback("proxy", void 0, proxyTemplate);
  }
  set selectors(options) {
    const { handle, closest } = options;
    if (handle !== void 0) this._selectors.handle = handle;
    if (closest !== void 0) this._selectors.closest = closest;
  }
  get selectors() {
    return { ...this._selectors };
  }
  set proxy(options) {
    const { params, renderer } = options;
    if (params !== void 0) this._proxy.params = params;
    if (renderer !== void 0) this._proxy.renderer = renderer;
  }
  get proxy() {
    return {
      params: this._proxy.params.slice(),
      renderer: this._proxy.renderer
    };
  }
  get dragDropManager() {
    return this._dragDropManager;
  }
  activate() {
    this._dragDropManager.activate();
  }
  deactivate() {
    this._dragDropManager.deactivate();
  }
  exchange(elementA, elementB) {
  }
  reset(...rest) {
    for (const element of Array.from(this.querySelectorAll(this._selectors.closest))) element.classList.remove(...rest);
  }
  /*
  *
  *   Web Component
  * 
  */
  connectedCallback() {
    if (document.readyState === "interactive" || document.readyState === "complete") {
      this._onDOMContentLoaded(new Event("DOMContentLoaded"));
    } else {
      document.addEventListener("DOMContentLoaded", this._onDOMContentLoaded.bind(this));
    }
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.warn("attributeChangedCallback", name, oldValue, newValue);
    switch (name.toLowerCase()) {
      case "handle":
        this._selectors.handle = newValue;
        break;
      case "element":
        this._selectors.closest = newValue;
        break;
      case "proxy":
        this._proxy.params = [newValue];
        this._proxy.renderer = void 0;
        break;
      case "active":
        break;
    }
  }
  /*
  *
  *   ISubscription
  * 
  */
  /* public hasSubscription(value: Notification): boolean {
  
          return this._subscription.hasSubscription(value);
  
      }
  
      public subscribe(notify: Notification, callback: Function): void;
      public subscribe(notify: Notification, callback: Function, once: number): void;
      public subscribe(notify: Notification, callback: Function, once?: number): void {
  
          this._subscription.subscribe(notify, callback, once);
  
      }
  
      public unsubscribe(callback: Function): void {
  
          this._subscription.unsubscribe(callback);
  
      }
  
      public notify(notify: Notification, ...rest: unknown[]): void {
  
          this._subscription.notify(notify, ...rest);
  
      }
  
      public async $notify(notify: Notification, ...rest: unknown[]): Promise<void> {
  
          return this._subscription.$notify(notify, ...rest);
  
      }
  
      public clear(): void {
  
          this._subscription.clear();
  
      }
  
      public $listen(notify: unknown, callback: Function, race: number): Promise<unknown> {
  
          return this._subscription.$listen(notify, callback, race);
  
      } */
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SortableConfig,
  SortableEvent,
  SortableHTMLElement
});
