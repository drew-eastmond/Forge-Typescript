

// @ts-nocheck

declare module "@onyx-ignition/forge-typescript" {

	
	/**
	 *
	 * Collect all arguments used for default for the application.
	 *
	 * @returns IForgeArguments
	 */
	export function FetchArguments(): IForgeArguments;
	
	
	export type BuilderSource = {
	    files?: string[];
	    code?: Record<string, string>;
	    root?: string;
	};
	export type BuildLibraryParameters = {
	    source: {
	        root: string;
	        files: string[];
	    };
	    build: ForgeBuilderOptions;
	    target?: {
	        offset?: string;
	        target: string;
	        compress?: boolean;
	    };
	};
	export type BuildParameters = {
	    entry: string;
	    build: ForgeBuilderOptions;
	};
	export type TypesParameters = {
	    entry: BuilderSource;
	    build: ForgeBuilderOptions;
	    name: string;
	    options?: {};
	};
	export type GenericBuilderResult = {
	    code?: unknown;
	    path?: string;
	    error?: unknown;
	    elapsed?: number;
	    size?: number;
	};
	export type IBuilderResult = IResult<GenericBuilderResult>;
	export function BuildLibrary(socket: IForgeSocket, parameters: BuildLibraryParameters): Promise<IBuilderResult>;
	export function ParseResult([serialize, error]: [Serialize, unknown]): IBuilderResult;
	export function $BuildBundle(socket: IForgeSocket, parameters: BuildParameters): Promise<IBuilderResult>;
	export function $ResetBuilder(socket: IForgeSocket): Promise<boolean>;
	export function $ClientBuildTypes(socket: IForgeSocket, parameters: TypesParameters): Promise<IBuilderResult>;
	export function $ReadResolveFile(file: string): Promise<{
	    files: Record<string, string>;
	    directories: Record<string, string>;
	}>;
	export function $WalkSources(source: string, walk: boolean): Promise<string[]>;
	export function $OutputCompiledCode(code: string | ArrayBuffer): Promise<void>;
	export function $OutputCompiledCode(code: string | ArrayBuffer, outFile: string): Promise<void>;
	
	class FileCacheInternal {
	    private readonly _cache;
	    private readonly _decoder;
	    Has(url: string): boolean;
	    $FetchString(url: string): Promise<string>;
	    $Fetch(url: string): Promise<ArrayBuffer>;
	    Cache(url: string, data: ArrayBuffer): boolean;
	    Uncache(url: string): boolean;
	    Clear(): void;
	}
	export const FileCache: FileCacheInternal;
	
	
	
	export type LibrarySources = {
	    root: string;
	    files: string[];
	};
	export class LibraryBuilder {
	    private readonly _exportedComponents;
	    private _sanitizeSources;
	    private _$extractImportations;
	    $merge(sources: LibrarySources, alias: ForgeBuilderAliases, basic?: boolean): Promise<string>;
	    $bundle(sources: LibrarySources, buildOptions: ForgeBuilderOptions): Promise<string>;
	    $export(sources: LibrarySources, buildOptions: ForgeBuilderOptions, libraryExport: {
	        join: string;
	        ext: string;
	    }): Promise<IResult<Attributes>>;
	}
	
	
	
	
	export class BuildSocketParams {
	    source: {
	        root: string;
	        files?: string[];
	        walk?: string;
	    };
	    build: ForgeBuilderOptions;
	    resolves: Record<string, string>;
	    constructor(options: {
	        source: {
	            root: string;
	            files?: string[];
	            walk?: string;
	        };
	        build: ForgeBuilderOptions;
	        resolves?: Record<string, string>;
	    });
	}
	export function CalcCodeSize(code: unknown): number;
	export function UncacheFile(file: string): void;
	export function $Strip(entryFile: string, buildOptions: ForgeBuilderOptions, callback?: (type: "import-default" | "import-components" | "import-file" | "export", properties: {
	    statement: string;
	    file?: string;
	    components?: string[];
	    export?: string;
	}, code: string) => string): Promise<string>;
	export function $Transform({ root, contents, source }: {
	    root: string;
	    contents: string;
	    source?: string;
	}, buildOptions: ForgeBuilderOptions, options?: {
	    plugins?: Plugin[];
	    cache?: boolean;
	}): $IResult<Attributes>;
	export function $Build(entryFile: string, buildOptions: ForgeBuilderOptions, options?: {
	    plugins?: Plugin[];
	    cache?: boolean;
	}): Promise<IBuilderResult>;
	export function $Obfuscate(code: string): Promise<string>;
	export function $ApplyWriteTransforms(code: string, options: ForgeBuilderOptions): Promise<string>;
	export function $UnWrapWriteTransforms(code: string, options: ForgeBuilderOptions): Promise<string>;
	export function $Clean(): Promise<void>;
	
	
	
	export function $BuildTypes(entry: BuilderSource, packageName: string, buildOptions: ForgeBuilderOptions): Promise<IResult<Attributes>>;
	export function ParseTypeErrors(output: string, result: IResult<Attributes>): IResult<Attributes>;
	
	
	export class BuildClient extends ForgeClient {
	    private _contexts;
	    $watch(data: Serialize, session: SignalSession): Promise<Serialize>;
	    $reset(data: Serialize, session: SignalSession): Promise<Serialize>;
	    $execute(signal: string, data: Serialize, session: SignalSession): Promise<Serialize>;
	    $route(request: ForgeRequest, response: ForgeResponse): Promise<unknown | void>;
	    $startContext(data: Serialize, session: SignalSession): Promise<Serialize>;
	    $stopContext(data: Serialize, session: SignalSession): Promise<Serialize>;
	    $bundle(data: Serialize, session: SignalSession): Promise<Serialize>;
	    $library(data: Serialize, session: SignalSession): Promise<Serialize>;
	    $listen(): Promise<ForgeWebSocketServer>;
	    $listen(port: number): Promise<ForgeWebSocketServer>;
	    $listen(port: number, key: string): Promise<ForgeWebSocketServer>;
	    $types(data: Serialize, session: SignalSession): Promise<Serialize>;
	}
	
	
	
	export function $BuildNPM(builderOptions: ForgeBuilderOptions, bin: {
	    entry: string;
	}, library: {
	    root: string;
	    files: string[];
	    join: string;
	    name: string;
	    ext: {
	        cjs: string;
	        esm: string;
	    };
	}): Promise<IBuilderResult>;
	
	
	
	
	
	export class DropManager extends Subscription {
	    static readonly Events: {
	        DROP_START: string;
	        DROP_OVER: string;
	        DROP_MOVE: string;
	    };
	    private _container;
	    private _inputAdapter;
	    private _closestSelector;
	    protected _bindings: Map<Function, Function>;
	    target: HTMLElement;
	    current: HTMLElement;
	    over: HTMLElement;
	    out: HTMLElement;
	    offsetX: number;
	    offsetY: number;
	    mouseX: number;
	    mouseY: number;
	    localX: number;
	    localY: number;
	    constructor(container: HTMLElement, options: {
	        selectors: {
	            closest: string;
	        };
	        inputAdapter?: IMouseAdapter;
	    });
	    private _onDropStart;
	    private _onDropOver;
	    private _onDropMove;
	    activate(): void;
	    deactivate(): void;
	    start(pointerInteraction: PointerInteraction): void;
	}
	
	
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
	
	
	
	
	export class DragDropManager extends Subscription {
	    static readonly DRAG_START: string;
	    static readonly DRAG_MOVE: string;
	    static readonly DRAG_END: string;
	    static readonly DROP_OVER: string;
	    static readonly DROP_START: string;
	    static readonly DROP_MOVE: string;
	    static readonly DROP_CANCEL: string;
	    static readonly DROP_COMPLETE: string;
	    private _iMouseAdapter;
	    private _dragManager;
	    private _dropManager;
	    constructor(container: HTMLElement, options: {
	        selectors: {
	            closest: string;
	            handle: string;
	        };
	    });
	    private _onClick;
	    private _onDoubleClick;
	    private _onDragStart;
	    private _onDragMove;
	    private _onDragCancel;
	    private _onDragComplete;
	    private _onDropStart;
	    private _onDropMove;
	    private _onDropOver;
	    get dragManager(): DragManager;
	    get dropManager(): DropManager;
	    activate(): void;
	    deactivate(): void;
	}
	
	
	
	export class DragManager extends Subscription {
	    static readonly Events: {
	        DRAG_START: string;
	        DRAG_OVER: string;
	        DRAG_MOVE: string;
	        DRAG_COMPLETE: string;
	        DRAG_CANCEL: string;
	    };
	    private _container;
	    private _inputAdapter;
	    protected _bindings: Map<Function, Function>;
	    private _isDragging;
	    offsetX: number;
	    offsetY: number;
	    mouseX: number;
	    mouseY: number;
	    handleSelector: string;
	    closestSelector: string;
	    target: HTMLElement;
	    current: HTMLElement;
	    over: HTMLElement;
	    out: HTMLElement;
	    events: Map<string, MouseEvent>;
	    constructor(container: HTMLElement, options: {
	        selectors: {
	            handle: string;
	            closest: string;
	        };
	        inputAdapter?: IMouseAdapter;
	    });
	    private _onDragStart;
	    private _onDragMove;
	    private _onDragOver;
	    private _onDragComplete;
	    get isDragging(): boolean;
	    activate(): void;
	    deactivate(): void;
	    cancel(): void;
	}
	
	
	
	
	export function TraverseElements(node: ReactNode): ReactElement[];
	export function SanitizeProps(props: Record<string, unknown>): Record<string, unknown>;
	
	
	export interface ISelector {
	    onlyDecendents: boolean;
	    readonly selectors: Set<ISelector>;
	    set roots(elements: ReactElement[]);
	    has(element: ReactNode): boolean;
	    traverse(node: ReactNode): ReactNode[];
	}
	export class ReactSelector implements ISelector {
	    onlyDecendents: boolean;
	    readonly selectors: Set<ISelector>;
	    set roots(elements: ReactElement[]);
	    has(node: ReactNode): boolean;
	    traverse(node: ReactNode): ReactNode[];
	}
	
	
	
	export class ElementSelector extends ReactSelector {
	    type: string;
	    constructor(type: string);
	    has(node: ReactNode): boolean;
	}
	
	
	
	export class PsuedoSelector extends ReactSelector {
	    private _reactQuery;
	    private _driver;
	    private _roots;
	    constructor(selector: string);
	    set roots(values: ReactElement[]);
	    has(node: ReactNode): boolean;
	}
	
	
	
	export class AttributeSelector extends ReactSelector {
	    private static MatchAttribute;
	    private static MatchEqual;
	    private static MatchContains;
	    private static MatchSuffix;
	    private _key;
	    private _value;
	    private _matcher;
	    constructor(query: string);
	    has(node: ReactNode): boolean;
	}
	
	
	
	export class ClassSelector extends ReactSelector {
	    private _query;
	    constructor(query: string);
	    has(node: ReactNode): boolean;
	}
	
	
	
	export type TraversalState = {
	    ancestry: ReactElement[];
	    children: ReactNode[];
	};
	export class ReactQuery {
	    static CompareElements(elementA: ReactElement, elementB: ReactElement): boolean;
	    static Traverse(selector: string, ...parents: ReactNode[]): ReactNode[];
	    static Transform(node: ReactNode, callback: (node: ReactNode, traversal: TraversalState) => ReactNode, traversal?: TraversalState): ReactNode;
	    static Render(node: ReactNode): ReactNode;
	    static Render(node: ReactNode, props: Attributes): ReactNode;
	    static Render(node: ReactNode, delegate: (props: Attributes) => Attributes): ReactNode;
	    private readonly _sequences;
	    constructor(query: string);
	    set roots(values: ReactNode[]);
	    has(...parents: ReactNode[]): boolean;
	    traverse(...parents: ReactNode[]): ReactNode[];
	    select(...parents: ReactNode[]): ReactNode;
	}
	export function BuildSelectorParser(content: string, roots: ReactNode[]): void;
	
	
	

}