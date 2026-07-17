

// @ts-nocheck

declare module "@onyx-ignition/forge-typescript" {

	
	
	export type BuilderSource = {
	    files?: string[];
	    code?: Record<string, string>;
	    root?: string;
	};
	export type EnvParams = {
	    VERBOSITY?: Verbosity;
	    DRY_RUN?: boolean;
	};
	export type BuilderComponent = Partial<{
	    code: string | ArrayBuffer;
	    path: string;
	    error: unknown;
	    elapsed: number;
	    size: number;
	    manifest: string[];
	    mapping: unknown;
	}>;
	export type IBuilderResult = IResult<BuilderComponent>;
	export function GetEnviromentParams(): EnvParams;
	export function $WalkSources(source: string): Promise<string[]>;
	export function $OutputCompiledCode(response: ForgeResponse, out: string): Promise<void>;
	
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
	
	
	
	
	
	export type BuilderStats = {
	    elapsed?: number;
	    size?: number;
	};
	export type BuildEntry = {
	    entry?: string;
	    contents?: string;
	    root: string;
	};
	export type Platform = "browser" | "node" | "neutral";
	export type Format = "iife" | "cjs" | "esm" | "tsc" | "forge-js" | "forge-ts";
	export enum Bundle {
	    preserve = "preserve",
	    mangle_static = "mangle_static",
	    mangle_random = "mangle_random",
	    merge = "merge"
	}
	export enum Verbosity {
	    all = "all",
	    log = "log",
	    warn = "warn",
	    error = "error",
	    silent = "silent"
	}
	export enum Write {
	    Archive = "archive",
	    Preserve = "perserve"
	}
	export type ReadTranform = "gzip" | "brotli" | "zip" | "base64";
	export type WriteTransform = "obfuscate" | "obfuscate-seperate-map" | "obfuscate-inline-map" | "minify" | "gzip" | "brotli" | "zip" | "base64";
	export type ForgeBuilderAliases = {
	    files: Record<string, string>;
	    directories: Record<string, string>;
	};
	export type ForgeBuilderOptions = {
	    bundled: Bundle;
	    platform: Platform;
	    format: Format;
	    metafile: boolean;
	    treeShaking: boolean;
	    aliases: ForgeBuilderAliases;
	    externals: string[];
	    verbose: Verbosity;
	    ignores: string[];
	    transform: {
	        read?: ReadTranform[];
	        write?: WriteTransform[];
	    };
	    write: Write;
	};
	export function VerifyPackages(packages: IArgumentPackage[], sequences: Record<string, QuerySequence>): void;
	export function $SanitizeGlob(target: unknown): Promise<string[]>;
	export function FilterFormat(value: unknown): Format;
	export function FilterPlatform(value: unknown): Platform;
	export function FilterBundled(value: unknown): Bundle;
	export function FormatElapsedTime(elapsed: number): string;
	export function RenderVerifyAccessor(accessor: string[]): string;
	export function $VerifyFile(files: Attributes, options?: {
	    errors?: string[];
	    warnings?: string[];
	}): Promise<{
	    errors: string[];
	    warnings: string[];
	}>;
	export function $VerifyDirectoryExists(directories: Attributes, options?: {
	    errors?: string[];
	    warnings?: string[];
	}): Promise<{
	    errors: string[];
	    warnings: string[];
	}>;
	export class BuilderConfig extends Object {
	    static $From(packages: IArgumentPackage[]): Promise<BuilderConfig>;
	    bundled: Bundle;
	    platform: Platform;
	    format: Format;
	    metafile: boolean;
	    externals: string[];
	    verbose: Verbosity;
	    treeShaking: boolean;
	    ignores: string[];
	    aliases: ForgeBuilderAliases;
	    write: Write;
	    transform: {
	        read: ReadTranform[];
	        write: WriteTransform[];
	    };
	    constructor();
	    constructor(options: Partial<ForgeBuilderOptions>);
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
	export function $Transform({ root, contents, entry }: BuildEntry, buildOptions: ForgeBuilderOptions, options?: {
	    plugins?: Plugin[];
	    cache?: boolean;
	}): Promise<IBuilderResult>;
	export function $Bundle({ entry, out }: {
	    entry: string;
	    out: string;
	}, buildOptions: ForgeBuilderOptions, options?: {
	    plugins?: Plugin[];
	    cache?: boolean;
	}): Promise<IBuilderResult>;
	export function $Obfuscate(code: string): Promise<{
	    code: string;
	    mapping?: string;
	}>;
	export function $Obfuscate(code: string, options: {
	    mapping: "seperate" | "inline";
	}): Promise<{
	    code: string;
	    mapping?: string;
	}>;
	export function $ApplyWriteTransforms(code: string, options: {
	    transform: {
	        write?: WriteTransform[];
	    };
	    platform?: Platform;
	}): Promise<{
	    code: string;
	    mapping?: string;
	}>;
	export function $UnWrapWriteTransforms(code: string, options: {
	    transform: {
	        write: WriteTransform[];
	    };
	    platform: Platform;
	}): Promise<string>;
	export function ProcessBuilderResult(result: IResult<Attributes>, messaging?: {
	    header?: string;
	    footer?: string;
	}): void;
	
	
	/**
	 *
	 * Collect all arguments used for default for the application.
	 *
	 * @returns IForgeArguments
	 */
	export function $FetchArguments(): Promise<IArgumentPackage>;
	
	
	
	export class BuilderPackageSanitize extends AsyncArgumentPackageSanitize {
	    constructor(options?: AsyncPackageSanitizeOptions);
	    $sanitize(component: ArgumentPackageComponent | ForgeBuilderOptions, attributes: Attributes): Promise<Attributes>;
	}
	
	
	export class BuilderPackageValidate extends AsyncArgumentPackageValidate {
	    $flush(query: IQuery<ArgumentPackageComponent>, validations: ArgumentValidations): Promise<void>;
	}
	
	
	export class BuilderPackage extends ArgumentPackage {
	    /**
	     * Return an instance that has been merged from a { builder } mount, then validated and sanitized
	     * @param packages
	     * @returns {BuilderPackage}
	     */
	    static $From(packages: IArgumentPackage[]): Promise<BuilderPackage | IArgumentPackage>;
	    $validate(): Promise<this>;
	    $validate(validator: IAsyncPackageValidator): Promise<this>;
	    $sanitize(): Promise<IArgumentPackage>;
	    $sanitize(sanitizer: IAsyncPackageSanitizer): Promise<IArgumentPackage>;
	}
	
	
	
	export type LibrarySources = {
	    root: string;
	    files: string[];
	};
	export type LibraryParams = {
	    files: string[];
	    root: string;
	    out: string;
	    sources: LibrarySources;
	    lib: string;
	    ext: string;
	    index: string;
	};
	export class LibraryBuilder {
	    private readonly _exportedComponents;
	    private _sanitizeSources;
	    private _$extractImportations;
	    $merge(packages: IArgumentPackage[]): Promise<string>;
	    $bundle(packages: IArgumentPackage[]): Promise<IBuilderResult>;
	    $export(packages: IArgumentPackage[]): Promise<IBuilderResult>;
	}
	
	
	export class LibraryPackageSanitize extends AsyncArgumentPackageSanitize {
	    constructor();
	    $sanitize(component: ArgumentPackageComponent, attributes: Attributes): Promise<Attributes>;
	    validate(packaging: IArgumentPackage): void;
	    authorize(packaging: IArgumentPackage): boolean;
	}
	
	
	export class LibraryPackageValidate extends AsyncArgumentPackageValidate {
	    $flush(query: IQuery<ArgumentPackageComponent>, validations: ArgumentValidations): Promise<void>;
	}
	
	
	
	export type TypesParams = {
	    sources: {
	        files: string[];
	    };
	    name: string;
	    out: string;
	};
	export function $BuildTypes(packages: IArgumentPackage[]): Promise<IBuilderResult>;
	export function ParseTypeErrors(output: string, result: IResult<Attributes>): IResult<Attributes>;
	
	
	
	
	export type NPMParams = {
	    sources: {
	        files: string[];
	        root: string;
	    };
	    bin: BuildEntry;
	    name: string;
	    lib: string;
	    ext: {
	        cjs?: string;
	        esm?: string;
	    };
	    includes: string[];
	    manifest: boolean;
	    package_json: boolean;
	};
	export function $BuildNPM(packages: IArgumentPackage[]): Promise<IBuilderResult>;
	
	
	export class TypesPackageSanitize extends AsyncArgumentPackageSanitize {
	    $sanitize(component: ArgumentPackageComponent, attributes: Attributes): Promise<Attributes>;
	    validate(packaging: IArgumentPackage): void;
	    authorize(packaging: IArgumentPackage): boolean;
	}
	
	
	export class PackageSanitizeNPM extends AsyncArgumentPackageSanitize {
	    constructor();
	    $sanitize(component: ArgumentPackageComponent, attributes: Attributes): Promise<Attributes>;
	    validate(packaging: IArgumentPackage): void;
	    authorize(packaging: IArgumentPackage): boolean;
	}
	
	
	export class TypesPackageValidate extends AsyncArgumentPackageValidate {
	    $flush(query: IQuery<ArgumentPackageComponent>, validations: ArgumentValidations): Promise<void>;
	}
	
	
	export class NPMPackageValidate extends AsyncArgumentPackageValidate {
	    constructor();
	    constructor(options: AsyncPackageValidateOptions);
	    $flush(query: IQuery<ArgumentPackageComponent>, validations: ArgumentValidations): Promise<void>;
	}
	
	
	
	
	export class BuilderHost extends ForgeHost {
	    static Protocol: string;
	    static EncodeRequestData(request: ForgeRequest, data: Serialize, attributes: Attributes): void;
	    write: Write;
	    private _contexts;
	    protected _$serializeResult(results: IBuilderResult, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    protected _$verifyPackages(request: ForgeRequest, response: ForgeResponse): Promise<IArgumentPackage>;
	    $watch(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    $execute(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    $route(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    $bundle(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    $library(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    $types(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	    $npm(signal: Signal, request: ForgeRequest, response: ForgeResponse): Promise<void>;
	}
	
	
	
	
	export class BundlePackageSanitize extends AsyncArgumentPackageSanitize {
	}
	
	
	export class BundlePackageValidate extends AsyncArgumentPackageValidate {
	    $flush(query: IQuery<ArgumentPackageComponent>, validations: ArgumentValidations): Promise<void>;
	}
	
	
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