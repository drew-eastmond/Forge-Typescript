

// @ts-nocheck

declare module "@onyx-ignition/forge-typescript" {

	
	/**
	 *
	 * Collect all arguments used for default for the application.
	 *
	 * @returns IForgeArguments
	 */
	export function FetchArguments(): IForgeArguments;
	
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
	
	
	
	
	
	export type Platform = "browser" | "node" | "neutral";
	export type Format = "iife" | "cjs" | "esm" | "tsc" | "forge-js" | "forge-ts";
	export type Bundle = "preserve" | "mangle" | "merge";
	export type Verbosity = "all" | "log" | "warn" | "error" | "silent";
	export type Write = "memory" | "file" | "stdout";
	export type ReadTranform = "gzip" | "brotli" | "zip" | "base64";
	export type WriteTransform = "obfuscate" | "minify" | "gzip" | "brotli" | "zip" | "base64";
	export type ForgeBuilderAliases = {
	    files: Record<string, string>;
	    directories: Record<string, string>;
	};
	export type ForgeBuilderOptions = Partial<{
	    bundled: Bundle;
	    platform: Platform;
	    format: Format;
	    metafile: boolean;
	    treeShaking: boolean;
	    aliases: ForgeBuilderAliases;
	    external: string[];
	    verbose: Verbosity;
	    ignores: string[];
	    transform: {
	        read?: ReadTranform[];
	        write?: WriteTransform[];
	    };
	    write: Write;
	}>;
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
	export function FilterFormat(value: unknown): Format;
	export function FilterPlatform(value: unknown): Platform;
	export function FilterBundled(value: unknown): Bundle;
	export class BuilderConfig {
	    static $From(options: {
	        args: IForgeArguments;
	    }): Promise<BuilderConfig>;
	    bundled: Bundle;
	    platform: Platform;
	    format: Format;
	    metafile: boolean;
	    external: string[];
	    verbose: Verbosity;
	    treeShaking: boolean;
	    ignores: string[];
	    aliases: ForgeBuilderAliases;
	    write: Write;
	    transform: {
	        read: ReadTranform[];
	        write: WriteTransform[];
	    };
	    constructor(options: ForgeBuilderOptions);
	    $validate(): $IResult<Error>;
	}
	export function $ParseExternals(externals: string[]): Promise<string[]>;
	export function CalcCodeSize(code: unknown): number;
	export function UncacheFile(file: string): void;
	export function $Strip({ code, root }: {
	    code: string;
	    root: string;
	}, builderOptions: ForgeBuilderOptions, callback?: (type: "import-default" | "import-components" | "import-file" | "export", properties: {
	    statement: string;
	    file?: string;
	    components?: string[];
	    export?: string;
	}, code: string) => string): Promise<IBuilderResult>;
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
	    root: string;
	    contents: string;
	    source?: string;
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
	
	
	
	
	export interface IForgeBuildPlugin {
	    atrributes: Attributes;
	    $start(iResult: IResult<Attributes>): Promise<void>;
	    $complete(iResult: IResult<Attributes>): Promise<void>;
	    $fetch(file: string, results: IResult<Attributes>): Promise<void>;
	    $resolve(file: string, results: any): Promise<void>;
	}
	export class ForgeBuildPlugin implements IForgeBuildPlugin {
	    atrributes: Attributes;
	    $start(iResult: IResult<Attributes>): Promise<void>;
	    $complete(iResult: IResult<Attributes>): Promise<void>;
	    $fetch(file: string, iResults: IResult<Attributes>): Promise<void>;
	    $resolve(file: string, results: any): Promise<void>;
	}
	
	
	
	
	
	class TypescriptFileTraversal {
	    private _root;
	    private _externals;
	    private _$fetch;
	    private readonly _imports;
	    readonly files: Map<string, TypescriptFile>;
	    /**
	     *
	     * @param root directory of of root of all Typescript file wintin the graph
	     * @param options
	     */
	    constructor(root: string, options: {
	        $fetch: (file: string) => Promise<string>;
	        externals: string[];
	    });
	    private _dependencies;
	    private hasDependency;
	    $add(file: string): Promise<boolean>;
	    /**
	     *
	     * Sort all files based on import sequencing
	     *
	     */
	    sort(): void;
	}
	export class TypescriptFile {
	    /**
	     *
	     * Universal callback to fetch file contents based on the path. Best used for caching but default to readoing from ta
	     *
	     * @param file
	     * @returns
	     */
	    static $Fetch(file: string): Promise<string>;
	    private _path;
	    private _code;
	    private _root;
	    private _$fetch;
	    private readonly _externals;
	    readonly imports: Map<string, Set<string>>;
	    readonly exports: Set<string>;
	    hash: string;
	    constructor({ entry, root }: {
	        entry: string;
	        root: string;
	    }, options?: {
	        $fetch?: (file: string) => Promise<string>;
	        externals?: string[];
	    });
	    /**
	     *
	     *
	     *
	     * @return { relative: string, resolved: string, dir: string }
	     */
	    get path(): {
	        relative: string;
	        resolved: string;
	        dir: string;
	    };
	    set code(value: string);
	    reset(): void;
	    $traverse(traversal?: TypescriptFileTraversal): Promise<Map<string, TypescriptFile>>;
	    $load(file: string): Promise<this>;
	    $strip(callback?: (type: string, script: this, file: string, values: string | Set<string>) => string): Promise<IBuilderResult>;
	    $bundle(builderOptions: ForgeBuilderOptions, iPlugins?: IForgeBuildPlugin): Promise<IBuilderResult>;
	    $library(): $IResult<Attributes>;
	}
	
	
	
	
	
	
	class ReorderManager {
	    private _root;
	    readonly topology: Topology<string>;
	    constructor(root: string, options?: {
	        $fetch: (file: string) => Promise<string>;
	    });
	    import(input: string): this;
	    $load(file: string, spaces: number): Promise<this>;
	    add(file: string, attributes: Attributes): this;
	    add(file: string, attributes: Attributes, parent: string): this;
	}
	export class ForgeBuilder extends Subscription {
	    private _builderOptions;
	    readonly cache: Map<string, {
	        contents: string | Uint8Array;
	        loader: string;
	    }>;
	    readonly iPlugins: IForgeBuildPlugin[];
	    readonly root: string;
	    readonly reorder: ReorderManager;
	    constructor(root: string, builderOptions: ForgeBuilderOptions);
	    constructor(root: string, builderOptions: ForgeBuilderOptions, iPlugins: IForgeBuildPlugin[]);
	    protected _$resolve(file: string): Promise<string>;
	    protected _$fetch(file: string): Promise<{
	        contents: string | Uint8Array;
	        loader: string;
	    }>;
	    protected _$fetchTypescript(file: string): Promise<string>;
	    private _reorderManifest;
	    $bundle(entry: string): Promise<IBuilderResult>;
	}
	
	
	
	
	
	export class TypescriptBuilder {
	    static $Library(root: string, options?: {
	        ignore: string[];
	    }): Promise<string>;
	    static StripImports(code: string): string;
	    private _entry;
	    private _root;
	    private readonly _$package;
	    private _$packages;
	    private _options;
	    private _iPlugins;
	    constructor(entry: string, options: ForgeBuilderOptions, iPlugins?: IForgeBuildPlugin[]);
	    $fetch(file: string): Promise<string>;
	    $bundle(): $IResult<Attributes>;
	    $library(): $IResult<Attributes>;
	}
	
	
	
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