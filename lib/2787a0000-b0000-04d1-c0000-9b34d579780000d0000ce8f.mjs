#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/dragdrop/DragDropManager.ts
import { DragManager } from "./2fe2e0000-f0000-074f-00000-9b34d579780000100008806.mjs";
import { DropManager } from "./b9a220000-30000-5b78-40000-9b34d579780000500000e33.mjs";
import { DefaultMouseAdapter, PointerOptions } from "./0e9da0000-b0000-d069-c0000-9b34d579780000d00004415.mjs";
import { Subscription } from "@onyx-ignition/forge";
var DragDropManager = class _DragDropManager extends Subscription {
  static DRAG_START = "DRAG_START";
  static DRAG_MOVE = "DRAG_MOVE";
  static DRAG_END = "DRAG_COMPLETE";
  static DROP_OVER = "DROP_OVER";
  static DROP_START = "DROP_START";
  static DROP_MOVE = "DROP_MOVE";
  static DROP_CANCEL = "DROP_CANCEL";
  static DROP_COMPLETE = "DROP_COMPLETE";
  _iMouseAdapter;
  _dragManager;
  _dropManager;
  constructor(container, options) {
    super();
    this._iMouseAdapter = new DefaultMouseAdapter(container);
    this._iMouseAdapter.subscribe(PointerOptions.CLICK, this._onClick.bind(this));
    this._iMouseAdapter.subscribe(PointerOptions.DoubleClick, this._onDoubleClick.bind(this));
    const selectors = options.selectors;
    this._dragManager = new DragManager(container, { selectors, inputAdapter: this._iMouseAdapter });
    this._dragManager.subscribe(DragManager.Events.DRAG_START, this._onDragStart.bind(this));
    this._dragManager.subscribe(DragManager.Events.DRAG_MOVE, this._onDragMove.bind(this));
    this._dragManager.subscribe(DragManager.Events.DRAG_COMPLETE, this._onDragComplete.bind(this));
    this._dragManager.subscribe(DragManager.Events.DRAG_CANCEL, this._onDragCancel.bind(this));
    this._dropManager = new DropManager(container, { selectors, inputAdapter: this._iMouseAdapter });
    this._dropManager.subscribe(DropManager.Events.DROP_START, this._onDropStart.bind(this));
    this._dropManager.subscribe(DropManager.Events.DROP_OVER, this._onDropOver.bind(this));
    this._dropManager.subscribe(DropManager.Events.DROP_MOVE, this._onDropMove.bind(this));
  }
  _onClick(notify, interaction) {
    this.notify(PointerOptions.CLICK, interaction);
  }
  _onDoubleClick(notify, interaction) {
    this.notify(PointerOptions.DoubleClick, interaction);
  }
  _onDragStart(notify, dragManager) {
    this.notify(_DragDropManager.DRAG_START, this._dragManager);
  }
  _onDragMove(notify, dragManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DRAG_MOVE, this._dragManager);
  }
  _onDragCancel(notify, dragManager) {
    console.warn("_onDragCancel", "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.notify(_DragDropManager.DRAG_END, this._dragManager);
  }
  _onDragComplete(notify, dragManager, pointerInteraction) {
    console.log("_onDragComplete", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    this.notify(_DragDropManager.DRAG_END, this._dragManager);
    this._dropManager.start(pointerInteraction);
  }
  _onDropStart(notify, dropManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DROP_START, this._dragManager, this._dropManager);
    const dragTarget = this._dragManager.current;
    const dropTarget = this._dropManager.current;
    if (dragTarget.isEqualNode(dropTarget)) this.notify(_DragDropManager.DROP_CANCEL, this._dragManager, this._dropManager);
    this.notify(_DragDropManager.DROP_COMPLETE, this._dragManager, this._dropManager);
  }
  _onDropMove(notify, dropManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DROP_MOVE, this._dropManager);
  }
  _onDropOver(notify, dropManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DROP_OVER, this._dropManager);
  }
  get dragManager() {
    return this._dragManager;
  }
  get dropManager() {
    return this._dropManager;
  }
  activate() {
    this._iMouseAdapter.activate();
    this._dragManager.activate();
    this._dropManager.activate();
  }
  deactivate() {
    this._iMouseAdapter.deactivate();
    this._dragManager.deactivate();
    this._dropManager.deactivate();
  }
};
export {
  DragDropManager
};
