#! /usr/bin/env node
require("index");


// ../Forge-Typescript-Source/src/Forge-Typescript-Source/src/ts/bin.ts
var import_forge9 = require("@onyx-ignition/forge");

// ../Forge-Typescript-Source/src/ts/Build-Utils.ts
var import_forge = require("@onyx-ignition/forge");
function FetchArguments() {
  const cliArguments = new import_forge.CLIArguments();
  cliArguments.import([
    ["drew", { so: "much crap" }],
    ["alias", [["files", []], ["directories", {}]]]
  ]);
  cliArguments.add(/^in$/, {
    required: true,
    validate: (value, args) => {
      return args.some(([name, value2]) => /in/i.test(name));
    },
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--in--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add("out", {
    // required: true,
    /* validate: (value: unknown, args: [string, unknown][]): boolean => {
    
                    return Object.hasOwn(args, "out");
    
                }, */
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--out--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add(/^format$/i, {
    default: "cjs",
    validate: (value, args) => {
      switch (value) {
        case "cjs":
        case "esm":
        case "iife":
          return true;
      }
      return false;
    },
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--format--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add("bundled", {
    default: true
  }).add("platform", {
    default: "neutral",
    validate: (value, args) => {
      switch (value) {
        case "node":
        case "neutral":
        case "browser":
          return true;
      }
      return false;
    }
  }).add("meta", {
    default: true
  }).add("watch", {
    default: false
  }).add("external", {
    default: [],
    sanitize: (value, args) => {
      if (value === void 0) return [];
      if (value instanceof Array) return value;
      return String(value).split(/,/g);
    }
  }).add(/verbose/i, {
    default: [],
    sanitize: (value, args) => {
      if (value === void 0) return [];
      if (value instanceof Array) return value;
      return String(value).split(/,/g);
    }
  }).add(/minify/i, {
    default: false,
    sanitize: (value, args) => {
      return value === true ? true : false;
    }
  }).add(/obfuscate/i, {
    default: false
  });
  return cliArguments;
}

// ../Forge-Typescript-Source/src/ts/build/BuildClient.ts
var import_forge6 = require("@onyx-ignition/forge");
var import_promises2 = require("node:fs/promises");

// ../Forge-Typescript-Source/src/ts/build/Core.ts
var import_promises = require("node:fs/promises");
var import_forge3 = require("@onyx-ignition/forge");
var import_esbuild = require("esbuild");
var import_javascript_obfuscator = require("javascript-obfuscator");

// ../Forge-Typescript-Source/src/ts/FileCache.ts
var import_forge2 = require("@onyx-ignition/forge");
var FileCacheInternal = class {
  _cache = /* @__PURE__ */ new Map();
  _decoder = new TextDecoder();
  Has(url) {
    return this._cache.has(url);
  }
  async $FetchString(url) {
    return this._decoder.decode(await this.$Fetch(url));
  }
  async $Fetch(url) {
    if (this._cache.has(url)) return this._cache.get(url);
    const buffer = await import_forge2.ForgeFile.$Read(url);
    this._cache.set(url, buffer);
    return buffer;
  }
  Cache(url, data) {
    if (this._cache.has(url)) return false;
    this._cache.set(url, data);
    return true;
  }
  Uncache(url) {
    return this._cache.delete(url);
  }
  Clear() {
    this._cache.clear();
  }
};
var FileCache = new FileCacheInternal();

// ../Forge-Typescript-Source/src/ts/build/Core.ts
var CachePlugin = {
  name: "forge-build-cache",
  setup(build) {
    build.onLoad({ filter: /\.((mjs)|(ts|x)|(js|x)$)/ }, async function(args) {
      const filePath = args.path;
      let contents = await FileCache.$FetchString(filePath);
      const regExp = /\(\s*(?<params>.*?)\)\s*=>\s*require\(["'`](?<macro>.+?)["'`]\s*\)/;
      if (regExp.test(contents)) {
        console.green("found macro");
      }
      return { contents, loader: "tsx" };
    });
  }
};
function FilterPlatform(value) {
  switch (String(value).toLowerCase()) {
    case "node":
      return "node";
    case "neutral":
      return "neutral";
    case "browser":
      return "browser";
  }
}
function FilterBundled(value) {
  switch (String(value).toLowerCase()) {
    case "preserve":
      return "preserve";
    case "mangle":
      return "mangle";
    case "merge":
      return "merge";
  }
}
var BuilderConfig = class _BuilderConfig {
  static async $From(options) {
    const { args } = options;
    if (args) {
      const format = args.last(/^format$/);
      const bundled = FilterBundled(args.last(/^bundled$/));
      const platform = FilterPlatform(args.last(/^platform$/));
      const metafile = args.last(/^meta$/);
      const treeShaking = args.last(/^tree-shaking$/i);
      const ignores = await args.$walk(/^ignore$/i);
      const transform = {
        read: [],
        write: []
      };
      const transformArg = args.attributes(/^transform$/);
      if (transformArg?.write?.["obfuscate"] === true) transform.write.push("obfuscate");
      if (transformArg?.write?.["gzip"] === true) transform.write.push("gzip");
      const aliasesArgs = args.attributes(/^alias$/);
      const aliases = {
        files: aliasesArgs.files || {},
        directories: aliasesArgs.directories || {}
      };
      const externals = await $ParseExternals(args.collect(/^external$/, { split: /\s*,\s*/ }));
      return new _BuilderConfig({ bundled, format, platform, metafile, treeShaking, ignores, write: "memory", external: externals, transform, aliases });
    }
  }
  bundled;
  platform;
  format;
  metafile;
  external;
  verbose;
  treeShaking;
  ignores;
  aliases;
  write;
  transform;
  constructor(options) {
    this.bundled = options.bundled || "merge";
    this.platform = options.platform || "node";
    this.format = options.format || "cjs";
    this.treeShaking = options.treeShaking || true;
    this.external = options.external || [];
    this.verbose = options.verbose || "all";
    this.metafile = options.metafile === false ? false : true;
    this.ignores = options.ignores || [];
    this.write = options.write || "memory";
    this.transform = {
      read: options.transform?.read || [],
      write: options.transform?.write || []
    };
    this.aliases = {
      files: options.aliases?.files || {},
      directories: options.aliases?.directories || {}
    };
  }
  async $validate() {
    const result = new import_forge3.Result();
    switch (this.platform) {
      case "browser":
      case "node":
      case "neutral":
        break;
      default:
        result.add(new Error(`Invalid Platform: "${this.platform}"`), { platform: true, error: true });
    }
    switch (this.format) {
      case "cjs":
      case "esm":
      case "iife":
        break;
      default:
        result.add(new Error(`Invalid Format: "${this.format}"`), { format: true, error: true });
    }
    switch (this.verbose) {
      case "all":
      case "error":
      case "warn":
      case "log":
        break;
      default:
        result.add(new Error(`Invalid Verbose: "${this.verbose}"`), { verbose: true, error: true });
    }
    return result;
  }
};
async function $ParseExternals(externals) {
  const externalPackages = /* @__PURE__ */ new Set(["esbuild"]);
  for (const currentPackage of externals) {
    const result = /^(?<protocol>(json:\/\/)|(json.keys:\/\/)|(json.values:\/\/))(?<file>(.*[\\\/])?.+?(?=::))(::(?<accessor>.+))?/mi.exec(currentPackage);
    if (result) {
      const { protocol, file } = result.groups;
      const accessor = result.groups.accessor?.split(/\s*,\s*/g) || [];
      try {
        let jsonData = (0, import_forge3.DecodeAttributes)(await import_forge3.ForgeIO.$Fetch(file));
        for (const access of accessor) jsonData = jsonData[access];
        switch (protocol.toLowerCase()) {
          case "json://":
            for (const externalPackage of jsonData) externalPackages.add(externalPackage);
            break;
          case "json.keys://":
            for (const externalPackage of Object.keys(jsonData)) externalPackages.add(externalPackage);
            break;
          case "json.values://":
            for (const externalPackage of Object.values(jsonData)) externalPackages.add(externalPackage);
            break;
        }
      } catch (error) {
      }
    } else {
      externalPackages.add(currentPackage);
    }
  }
  return [...externalPackages];
}
function CalcCodeSize(code) {
  let size;
  switch (code.constructor) {
    case ArrayBuffer:
      return code.byteLength;
    case String:
      return code.length;
  }
}
function UncacheFile(file) {
  FileCache.Uncache(file);
}
async function $Transform({ root, contents, source }, buildOptions, options) {
  switch (buildOptions.format) {
    case "forge-js":
    case "forge-ts":
    case "tsc":
      throw new Error(`"forge-js", "forge-ts", are not yet implemented`);
  }
  const plugins = [];
  plugins.push({
    name: "forge-build-ignore",
    setup(build) {
      const ignores = buildOptions.ignores.map((file) => import_forge3.ForgePath.Resolve(file));
      return;
      build.onResolve({ filter: /./ }, async function(args) {
        const { path: path2, resolveDir } = args;
        for (const ext of [".ts", ".tsx", ".jsx", ".js", ".mjs"]) {
          const absolutePath = import_forge3.ForgePath.Resolve(resolveDir, `${path2}${ext}`);
          if (await import_forge3.ForgeFile.$FileExist(absolutePath) && ignores.includes(absolutePath)) {
          }
        }
        return;
      });
    }
  });
  if (options?.cache !== false) plugins.push(CachePlugin);
  if (options?.plugins) plugins.push(...options?.plugins);
  const result = new import_forge3.Result();
  result.add({ ...buildOptions }, { options: true });
  const startTime = Date.now();
  const { bundled, write, verbosity, treeShaking } = buildOptions;
  let logLevel;
  switch (verbosity) {
    default:
      logLevel = "silent";
  }
  const buildQuery = await (0, import_esbuild.build)({
    stdin: {
      contents,
      // These are all optional:
      sourcefile: source,
      resolveDir: root,
      loader: "tsx"
    },
    bundle: true,
    platform: buildOptions.platform,
    write: false,
    // dont produce a build file, but give me the build code as a result
    format: buildOptions.format,
    metafile: true,
    loader: { ".ts": "ts", ".js": "js", ".tsx": "tsx", ".jsx": "jsx" },
    treeShaking,
    minify: buildOptions.transform.write.includes("minify"),
    external: buildOptions.bundled ? await $ParseExternals(["esbuild", ...buildOptions.external]) : void 0,
    plugins,
    logLevel
  }).catch(function(error) {
    if (error instanceof Error) {
      const messages = error.message.split("\n");
      for (let i = 1; i < messages.length; i++) {
        const line = messages[i];
        const execResult = /(?<file>(.+?)):((?<row>\d+):(?<column>\d+):) ERROR: (?<error>.+)/.exec(line);
        if (execResult) result.add({ ...execResult.groups }, { error: true });
      }
    } else {
      result.add({ error }, { error: true });
    }
  });
  result.add({ time: Date.now() - startTime }, { stats: true });
  if (buildQuery === void 0) return result.reject();
  const buildResult = buildQuery;
  const inputs = buildResult.metafile.inputs;
  result.add({ inputs }, { inputs: true });
  const manifest = Object.keys(buildResult.metafile.inputs);
  result.add({ manifest }, { manifest: true });
  const code = await $ApplyWriteTransforms(buildResult.outputFiles[0].text, buildOptions);
  result.add({ code }, { code: true });
  return result.resolve();
}
async function $Build(entryFile, buildOptions, options) {
  switch (buildOptions.format) {
    case "forge-js":
    case "forge-ts":
    case "tsc":
      throw new Error(`"forge-js", "forge-ts", are not yet implemented`);
  }
  const result = new import_forge3.Result();
  const stats = await import_forge3.ForgeFile.$Stat(entryFile).catch((error) => void 0);
  if (stats === void 0 || stats.isFile() === false) {
    result.add({ error: `Entry file missing or not a file: "${entryFile}"` }, { error: true });
    return result.reject();
  }
  const plugins = options?.plugins || [];
  if (options?.cache !== false) plugins.push(CachePlugin);
  result.add({ ...buildOptions }, { options: true });
  result.add({ entry: entryFile }, { entry: true });
  const startTime = Date.now();
  const buildQuery = await (0, import_esbuild.build)({
    entryPoints: [entryFile],
    bundle: true,
    platform: buildOptions.platform,
    write: false,
    // dont produce a build file, but give me the build code as a result
    format: buildOptions.format,
    metafile: true,
    loader: { ".ts": "ts", ".js": "js", ".tsx": "tsx", ".jsx": "jsx" },
    treeShaking: buildOptions.treeShaking,
    minify: buildOptions.transform.write.includes("minify"),
    // logLevel: "silent",
    external: await $ParseExternals(["esbuild", ...buildOptions.external]),
    plugins
  }).catch(function(error) {
    if (error instanceof Error) {
      const messages = error.message.split("\n");
      for (let i = 1; i < messages.length; i++) {
        const line = messages[i];
        const execResult = /(?<file>(.+?)):((?<row>\d+):(?<column>\d+):) ERROR: (?<error>.+)/.exec(line);
        if (execResult) result.add({ ...execResult.groups }, { error: true });
      }
    } else {
      result.add({ error }, { error: true });
    }
  });
  result.add({ time: Date.now() - startTime }, { stats: true });
  if (buildQuery === void 0) return result.reject();
  const buildResult = buildQuery;
  const inputs = buildResult.metafile.inputs;
  const manifest = Object.keys(buildResult.metafile.inputs);
  result.add({ inputs }, { inputs: true });
  result.add({ manifest }, { manifest: true });
  const code = await $ApplyWriteTransforms(buildResult.outputFiles[0].text, buildOptions);
  result.add({ code }, { code: true });
  return result.resolve();
}
async function $Obfuscate(code) {
  const obfuscationResult = (0, import_javascript_obfuscator.obfuscate)(
    code,
    {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1
    }
  );
  return obfuscationResult.getObfuscatedCode();
}
async function $ApplyWriteTransforms(code, options) {
  const writeTransforms = options.transform.write;
  code = (options.platform == "node" ? "#! /usr/bin/env node\n\n" : "") + code;
  if (writeTransforms.includes("obfuscate")) code = await $Obfuscate(code);
  if (writeTransforms.includes("gzip")) {
    const buffer = await import_forge3.ForgeZip.$GZip(code);
    if (writeTransforms.includes("base64")) return import_forge3.Base64.Encode(buffer);
    return (0, import_forge3.DecodeString)(buffer);
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = import_forge3.Base64.Encode(code);
  return code;
}
async function $Clean() {
  const files = [
    ...await import_forge3.ForgeFile.$Walk(import_forge3.ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
    ...await import_forge3.ForgeFile.$Walk(import_forge3.ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
  ];
  const promises = [];
  for (const file of files) promises.push((0, import_promises.rm)(file, { recursive: true, force: true }));
  await Promise.allSettled(promises);
}

// ../Forge-Typescript-Source/src/ts/build/LibraryBuilder.ts
var import_forge4 = require("@onyx-ignition/forge");
function ExportPlugin(files, hashes, resolves) {
  const errors = [];
  return {
    name: "forge-export-library",
    setup: function(build) {
      build.onResolve({ filter: /.+/ }, async function(args) {
        let { path: path2, resolveDir, importer } = args;
        if (resolves.directories) {
          for (const [match, replace] of Object.entries(resolves.directories)) {
            if (path2.startsWith(match)) path2 = path2.replace(match, import_forge4.ForgePath.Resolve(replace) + "/");
          }
        }
        for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
          const absolutePath = import_forge4.ForgePath.Resolve(resolveDir, `${path2}${ext}`);
          const relativePath = import_forge4.ForgePath.Relative(resolveDir, absolutePath);
          if (await import_forge4.ForgeFile.$FileExist(absolutePath)) {
            if (resolves.files[absolutePath]) {
              return { path: resolves.files[absolutePath], external: true };
            } else if (files.includes(absolutePath)) {
              const importParsed = import_forge4.ForgePath.Parse(importer);
              if (importParsed.name == "{index}") return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
              const pathParsed = import_forge4.ForgePath.Parse(hashes.get(absolutePath).path);
              return { path: "./" + pathParsed.base, external: true, namespace: "remapped" };
              return { namespace: "ignore" };
            }
            console.red(`Unresolved file found`, absolutePath, resolves, files);
            errors.push(`Unresolved file found: ${absolutePath}`);
          }
        }
        return { path: path2, external: true };
      });
      build.onLoad({ filter: /\.((ts|x$)|(js|x))/ }, async function(args) {
        console.magenta("onload", args);
        const { path: path2 } = args;
        const contents = hashes.has(path2) ? hashes.get(path2).contents : await FileCache.$FetchString(path2);
        return { contents, loader: "tsx" };
      });
      build.onEnd(function() {
        if (errors.length) console.log("errors", errors);
        if (errors.length) throw new Error(`Error found compiling ${errors}`);
      });
    }
  };
}
var LibraryBuilder = class {
  _exportedComponents = /* @__PURE__ */ new Set();
  _sanitizeSources({ root, files }, aliases) {
    const sanitizedFiles = [];
    for (const file of files) sanitizedFiles.push(import_forge4.ForgePath.Resolve(file));
    const sanitizedResolves = {};
    for (const [file, resolve] of Object.entries(aliases.files)) {
      if (import_forge4.ForgePath.IsAbsolute(file)) {
        sanitizedResolves[file] = resolve;
      } else {
        sanitizedResolves[import_forge4.ForgePath.Resolve(root, file)] = resolve;
      }
    }
    return [{
      root,
      files: sanitizedFiles
    }, {
      files: sanitizedResolves,
      directories: aliases.directories
    }];
  }
  async _$extractImportations(file, root, javascript) {
    const parsedPath = import_forge4.ForgePath.Parse(file);
    const name = parsedPath.name;
    const code = await FileCache.$FetchString(file);
    const importations = /* @__PURE__ */ new Set();
    const skippedImportations = [];
    const regExp = javascript === true ? /(^|\n)\s*export\s+(default)?((async function)|function|class|var|const|let)\s+(?<component>[$\w]+)/gm : /(^|\n)\s*export\s+(default)?((async function)|function|class|enum|interface|var|const|let|type)\s+(?<component>[$\w]+)/gm;
    let results;
    while (results = regExp.exec(code)) {
      const exportName = results.groups.component;
      const tranformsResults = new RegExp(`${exportName}\\d+`).exec(code);
      const transformedExport = tranformsResults ? tranformsResults[0] : exportName;
      if (this._exportedComponents.has(exportName)) {
        if (importations.has(exportName) === false) skippedImportations.push(exportName);
      } else {
        importations.add(exportName);
      }
      this._exportedComponents.add(transformedExport);
    }
    let importEntry = importations.size == 0 ? "// " : "";
    importEntry += `import { ${[...importations].join(", ")} } from "${import_forge4.ForgePath.Relative(root, parsedPath.dir)}/${name}";`.replace(/\\/g, "/").replace(".//", "./");
    if (skippedImportations.length) importEntry += ` // skipped imports :{ ${skippedImportations.join(", ")} }`;
    return importEntry;
  }
  async $merge(sources, alias, basic) {
    const { files, root } = sources;
    const importations = [];
    for (const file of files) importations.push(await this._$extractImportations(file, root, basic));
    return `${importations.join("\n")}
        
export {

${[...this._exportedComponents].map((value) => "	" + value.replace(/[^\w$]+/g, "_")).join(",\n")} 
            
};`;
  }
  async $bundle(sources, buildOptions) {
    const [{ files, root }, aliases] = this._sanitizeSources(sources, buildOptions.aliases);
    const contents = await this.$merge(sources, buildOptions.aliases);
    const result = await $Transform({ root, contents }, buildOptions, {
      plugins: [{
        name: "forge-library-bundle",
        setup(build) {
          build.onResolve({ filter: /.+/ }, async function(args) {
            const { path: path2, resolveDir } = args;
            for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
              const absolutePath = import_forge4.ForgePath.Resolve(resolveDir, `${path2}${ext}`);
              if (aliases[absolutePath]) return { path: aliases[absolutePath], external: true };
              if (files.includes(absolutePath) === false) return { path: path2, external: true };
              if (await import_forge4.ForgeFile.$FileExist(absolutePath)) return { path: absolutePath, external: false };
            }
            return { path: path2, external: true };
          });
        }
      }]
    });
    return result.or({ code: true }).first.code;
  }
  async $export(sources, buildOptions, libraryExport) {
    let [{ files, root }, aliases] = this._sanitizeSources(sources, buildOptions.aliases);
    files = files.filter((file) => buildOptions.ignores.includes(file) === false);
    const hashes = /* @__PURE__ */ new Map();
    const { bundled } = buildOptions;
    for (const file of files) {
      let path2;
      if (bundled == "preserve") {
        const parsedFile = import_forge4.ForgePath.Parse(file);
        path2 = import_forge4.ForgePath.Join(libraryExport.join, import_forge4.ForgePath.Relative(root, import_forge4.ForgePath.Join(parsedFile.dir, parsedFile.name))) + libraryExport.ext;
      } else if (bundled == "mangle") {
        path2 = import_forge4.ForgePath.Join(libraryExport.join, (0, import_forge4.QuickHash)()) + libraryExport.ext;
      }
      hashes.set(file, { path: path2, contents: await FileCache.$FetchString(file) });
    }
    const bundle = new import_forge4.Result();
    const contents = await this.$merge({ files, root }, aliases, true);
    const plugins = buildOptions.bundled == "preserve" || buildOptions.bundled == "mangle" ? [ExportPlugin(files, hashes, aliases)] : [];
    const transformResult = await $Transform({ root, contents, source: "{index}" }, buildOptions, { plugins });
    if (transformResult.success === false) return transformResult;
    const { code } = transformResult.or({ code: true }).first;
    bundle.add({ code, path: "{index}" }, { code: true, index: true });
    for (const file of files) {
      if (buildOptions.ignores.includes(file)) {
        console.red("ignore found", file);
        continue;
      }
      const { contents: contents2, path: path2 } = hashes.get(file);
      const fileParsed = import_forge4.ForgePath.Parse(file);
      const transformResult2 = await $Transform({ root: fileParsed.dir, contents: contents2, source: file }, buildOptions, { plugins });
      if (transformResult2.success === false) {
        for (const [component, attributes] of transformResult2) console.log(attributes, component);
        throw `Error compiling library.$Export( ): ${file}`;
      }
      const { code: code2 } = transformResult2.or({ code: true }).first;
      bundle.add({ code: code2, path: path2 }, { code: true, dependency: true });
    }
    return bundle;
  }
};

// ../Forge-Typescript-Source/src/ts/build/TypesBuilder.ts
var import_forge5 = require("@onyx-ignition/forge");
var import_typescript = require("typescript");
async function $BuildTypes(entry, packageName, buildOptions) {
  const errors = [];
  if (entry.files) {
    for (const file of entry.files) if (await import_forge5.ForgeFile.$FileExist(file) === false) errors.push(`Entry file: "${file}" is invalid`);
  } else {
    errors.push(`Entry { files } is not an array of vaild files`);
  }
  const result = new import_forge5.Result();
  const fileNames = entry.files;
  const compilerOptions = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  };
  const createdFiles = {};
  const host = (0, import_typescript.createCompilerHost)(compilerOptions);
  host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
  const program = (0, import_typescript.createProgram)(fileNames, compilerOptions, host);
  program.emit();
  const codeSegments = ["\n", `// @ts-nocheck

declare module "${packageName}" {
`];
  if (buildOptions.bundled === "merge") {
    for (const [filename, contents] of Object.entries(createdFiles)) {
      const code2 = contents.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
      codeSegments.push(code2);
    }
    codeSegments.push("\n}");
    const code = await $ApplyWriteTransforms(codeSegments.join("\n"), { transform: { write: [] } });
    result.add({ code }, { code: true });
  } else if (buildOptions.bundled == "preserve") {
    throw new Error(`not yet implemented bundled == "preserve"`);
  }
  return result.resolve();
}

// ../Forge-Typescript-Source/src/ts/build/BuildClient.ts
function SerializeResult(result) {
  const success = result.success;
  const serializedResult = [];
  for (const [component, attributes] of result) serializedResult.push([component, attributes]);
  return {
    success,
    result: serializedResult
  };
}
var BuildClient = class extends import_forge6.ForgeClient {
  _contexts = /* @__PURE__ */ new Map();
  /* constructor(options: { key?: string, name?: string, race?: Record<string, number> }) {
  
          super(options);
  
      } */
  async $watch(data, session) {
    let { file, event } = data;
    file = file.replace(/\\/g, "/");
    UncacheFile(file);
    const promises = [];
    for (const [hash, { filter, entry, target, build }] of this._contexts) {
      if (filter.test(file) === false) continue;
      promises.push($Build(entry, build));
    }
    await Promise.allSettled(promises);
    return {
      success: true,
      message: `file :${file} flushed`
    };
  }
  async $reset(data, session) {
    const files = [
      ...await import_forge6.ForgeFile.$Walk(import_forge6.ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
      ...await import_forge6.ForgeFile.$Walk(import_forge6.ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
    ];
    const promises = [];
    for (const file of files) {
      promises.push((0, import_promises2.rm)(file, { recursive: true, force: true }));
    }
    await Promise.allSettled(promises);
    return {
      success: true
    };
  }
  async $execute(signal, data, session) {
    console.cyan(`$execute`, signal);
    switch (signal.toLowerCase()) {
      /* case "uncache":
                      return this.Uncache(data, session);
      
                  case "cache":
                      return this.Cache(data, session); */
      case "add-context":
        return this.$startContext(data, session);
      case "remove-context":
        return this.$stopContext(data, session);
      case "bundle":
        return this.$bundle(data, session);
      case "library":
        return this.$library(data, session);
      case "types":
        return this.$types(data, session);
    }
    return { "execute": "empty function" };
  }
  async $route(request, response) {
    throw "ADD SOMETHING";
  }
  async $startContext(data, session) {
    const { entry, target } = data;
    let filter;
    try {
      if (data.filter) filter = new RegExp(data.filter);
    } catch (error) {
      console.red(data.filter, error);
    }
    const errors = [];
    const build = new BuilderConfig(data.build);
    const hash = (0, import_forge6.QuickHash)();
    this._contexts.set(hash, { filter, entry, target, build });
    return {
      success: true,
      hash,
      message: ``
    };
  }
  async $stopContext(data, session) {
    const hash = data.hash;
    if (hash === void 0 || this._contexts.has(hash) === false) return {
      success: false,
      message: `context does no exist for ${hash}`
    };
    this._contexts.delete(hash);
    return {
      success: true,
      message: `context does nto exist for ${hash}`
    };
  }
  async $bundle(data, session) {
    const { entry, build, target } = data;
    if (entry === void 0 || entry == "") throw `"in" property missing from action data`;
    return SerializeResult(await $Build(entry, build));
  }
  async $library(data, session) {
    const { source, build } = data;
    const { root } = source;
    const files = source ? source.files : await import_forge6.ForgeFile.$Walk(source.walk);
    const aliases = build.aliases;
    const library = new LibraryBuilder();
    if (build.bundled == "mangle" || build.bundled == "preserve") {
      return SerializeResult(await library.$export({ files, root }, new BuilderConfig(build), { join: "./lib/", ext: ".js" }));
    } else if (build.bundled == "merge") {
      const code2 = await library.$bundle({ files, root }, new BuilderConfig(build));
      return {
        success: true,
        result: [{ code: code2 }, { code: true, source: true }]
      };
    }
    const code = await library.$merge({ root, files, aliases });
    return {
      success: true,
      result: [{ code }, { code: true, source: true }]
    };
  }
  async $listen(port, key) {
    if (this._server) return this._server;
    if (isNaN(port) === true) throw new Error(`Port not supplied to Socket Server`);
    this._server = new import_forge6.ForgeWebSocketServer(port, key);
    this._server[import_forge6.Reactivity].subscribe(async function([socket, header, data]) {
      if (header === void 0) return;
      try {
        this._$subscribeMessage("message", socket, header, data);
      } catch (error) {
        socket.reject(header, { error: String(error) });
      }
    }.bind(this));
    return this._server;
  }
  async $types(data, session) {
    const { entry, name, build, options: { ignore, temp } } = data;
    return SerializeResult(await $BuildTypes(entry, name, build, { ignore, temp }));
  }
};

// ../Forge-Typescript-Source/src/ts/build/NPMBuilder.ts
var import_forge7 = require("@onyx-ignition/forge");
async function $BuildNPM(builderOptions, bin, library) {
  const npmResult = new import_forge7.Result();
  const totalTime = Date.now();
  {
    const startTimne = Date.now();
    const { files, name } = library;
    const result = await $BuildTypes({ files }, name, { ...builderOptions, bundled: "merge" });
    if (result.success === false) return npmResult.merge(result).reject();
    const { code } = result.or({ code: true }).first;
    npmResult.add({ code }, { code: true, types: true });
    const size = CalcCodeSize(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, types: true });
    console.blue("index.d.ts compiled in ", Date.now() - startTimne, "s");
  }
  if (bin) {
    const startTimne = Date.now();
    builderOptions.format = "cjs";
    builderOptions.platform = "node";
    const result = await $Transform(bin, builderOptions);
    if (result.success === false) return npmResult.merge(result).reject();
    let { code } = result.or({ code: true }).first;
    code = String(code).replace(/#! \/usr\/bin\/env node/, `#! /usr/bin/env node
require("index");
`);
    npmResult.add({ code }, { code: true, npx: true });
    const size = CalcCodeSize(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, npx: true });
  }
  {
    const { files, root, join, ext } = library;
    const formats = [["cjs", ext.cjs], ["esm", ext.esm]];
    for (const [format, ext2] of formats) {
      const startTime = Date.now();
      const library2 = new LibraryBuilder();
      builderOptions.format = format;
      builderOptions.bundled = "mangle";
      if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
        const result = await library2.$export({ files, root }, builderOptions, { join, ext: ext2 });
        if (result.success === false) return npmResult.merge(result).reject();
        for (const [component, attributes] of result.or({ code: true })) {
          let { code, path: path2 } = component;
          const size = CalcCodeSize(code);
          const elapsed = startTime - Date.now();
          if (path2 == "{index}") {
            path2 = `index${ext2}`;
            npmResult.add({ code, path: path2 }, { code: true, library: true, index: true, format });
            npmResult.add({ elapsed, size }, { stats: true, library: true, index: true, format });
          } else {
            npmResult.add({ code, path: path2 }, { code: true, library: true, format });
            npmResult.add({ elapsed, size }, { stats: true, library: true, format });
          }
        }
      } else if (builderOptions.bundled == "merge") {
        const code = await library2.$bundle({ files, root }, builderOptions);
        npmResult.add({ code }, { code: true, library: true, index: true, format });
      } else {
        throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
      }
    }
  }
  console.blue("NPM package compiled in ", Date.now() - totalTime, "s");
  return npmResult;
}

// ../Forge-Typescript-Source/src/ts/client.ts
var import_forge8 = require("@onyx-ignition/forge");
async function $OutputCompiledCode(code, outFile) {
  if (outFile) {
    console.log("writing file", outFile);
    await import_forge8.ForgeFile.$Write(outFile, code, { recursive: true });
  } else {
    await new Promise(function(resolve, reject) {
      if (code instanceof ArrayBuffer) {
        process.stdout.write(new Uint8Array(code), resolve);
      } else {
        process.stdout.write(code, resolve);
      }
    });
  }
}

// ../Forge-Typescript-Source/src/Forge-Typescript-Source/src/ts/bin.ts
var path = require("path");
var fs = require("fs");
var $fs = require("node:fs/promises");
var { spawn, fork, exec, execSync } = require("child_process");
var application;
(async function() {
  const args = FetchArguments();
  try {
    args.compile();
    console.log([...args]);
  } catch (error) {
    console.error("The following errors were found:");
    console.error(error["message"]);
    process.exit(1);
  }
  const KEY = args.last("key");
  const OUT = args.last("out");
  const PLATFORM = args.last(/^platform$/i);
  const FORMAT = args.last(/^format$/i);
  const BUNDLE = args.last(/^bundle$/i);
  const WRITE = args.last(/^write$/i);
  const MOUNT = args.last(/^mount$/);
  const BUILD = args.last(/^b$|^forge-typescript\/build$/i);
  const PERSIST = args.last(/^forge-typescript\/persist$/i);
  const INLINE = args.last(/^forge-typescript\/inline$/i);
  const WATCH = args.last(/^forge-typescript\/watch$/i);
  const LISTEN = args.last(/^forge-typescript\/listen$/g);
  const LIBRARY = args.last(/^forge-typescript\/library$/i);
  const TYPES = args.last(/^forge-typescript\/types$/i);
  const CLEAN = args.last(/^clean$|^forge-typescript\/clean$/i);
  const NPM = args.last(/^forge-typescript\/npm$/i);
  const VERBOSE = args.last(/^verbose$/);
  function ProcessWarnignsAndErrors(warnings, errors) {
    if (VERBOSE == "all") {
      console.parse("<yellow>Warnings:");
      for (const warning of warnings) console.parse(`	<cyan>${warning.replace(/<warning>/g, "<yellow>").replace(/<\/warning>/g, "</yellow>")}`);
      console.parse("<red>Errors:");
      for (const error of errors) console.parse(`	<cyan>${error.replace(/<error>/g, "<red>").replace(/<\/error>/g, "</red>")}`);
    }
    if (errors.length) process.exit();
  }
  if (CLEAN) await $Clean();
  if (PERSIST || WATCH || LISTEN) {
    console.parse("<red>Persist STARTED");
    application = new BuildClient({ race: { ".*": 500 } });
    if (LISTEN) {
      const server = await application.$listen(LISTEN);
    }
  }
  const builderOptions = await BuilderConfig.$From({ args });
  if (TYPES) {
    const name = args.last(/^name$/i);
    const files = await args.$walk(/^files$/, { ignores: builderOptions.ignores });
    const errors = [];
    if (name === void 0) errors.push(`arguments for <error>{ name }</error> is needed for assigning the namespace files`);
    if (files === void 0 || files.length == 0) errors.push(`arguments for <error>{ files }</error> has no files assigned`);
    ProcessWarnignsAndErrors(errors, []);
    builderOptions.bundled = "merge";
    builderOptions.write = "memory";
    const result = await $BuildTypes({ files }, name, builderOptions);
    ProcessBuilderResult(result, [`Error bundling d.ts to ${OUT} with the following errors:`]);
    const { code } = result.or({ code: true }).first;
    await $OutputCompiledCode(code, OUT);
  } else if (BUILD) {
    const entryFile = args.last(/^in$/);
    const format = args.last(/^format$/);
    const platform = args.last(/^platform$/);
    const errors = [];
    const warnings = [];
    if (entryFile === void 0) errors.push(`arguments for <error>{ name }</error> is require for entry file`);
    if (format === void 0) warnings.push(`arguments for <warning>{ format }</warning> is optional and will default to "cjs"`);
    if (platform === void 0) warnings.push(`arguments for <warning>{ platform }</warning> is optional and will default to "cjs"`);
    if (platform === void 0) warnings.push(`arguments for <warning>{ external }</warning> is optional but recommends using "json.keys://package.json::dependencies"`);
    ProcessWarnignsAndErrors(warnings, errors);
    await $Build(entryFile, new BuilderConfig(builderOptions)).then(function(result) {
      if (result.success === false) throw new Error(`Error compiling`);
      const { code } = result.or({ code: true }).first;
      return $OutputCompiledCode(code, OUT);
    }).catch(CatchCompiledError);
  } else if (INLINE) {
    const inlineFile = args.last(/^script/i);
    const contents = (await import_forge9.ForgeFile.$ReadDecoded(inlineFile)).replace(/\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>@onyx-ignition[\/\\]forge-core)["'`];\s*/g, "\n");
    builderOptions.bundled = "preserve";
    builderOptions.platform = "node";
    builderOptions.treeShaking = true;
    builderOptions.ignores = await import_forge9.ForgeFile.$Walk("../Forge-Typescript-Source/src/ts/formless", { resolve: true });
    const result = await $Transform({ source: inlineFile, root: "./", contents }, builderOptions, { cache: false });
    if (result.success == false) {
      console.red("Errors found");
      for (const [error, attributes] of result) console.red(error);
    }
    const { code } = result.or({ code: true }).first;
    await import_forge9.ForgeFile.$Write("./dump.js", code);
    process["eval"](code);
  } else if (LIBRARY) {
    const join = args.last(/^join$/i) || "./lib/";
    const root = args.last(/^root$/i);
    const files = await args.$walk(/^file$/i, { ignores: builderOptions.ignores });
    const ext = args.last(/^ext$/i) || ".js";
    const library = new LibraryBuilder();
    if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
      if (OUT === void 0) throw new Error(`--out-- parameter missing`);
      const result = await library.$export({ files, root }, builderOptions, { join, ext });
      if (result.success == false) {
        for (const [component, attributes] of result) {
          console.red(component);
        }
        throw new Error(`Error transforming inline file`);
      }
      const outParsed = import_forge9.ForgePath.Parse(OUT);
      for (const [component, attributes] of result.or({ code: true })) {
        const { code, path: path2 } = component;
        const target = path2 == "{index}" ? import_forge9.ForgePath.Resolve(OUT) : import_forge9.ForgePath.Resolve(outParsed.dir, path2);
        await $OutputCompiledCode(code, target);
      }
    } else if (builderOptions.bundled == "merge") {
      const code = await library.$bundle({ files, root }, builderOptions);
      await $OutputCompiledCode(code, OUT);
    } else {
      throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
    }
  } else if (NPM) {
    if (args.last(/^bundled$/) === void 0) builderOptions.bundled = "mangle";
    const files = await args.$walk(/^(files)$/, { ignores: builderOptions.ignores });
    const createPackageJSON = args.last(/^package$/);
    const createManifest = args.last(/^manifest$/);
    const bin = args.attributes(/^bin$/i);
    const errors = [];
    const warnings = [];
    let queryOutDir;
    if (OUT === void 0) {
      errors.push(`arguments for <cyan>{ out }</cyan> is missing or invalid`);
    } else {
      queryOutDir = await import_forge9.ForgeFile.$DirectoryExists(OUT) ? OUT : import_forge9.ForgePath.Parse(OUT).dir;
      if (await import_forge9.ForgeFile.$DirectoryExists(queryOutDir) === false) warnings.push(`arguments for <cyan>{ out }</cyan> is a file. It was resolve to the parent directory`);
    }
    const outDir = queryOutDir;
    const library = args.attributes(/^library$/);
    if (library === void 0) errors.push(`arguments for <error>{ library }</error> is required and missing or invalid`);
    if (library?.root === void 0) errors.push(`arguments for <error>{ library.root }</error> is required is missing`);
    if (library?.name === void 0) errors.push(`arguments for <error>{ library.name }</error> is missing"`);
    if (library?.join === void 0) warnings.push(`arguments for <warning>{ library.join }</warning> is optional and will default to "./lib/"`);
    if (library?.ext?.cjs === void 0 || library?.ext.cjs === void 0) warnings.push(`arguments for <warning>{ library.ext.cjs }</warning> is optional and will default to cjs = ".js"`);
    if (library?.ext?.esm === void 0 || library?.ext.esm === void 0) warnings.push(`arguments for <warning>{ library.ext.esm }</warning> is optional and will default to esm = ".mjs"`);
    if (bin) {
      if (await import_forge9.ForgeFile.$FileExist(bin.entry) === false) errors.push(`arguments for <error>{ bin.entry }</error> does not exist`);
    } else {
      errors.push(`arguments for <cyan>{ bin.entry }</cyan> is missing or invalid`);
    }
    ProcessWarnignsAndErrors(warnings, errors);
    const { root, join, name } = { join: "./lib", ...library };
    const ext = {
      cjs: library.ext?.cjs || ".js",
      esm: library.ext?.esm || ".mjs"
    };
    const BinEntryParsed = import_forge9.ForgePath.Parse(bin.entry);
    const contents = await import_forge9.ForgeFile.$ReadDecoded(bin.entry);
    const results = await $BuildNPM(builderOptions, { contents, root: BinEntryParsed.dir, source: bin.entry }, { files, root, join, name, ext });
    {
      const { code } = results.and({ types: true, code: true }).first;
      const target = import_forge9.ForgePath.Resolve(outDir, "./index.d.ts");
      await $OutputCompiledCode(code, target);
    }
    {
      const { code } = results.and({ npx: true, code: true }).first;
      const target = import_forge9.ForgePath.Resolve(outDir, "./bin.js");
      await $OutputCompiledCode(code, target);
    }
    for (const [component, attributes] of results.or({ code: true }).not({ types: true, npx: true })) {
      const { code, path: path2 } = component;
      const target = import_forge9.ForgePath.Resolve(outDir, path2);
      await $OutputCompiledCode(code, target);
    }
    {
      if (createPackageJSON) {
        const packageJSON = {
          "name": name,
          "author": "",
          "version": "1.0.0",
          "keywords": [name],
          "description": "",
          "bin": "./bin.js",
          "main": "./index.js",
          "exports": {
            ".": {
              "types": "./index.d.ts",
              "require": "./index.js",
              "import": "./index.mjs"
            }
          },
          "scripts": {},
          "license": "ISC",
          "repository": {
            "type": "git",
            "url": ""
          },
          "dependencies": {}
        };
        const targetFile = import_forge9.ForgePath.Resolve(outDir, `package.json`);
        await $OutputCompiledCode(JSON.stringify(packageJSON), targetFile);
      }
    }
    {
      if (createManifest) {
      }
    }
  }
})();
function ProcessBuilderResult(result, errorHeaders) {
  if (result.success == false) {
    if (errorHeaders) for (const error of errorHeaders) console.parse(error);
    for (const [component, attributes] of result.or({ error: true })) console.parse("	", component.error);
    process.exit(1);
  }
}
async function CatchCompiledError(error) {
  process.exit(1);
}
