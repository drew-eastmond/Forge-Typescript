

// @ts-nocheck

declare module "@onyx-ignition/forge-typescript" {

	
	export enum PointerOptions {
	    MOUSE_DOWN = "mouse-down",
	    MOUSE_HOLD = "mouse-hold",
	    HOLD_OVER = "hold-over",
	    MOUSE_MOVE = "mouse-move",
	    MOUSE_UP = "mouse-up",
	    CLICK = "mouse-click",
	    DoubleClick = "double-click",
	    DRAG_START = "drag-start",
	    DRAG_MOVE = "drag-move",
	    DRAG_COMPLETE = "drag-complete"
	}
	export class PointerInteraction {
	    initialX: number;
	    initialY: number;
	    mouseX: number;
	    mouseY: number;
	    offsetX: number;
	    offsetY: number;
	    target: HTMLElement;
	    current: HTMLElement;
	    event: unknown;
	    constructor(mouseX: number, mouseY: number, event: unknown);
	}
	export interface IMouseAdapter extends ISubscription {
	    activate(): void;
	    deactivate(): void;
	}
	export class DefaultMouseAdapter extends Subscription implements IMouseAdapter {
	    private _container;
	    private _abort;
	    private delay;
	    private radius;
	    private doubleClickDelay;
	    private _doubleClickTimeout;
	    private _isDragging;
	    private _mouseDownEvent;
	    private _holdTimeout;
	    initialX: number;
	    initialY: number;
	    offsetX: number;
	    offsetY: number;
	    mouseX: number;
	    mouseY: number;
	    private readonly _bindings;
	    constructor(element: HTMLElement);
	    private _pauseEvent;
	    private _basePointerInteraction;
	    private _onMouseDown;
	    private _onMouseHold;
	    private _onMouseMove;
	    private _onMouseOver;
	    private _onMouseOut;
	    private _onMouseUp;
	    get isDragging(): boolean;
	    activate(): void;
	    deactivate(): void;
	}
	
	
	
	export class FormlessEvent extends Event {
	    static readonly Render: string;
	    static readonly Parse: string;
	    static readonly Error: string;
	    static readonly Connect: string;
	    static readonly Select: string;
	    store: IForgeStore;
	    value: unknown;
	    element: HTMLElement;
	    error: unknown;
	    connect: {
	        root: HTMLElement;
	    };
	    interaction: PointerInteraction;
	    constructor(type: string);
	    constructor(type: string, options: {
	        store?: IForgeStore;
	        value?: unknown;
	        element?: HTMLElement;
	        error?: unknown;
	        connect?: {
	            root: HTMLElement;
	        };
	        interaction?: PointerInteraction;
	    });
	}
	export function ParseElement(element: HTMLElement): unknown;
	export function ParseElement(element: HTMLElement, options: {
	    where?: HTMLElement[];
	    ignore?: HTMLElement[];
	    parse?: (element: HTMLElement) => unknown;
	}): unknown;
	export function ParseInput(element: HTMLInputElement): unknown;
	export function RenderInput(element: HTMLElement, value: unknown): void;
	export function RenderElement(element: HTMLElement, attributes: Attributes): boolean;
	export function RenderElement(element: HTMLElement, attributes: Attributes, options: {
	    render?: (element: HTMLElement, values: Attributes) => boolean;
	}): boolean;
	export function IsConnected(element: HTMLElement, store: IForgeStore): boolean;
	export class FormlessElement extends HTMLElement {
	    static Register(name: string, constructorRef: CustomElementConstructor): void;
	    protected _$connect: $Promise<FormlessEvent>;
	    private _onDOMContentLoaded;
	    connectedCallback(): void;
	    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	}
	
	
	export class FormletHTMLElement extends FormlessElement {
	    static Register(): void;
	    static Register(name: string): void;
	    renderer: (element: HTMLElement, value: unknown) => void;
	    parser: (element: HTMLElement) => unknown;
	    constructor();
	    set value(value: unknown);
	    get value(): unknown;
	}
	
	
	
	
	
	
	export type SortableProps = {
	    selector?: {
	        handle: string;
	        element: string;
	    };
	    proxy?: {
	        params?: unknown[];
	        renderer?: ProxyRenderer;
	    };
	    radius?: number;
	    race?: number;
	    events?: {
	        drag?: {
	            start?: ((event: SortableEvent) => void)[];
	            move?: ((event: SortableEvent) => void)[];
	            end?: ((event: SortableEvent) => void)[];
	        };
	        drop: {
	            start?: ((event: SortableEvent) => void)[];
	            move?: ((event: SortableEvent) => void)[];
	            over?: ((event: SortableEvent) => void)[];
	            cancel?: ((event: SortableEvent) => void)[];
	            complete?: ((event: SortableEvent) => void)[];
	        };
	        click?: ((event: SortableEvent) => void)[];
	    };
	};
	export class SortableConfig {
	    selector: {
	        handle: string;
	        element: string;
	    };
	    proxy: {
	        params?: unknown[];
	        renderer?: ProxyRenderer;
	    };
	    radius: number;
	    race: number;
	    events: {
	        drag: {
	            start?: ((event: SortableEvent) => void)[];
	            move?: ((event: SortableEvent) => void)[];
	            end?: ((event: SortableEvent) => void)[];
	        };
	        drop: {
	            start: ((event: SortableEvent) => void)[];
	            move: ((event: SortableEvent) => void)[];
	            over: ((event: SortableEvent) => void)[];
	            cancel: ((event: SortableEvent) => void)[];
	            complete: ((event: SortableEvent) => void)[];
	        };
	        click?: ((event: SortableEvent) => void)[];
	    };
	    constructor(props?: SortableProps);
	    configure(element: SortableHTMLElement, options: {
	        abort: any;
	    }): AbortController;
	}
	export type ProxyRenderer = (source: HTMLElement, ...params: unknown[]) => HTMLElement;
	export class SortableEvent extends Event {
	    readonly sortable: SortableHTMLElement;
	    readonly attributes: Attributes;
	    interaction: PointerInteraction;
	    constructor(type: string, sortable: SortableHTMLElement);
	    constructor(type: string, sortable: SortableHTMLElement, attribute: Attributes);
	    private _getElementData;
	    getDragData(): {
	        dragManager: DragManager;
	        source: HTMLElement;
	        index: number;
	    };
	    getDropData(): {
	        dropManager: DropManager;
	        target: HTMLElement;
	        index: number;
	    };
	}
	export class SortableHTMLElement extends HTMLElement {
	    static readonly Events: {
	        DRAG_START: any;
	        DRAG_MOVE: any;
	        DRAG_END: any;
	        DROP_START: any;
	        DROP_MOVE: any;
	        DROP_OVER: any;
	        DROP_CANCEL: any;
	        DROP_COMPLETE: any;
	        CLICK: PointerOptions;
	        DOUBLE_CLICK: PointerOptions;
	    };
	    static Register(): void;
	    static Register(name: string): void;
	    private _dragDropManager;
	    private _proxy;
	    private _selectors;
	    private readonly _bindings;
	    constructor();
	    private _onClick;
	    private _onDoubleClick;
	    private _onDragStart;
	    private _onDragMove;
	    private _onDragEnd;
	    private _onDropStart;
	    private _onDropOver;
	    private _onDropComplete;
	    private _onDragDropNotify;
	    protected _onDOMContentLoaded(event: Event): void;
	    set selectors(options: {
	        handle?: string;
	        closest?: string;
	    });
	    get selectors(): {
	        handle: string;
	        closest: string;
	    };
	    set proxy(options: {
	        params?: (string | HTMLElement | unknown)[];
	        renderer?: ProxyRenderer;
	    });
	    get proxy(): {
	        params: (string | HTMLElement | unknown)[];
	        renderer: ProxyRenderer;
	    };
	    get dragDropManager(): DragDropManager;
	    activate(): void;
	    deactivate(): void;
	    exchange(elementA: HTMLElement, elementB: HTMLElement): void;
	    reset(...rest: string[]): void;
	    connectedCallback(): void;
	    disconnectedCallback(): void;
	    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
	}
	
	
	
	
	module "react" {
	    namespace JSX {
	        interface IntrinsicElements {
	            "forge-tree": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	        }
	    }
	}
	export function TreeRenderer(element: HTMLElement, value: ITreeNode<TreeHandle>): HTMLElement;
	export class TreeHandle {
	    key: string;
	    element: HTMLElement;
	    constructor(init: {
	        key: string;
	        node?: ITreeNode;
	        element?: HTMLElement;
	    });
	    toString(): string;
	}
	export type FileNode = ITreeNode<TreeHandle>;
	export class TreeState {
	    readonly root: ITreeNode<TreeHandle>;
	    constructor(element: HTMLElement, key: string);
	    [Symbol.iterator](): IterableIterator<TreeHandle>;
	    private _fetchNode;
	    append(url: string): ITreeNode<TreeHandle>;
	    append(url: string, attributes: Attributes): ITreeNode<TreeHandle>;
	    path(node: ITreeNode<TreeHandle>): string;
	    path(node: ITreeNode<TreeHandle>, join: string): string;
	    search(key: string | HTMLElement): ITreeNode<TreeHandle>;
	    toString(): string;
	}
	export class TreeHTMLElement extends FormlessElement {
	    static readonly Events: Readonly<{
	        Select: "select";
	        Confirm: "confirm";
	    }>;
	    static Register(): void;
	    static Register(name: string): void;
	    private _connected;
	    private readonly _state;
	    readonly sortable: SortableHTMLElement;
	    renderer: (element: HTMLElement, value: ITreeNode<TreeHandle>) => HTMLElement;
	    private _elements;
	    constructor();
	    private _onSortableClick;
	    private _onSortableDoubleClick;
	    get state(): TreeState;
	    connect(event: FormlessEvent): void;
	    render(node: ITreeNode<TreeHandle>): void;
	    sort(node: ITreeNode): void;
	}
	
	
	export class FileBrowserInputHTMLElement extends FormletHTMLElement {
	    static Register(): void;
	    static Register(name: string): void;
	    private _connected;
	    private _tree;
	    private _input;
	    dialog: HTMLDialogElement;
	    constructor();
	    private _onBrowseClick;
	    connect(event: string): void;
	    set value(value: unknown);
	    get value(): unknown;
	}
	
	
	
	
	export class ListHandle {
	    private _value;
	    private _container;
	    constructor(value: unknown);
	    set container(container: HTMLElement);
	    get container(): HTMLElement;
	    set value(value: unknown);
	    get value(): unknown;
	    reset(): void;
	}
	export class ListState extends Subscription {
	    static readonly Events: {
	        readonly Add: "add";
	        readonly After: "after";
	        readonly Before: "before";
	        readonly Insert: "insert";
	        readonly Move: "move";
	        readonly Remove: "remove";
	        readonly Clear: "clear";
	    };
	    container: HTMLElement;
	    replicant: HTMLElement;
	    private _elements;
	    private _handles;
	    private _$locks;
	    [Symbol.iterator](): IterableIterator<ListHandle>;
	    private _connect;
	    lock(): [string, Promise<this>];
	    $unlock(handle: string): Promise<this>;
	    load(values: unknown[]): ListHandle[];
	    get value(): unknown;
	    indexOf(element: HTMLElement): number;
	    handle(element: HTMLElement): ListHandle;
	    add(value: unknown): ListHandle;
	    remove(handle: ListHandle): boolean;
	    before(value: unknown, before: ListHandle): ListHandle;
	    after(value: unknown, after: ListHandle): ListHandle;
	    insert(value: unknown, index: number): ListHandle;
	    move(handle: ListHandle, index: number): void;
	    swap(handleA: ListHandle, handleB: ListHandle): void;
	    clear(): ListHandle[];
	    refresh(): void;
	}
	export class FormletListHTMLElement extends FormletHTMLElement {
	    static Register(): void;
	    static Register(name: string): void;
	    private _root;
	    private _abort;
	    private readonly _state;
	    private readonly _sortable;
	    private readonly _bindings;
	    constructor();
	    private _onDropStart;
	    private _onChange;
	    connect(): {
	        root: HTMLElement;
	        element: FormletListHTMLElement;
	        entries: SortableHTMLElement;
	    };
	    connectedCallback(): void;
	    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	    get sortable(): SortableHTMLElement;
	    get state(): ListState;
	    set replicant(element: HTMLElement);
	    set value(value: unknown[]);
	    get value(): unknown;
	}
	
	
	export class FormlessManager extends Subscription {
	    static readonly Events: {
	        Change: string;
	        StoreFault: string;
	    };
	    static Race: number;
	    protected _abortController: AbortController;
	    protected _$ready: $Promise<this>;
	    protected _root: HTMLElement;
	    protected readonly _stores: Set<IForgeStore>;
	    protected readonly _connections: Map<IForgeStore, HTMLElement>;
	    readonly ignore: Set<HTMLElement>;
	    protected readonly _bindings: Map<Function, Function>;
	    [Reactivity]: IReactor<Map<IForgeStore, Attributes>>;
	    constructor(root: HTMLElement);
	    protected _onChange(event: Event): Promise<void>;
	    protected _$connectStore(store: IForgeStore): boolean;
	    set root(root: HTMLElement);
	    $connect(values: Iterable<IForgeStore>): Promise<void>;
	    get stores(): IForgeStore[];
	    get $ready(): Promise<this>;
	    $parse(stores: IForgeStore[]): Promise<Map<IForgeStore, unknown>>;
	    $parse(stores: IForgeStore[], options: {
	        where?: HTMLElement[];
	        ignore?: HTMLElement[];
	        $parse?: (element: HTMLElement) => Promise<unknown>;
	    }): Promise<Map<IForgeStore, unknown>>;
	    $render(stores: IForgeStore[]): Promise<void>;
	    $render(stores: IForgeStore[], options: {
	        render?: (element: HTMLElement, value: unknown) => boolean;
	    }): Promise<void>;
	}
	
	
	
	export class FormlessHTMLElement extends HTMLElement {
	    static Events: {
	        Validate: string;
	        Change: string;
	        StoreFault: string;
	    };
	    static Register(): void;
	    static Register(name: string): void;
	    protected readonly _bindings: Map<Function, Function>;
	    protected readonly _manager: FormlessManager;
	    protected _$onParse: (element: HTMLElement) => unknown;
	    constructor();
	    private _onElementChange;
	    private _loadTheme;
	    $connect(values: Iterable<IForgeStore>): Promise<void>;
	    get stores(): IForgeStore[];
	    connectedCallback(): void;
	    disconnectedCallback(): void;
	    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
	    clear(): void;
	}
	
	
	export class ClientModelProxy extends AbstractForgeModelProxy {
	    static Mime: string;
	    private _url;
	    private _refresh;
	    private _headers;
	    private _access;
	    private readonly _stores;
	    private readonly _hashes;
	    private readonly _flushes;
	    constructor(model: IForgeModel, url: string, refresh: Record<string, string>);
	    _$refresh(stores: IForgeStore[]): Promise<IForgeStore[]>;
	    $branch(parentStore: IForgeStore, childStore: IForgeStore): Promise<void>;
	    $mutate(store: IForgeStore, mutatedStore: IForgeStore): Promise<void>;
	    $frame(): Promise<void>;
	    $flush(): Promise<void>;
	}
	

}