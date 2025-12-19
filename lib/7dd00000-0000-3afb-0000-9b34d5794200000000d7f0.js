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

// ../Forge-Typescript-Source/src/ts/build/Core.ts
var Core_exports = {};
__export(Core_exports, {
  $ApplyWriteTransforms: () => $ApplyWriteTransforms,
  $Build: () => $Build,
  $Clean: () => $Clean,
  $Obfuscate: () => $Obfuscate,
  $ParseExternals: () => $ParseExternals,
  $Strip: () => $Strip,
  $Transform: () => $Transform,
  $UnWrapWriteTransforms: () => $UnWrapWriteTransforms,
  BuildSocketParams: () => BuildSocketParams,
  BuilderConfig: () => BuilderConfig,
  CalcCodeSize: () => CalcCodeSize,
  FilterBundled: () => FilterBundled,
  FilterFormat: () => FilterFormat,
  FilterPlatform: () => FilterPlatform,
  UncacheFile: () => UncacheFile
});
module.exports = __toCommonJS(Core_exports);
var import_promises = require("node:fs/promises");
var import_forge = require("@onyx-ignition/forge");
var import_esbuild = require("esbuild");
var import_javascript_obfuscator = require("javascript-obfuscator");
var import_FileCache = require("./0726e0000-f0000-a028-00000-9b34d5794400001000038b7.js");
var BuildSocketParams = class {
  source;
  build;
  resolves;
  constructor(options) {
    const { source } = options;
    if (options.source === void 0) throw new Error(`Missing { source } parameters`);
    if (source.files && source.walk) throw new Error(`{ source.files } and { source.walk } are exclusive paramters. Use one or the other`);
    this.source = source;
  }
};
var CachePlugin = {
  name: "forge-build-cache",
  setup(build) {
    build.onLoad({ filter: /\.((mjs)|(ts|x)|(js|x)$)/ }, async function(args) {
      const filePath = args.path;
      let contents = await import_FileCache.FileCache.$FetchString(filePath);
      const regExp = /\(\s*(?<params>.*?)\)\s*=>\s*require\(["'`](?<macro>.+?)["'`]\s*\)/;
      if (regExp.test(contents)) {
        console.green("found macro");
      }
      return { contents, loader: "tsx" };
    });
  }
};
function FilterFormat(value) {
  switch (String(value).toLowerCase()) {
    case "cjs":
      return "cjs";
    case "esm":
      return "esm";
    case "iife":
      return "iife";
    /* case "forge-js":
        return "forge-js";
    case "forge-ts":
        return "forge-ts"; */
    case "tsc":
      return "tsc";
  }
}
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
    const result = new import_forge.Result();
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
        let jsonData = (0, import_forge.DecodeAttributes)(await import_forge.ForgeIO.$Fetch(file));
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
  import_FileCache.FileCache.Uncache(file);
}
function IncludesExternalPackages(file, builderOptions) {
  file = file.toLowerCase();
  for (const externalImport of builderOptions.external) if (externalImport.toLowerCase() == file) return true;
  return false;
}
async function $Strip({ code, root }, builderOptions, callback) {
  {
    let regExp = /\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>.+?)["'`];/g;
    let results;
    while (results = regExp.exec(code)) {
      const components = results.groups.components.split(/,\s*/g);
      const statement = results[0];
      const file = import_forge.ForgePath.Sanitize(root, results.groups.file);
      if (IncludesExternalPackages(results.groups.file, builderOptions)) {
        console.red("external", file);
      } else {
        code = callback && callback("import-components", { statement, components, file }, code) || code.replace(statement, "");
        console.blue("local", file);
        console.yellow(statement.replace("\n", ""), "import removed\n");
        regExp = /\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>.+?)["'`];/g;
      }
    }
  }
  {
    const regExp = /\s*import(\s+(?<components>.+?)\s*).+?["'`](?<file>.+?)["'`];\s*/;
    let results;
    while (results = regExp.exec(code)) {
      const components = results.groups.components.split(/,\s*/);
      const file = import_forge.ForgePath.Sanitize(root, results.groups.file);
      const statement = results[0];
      code = callback && callback("import-default", { statement, components, file }, code) || code.replace(statement, "");
    }
  }
  {
    const regExp = /^import\s+["'`](?<file>.+?)["'`];\s*/;
    let results;
    while (results = regExp.exec(code)) {
      const statement = results[0];
      code = callback && callback("import-file", { statement }, code) || code.replace(statement, "");
    }
  }
  {
    {
      const regExp = /(^|\n)\s*export\s+(default\s+)?(?<statement>((async\s+function)|function|class|var|const|let)\s+(?<component>[$\w]+))/gm;
      let results;
      while (results = regExp.exec(code)) {
        const exportName = results.groups.component;
        const statementAll = results[1];
        const { statement } = results.groups;
        code = "\n" + (callback && callback("export", { statement, export: exportName }, code) || code.replace(results[0], statement));
      }
    }
    {
      const regExp = /(^|\n)\s*export\s+(default\s*)?\{(.+?)\}/gms;
      let results;
    }
  }
  const result = new import_forge.Result();
  result.add({ code }, { code: true });
  return result;
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
      const ignores = buildOptions.ignores.map((file) => import_forge.ForgePath.Resolve(file));
      return;
      build.onResolve({ filter: /./ }, async function(args) {
        const { path, resolveDir } = args;
        for (const ext of [".ts", ".tsx", ".jsx", ".js", ".mjs"]) {
          const absolutePath = import_forge.ForgePath.Resolve(resolveDir, `${path}${ext}`);
          if (await import_forge.ForgeFile.$FileExist(absolutePath) && ignores.includes(absolutePath)) {
          }
        }
        return;
      });
    }
  });
  if (options?.cache !== false) plugins.push(CachePlugin);
  if (options?.plugins) plugins.push(...options?.plugins);
  const result = new import_forge.Result();
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
  const result = new import_forge.Result();
  const stats = await import_forge.ForgeFile.$Stat(entryFile).catch((error) => void 0);
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
    const buffer = await import_forge.ForgeZip.$GZip(code);
    if (writeTransforms.includes("base64")) return import_forge.Base64.Encode(buffer);
    return (0, import_forge.DecodeString)(buffer);
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = import_forge.Base64.Encode(code);
  return code;
}
async function $UnWrapWriteTransforms(code, options) {
  const writeTransforms = options.transform.write;
  if (writeTransforms.includes("gzip")) {
    if (writeTransforms.includes("base64")) {
      const buffer2 = await import_forge.ForgeZip.$GUnzip(import_forge.Base64.ArrayBuffer(code));
      return (0, import_forge.DecodeString)(buffer2);
    }
    const buffer = await import_forge.ForgeZip.$GUnzip(code);
    return (0, import_forge.DecodeString)(buffer);
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = import_forge.Base64.String(code);
  return code;
}
async function $Clean() {
  const files = [
    ...await import_forge.ForgeFile.$Walk(import_forge.ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
    ...await import_forge.ForgeFile.$Walk(import_forge.ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
  ];
  const promises = [];
  for (const file of files) promises.push((0, import_promises.rm)(file, { recursive: true, force: true }));
  await Promise.allSettled(promises);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ApplyWriteTransforms,
  $Build,
  $Clean,
  $Obfuscate,
  $ParseExternals,
  $Strip,
  $Transform,
  $UnWrapWriteTransforms,
  BuildSocketParams,
  BuilderConfig,
  CalcCodeSize,
  FilterBundled,
  FilterFormat,
  FilterPlatform,
  UncacheFile
});
