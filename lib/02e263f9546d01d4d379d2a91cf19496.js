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
  $Obfuscate: () => $Obfuscate,
  $ParseExternals: () => $ParseExternals,
  $SanitizeGlob: () => $SanitizeGlob,
  $Strip: () => $Strip,
  $Transform: () => $Transform,
  $UnWrapWriteTransforms: () => $UnWrapWriteTransforms,
  $VerifyDirectoryExists: () => $VerifyDirectoryExists,
  $VerifyFile: () => $VerifyFile,
  BuildSocketParams: () => BuildSocketParams,
  BuilderConfig: () => BuilderConfig,
  Bundle: () => Bundle,
  CalcCodeSize: () => CalcCodeSize,
  FilterBundled: () => FilterBundled,
  FilterFormat: () => FilterFormat,
  FilterPlatform: () => FilterPlatform,
  FormatElapsedTime: () => FormatElapsedTime,
  RenderVerifyAccessor: () => RenderVerifyAccessor,
  UncacheFile: () => UncacheFile,
  Verbosity: () => Verbosity,
  VerifyPackages: () => VerifyPackages
});
module.exports = __toCommonJS(Core_exports);
var import_forge = require("@onyx-ignition/forge");
var import_esbuild = require("esbuild");
var import_javascript_obfuscator = require("javascript-obfuscator");
var import_Core = require("./7a0362d7d75257ca468d645e44cba11e.js");
var import_FileCache = require("./cd2e813171d8118f794a0263739facf9.js");
var Bundle = /* @__PURE__ */ ((Bundle2) => {
  Bundle2["preserve"] = "preserve";
  Bundle2["mangle_static"] = "mangle_static";
  Bundle2["mangle_random"] = "mangle_random";
  Bundle2["merge"] = "merge";
  return Bundle2;
})(Bundle || {});
var Verbosity = /* @__PURE__ */ ((Verbosity2) => {
  Verbosity2["all"] = "all";
  Verbosity2["log"] = "log";
  Verbosity2["warn"] = "warn";
  Verbosity2["error"] = "error";
  Verbosity2["silent"] = "silent";
  return Verbosity2;
})(Verbosity || {});
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
function VerifyPackages(packages, sequences) {
  const errors = [];
  for (const [error, sequence] of Object.entries(sequences)) {
    let matches = 0;
    for (const packaging of packages) {
      for (const [validations, attributes] of packaging.validations) if (sequence.match(attributes)) matches++;
    }
    if (matches == 0) errors.push(error);
  }
  if (errors.length) {
    console.red(errors.join("\n"));
    process.exit();
  }
}
async function $SanitizeGlob(target) {
  if (target?.constructor === String) target = String(target).split(/\s*,\s*/g);
  if (target?.constructor === Array) return import_forge.ForgeFile.$Glob(target, { resolve: true });
}
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
      return "preserve" /* preserve */;
    case "mangle-static":
      return "mangle_static" /* mangle_static */;
    case "mangle-random":
      return "mangle_random" /* mangle_random */;
    case "merge":
      return "merge" /* merge */;
  }
}
function FormatElapsedTime(elapsed) {
  return Number(elapsed * 1e-3).toFixed(2);
}
function RenderVerifyAccessor(accessor) {
  const render = [];
  for (let i = 0; i < accessor.length; i++) {
    const access = accessor[i];
    if (i + 1 == accessor.length) {
      render.push(`{ ${access}`);
    } else {
      render.push(`{ ${access}:`);
    }
  }
  render.push(..."}".repeat(accessor.length));
  return `${render.join(" ")}`;
}
async function $VerifyFile(files, options) {
  const warnings = options?.warnings ?? [];
  const errors = options?.errors ?? [];
  const fragments = (0, import_forge.ExplodeAttributes)(files);
  for (const { accessor, value } of fragments) {
    const file = value;
    if (file === void 0) {
      errors.push(`Top level: arguments for file: <error>${RenderVerifyAccessor(accessor)}</error> is undefined`);
    } else {
      if (await import_forge.ForgeFile.$DirectoryExists(file).catch((error) => false) === true) {
        errors.push(`Top level: arguments for file: <error>${RenderVerifyAccessor(accessor)}</error> is a directory and not a valid target for "${file}"`);
      } else {
        const { dir } = import_forge.ForgePath.Parse(file);
        if (await import_forge.ForgeFile.$DirectoryExists(dir) === false) {
          errors.push(`Top level: arguments for file: <error>${RenderVerifyAccessor(accessor)}</error> is an invalid directory to write file`);
        } else if (await import_forge.ForgeFile.$DirectoryExists(dir)) {
          warnings.push(`Top level: arguments for file: <warning>${RenderVerifyAccessor(accessor)}</warning> already exists "${file}"`);
        }
      }
    }
  }
  return { warnings, errors };
}
async function $VerifyDirectoryExists(directories, options) {
  const warnings = options?.warnings ?? [];
  const errors = options?.errors ?? [];
  const fragments = (0, import_forge.ExplodeAttributes)(directories);
  for (const { accessor, value } of fragments) {
    const dir = value;
    if (dir === void 0) {
      errors.push(`Top level: arguments for <error>{ out }</error> is undefined`);
    } else if (await import_forge.ForgeFile.$DirectoryExists(dir) === false) {
      errors.push(`Top level: arguments for <error>{ out }</error> is an invalid directory "${dir}"`);
    }
  }
  return { warnings, errors };
}
var BuilderConfig = class _BuilderConfig extends Object {
  static async $From(packages) {
    const builderData = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Or({ builder: import_forge.Intersects }));
    const format = builderData.format;
    const bundled = FilterBundled(builderData.bundled);
    const platform = FilterPlatform(builderData.platform);
    const metafile = builderData.meta;
    const treeShaking = builderData["tree-shaking"];
    const ignores = await import_forge.ForgeFile.$Glob(builderData.ignores ?? []);
    const transform = {
      read: [],
      write: []
    };
    const transformArg = builderData.transform;
    if (transformArg?.write?.["obfuscate"] === true) transform.write.push("obfuscate");
    if (transformArg?.write?.["gzip"] === true) transform.write.push("gzip");
    const aliasesArgs = builderData.alias;
    const aliases = {
      files: aliasesArgs?.files ?? {},
      directories: aliasesArgs?.directories ?? {}
    };
    const externals = await $ParseExternals(String(builderData.externals).split(/\s*,\s*/));
    return new _BuilderConfig({ bundled, format, platform, metafile, treeShaking, ignores, write: "memory", externals, transform, aliases });
  }
  bundled;
  platform;
  format;
  metafile;
  externals;
  verbose;
  treeShaking;
  ignores;
  aliases;
  write;
  transform;
  constructor(options) {
    super();
    options = options ?? {};
    this.bundled = options.bundled ?? "merge" /* merge */;
    this.platform = options.platform ?? "node";
    this.format = options.format ?? "cjs";
    this.treeShaking = options.treeShaking ?? true;
    this.externals = options.externals ?? [];
    this.verbose = options.verbose ?? "all" /* all */;
    this.metafile = options.metafile === false ? false : true;
    this.ignores = options.ignores ?? [];
    this.write = options.write ?? "memory";
    this.transform = {
      read: options.transform?.read ?? [],
      write: options.transform?.write ?? []
    };
    this.aliases = {
      files: options.aliases?.files ?? {},
      directories: options.aliases?.directories ?? {}
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
  const { builtinModules } = require("node:module");
  const results = /* @__PURE__ */ new Set(["esbuild", ...builtinModules, ...builtinModules.map((submodule) => `node:${submodule}`)]);
  const externalStatement = new import_forge.ForgeSyntaxStatement();
  externalStatement.add(
    new import_forge.SequentialExpression({ json: true, keys: true, fragment: true }).add(/json/i, { literal: true }).add(".", { literal: true }).add("keys", { literal: true }).add(new import_forge.ScopeExpression("(", ")"), { mount: true }).add(":", { literal: true }).add("//", { literal: true }).add(/.+/g, { file: true })
  ).add(
    new import_forge.SequentialExpression({ json: true, values: true, fragment: true }).add(/json/i, { literal: true }).add(".", { literal: true }).add("values", { literal: true }).add(new import_forge.ScopeExpression("(", ")"), { mount: true }).add(":", { literal: true }).add("//", { literal: true }).add(/.+/g, { file: true })
  ).add(
    new import_forge.SequentialExpression({ json: true, root: true }).add(/json/i, { literal: true }).add(":", { literal: true }).add("//", { literal: true }).add(/.+/g, { file: true })
  );
  for (const entry of externals) {
    externalStatement.frame();
    const traversalParser = new import_forge.ForgeSyntaxParser(externalStatement);
    const syntaxResults = traversalParser.consume(entry);
    if (syntaxResults.success) {
      const tokens = syntaxResults.or({ json: true }).first;
      const query = new import_forge.QueryManager();
      for (const [token, attributes] of tokens) query.add(token, attributes);
      const file = query.or({ file: true }).all.join("");
      const data = (0, import_forge.DecodeAttributes)(await import_forge.ForgeIO.$Fetch(file));
      if (syntaxResults.has(import_forge.QuerySequence.And({ json: true, values: true }))) {
        const accessor = query.or({ mount: true }).slice(1, -1).join("").split(".");
        for (const value of Object.values(import_forge.Accessor.Fetch(accessor, data))) {
          if (value.constructor === String) results.add(value);
        }
      } else if (syntaxResults.has(import_forge.QuerySequence.And({ json: true, keys: true }))) {
        const accessor = query.or({ mount: true }).slice(1, -1).join("").split(".");
        for (const key of Object.keys(import_forge.Accessor.Fetch(accessor, data))) {
          if (key.constructor === String) results.add(key);
        }
      } else if (syntaxResults.has(import_forge.QuerySequence.Not({ values: true, keys: true }))) {
        if (data.constructor === Array) for (const entry2 of data) results.add(String(entry2));
      }
    } else {
      results.add(entry);
    }
  }
  return [...results];
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
  for (const externalImport of builderOptions.externals) if (externalImport.toLowerCase() == file) return true;
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
        code = (callback && callback("import-components", { statement, components, file }, code)) ?? code.replace(statement, "");
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
      code = (callback && callback("import-default", { statement, components, file }, code)) ?? code.replace(statement, "");
    }
  }
  {
    const regExp = /^import\s+["'`](?<file>.+?)["'`];\s*/;
    let results;
    while (results = regExp.exec(code)) {
      const statement = results[0];
      code = (callback && callback("import-file", { statement }, code)) ?? code.replace(statement, "");
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
        code = "\n" + ((callback && callback("export", { statement, export: exportName }, code)) ?? code.replace(results[0], statement));
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
async function $Transform({ root, contents, entry }, buildOptions, options) {
  if ((0, import_Core.GetEnviromentParams)().DRY_RUN) {
    const result2 = new import_forge.Result();
    result2.add({ elapsed: 0, size: 0 }, { stats: true, transform: true });
    result2.add({ ...buildOptions }, { options: true });
    result2.add({ code: `console.log("DRY_RUN for $Transform( ... )")` }, { code: true });
    return result2;
  }
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
  let logLevel = "silent";
  switch (verbosity) {
    default:
      logLevel = "silent";
  }
  const buildQuery = await (0, import_esbuild.build)({
    stdin: {
      contents,
      // These are all optional:
      sourcefile: entry,
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
    external: buildOptions.bundled ? await $ParseExternals(["esbuild", ...buildOptions.externals]) : void 0,
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
  result.add({ elapsed: Date.now() - startTime }, { stats: true, esbuild: true, compile: true });
  if (buildQuery === void 0) return result.reject();
  const buildResult = buildQuery;
  const inputs = buildResult.metafile.inputs;
  result.add({ inputs }, { inputs: true });
  const manifest = Object.keys(buildResult.metafile.inputs);
  result.add({ manifest }, { manifest: true });
  const { code, mapping } = await $ApplyWriteTransforms(buildResult.outputFiles[0].text, buildOptions);
  if (code) result.add({ code }, { code: true });
  if (mapping) result.add({ mapping }, { mappings: true });
  const size = CalcCodeSize(code);
  const elapsed = Date.now() - startTime;
  result.add({ elapsed, size }, { stats: true, transform: true });
  return result.resolve();
}
async function $Build(entryFile, buildOptions, options) {
  const startTime = Date.now();
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
  const plugins = options?.plugins ?? [];
  if (options?.cache !== false) plugins.push(CachePlugin);
  result.add({ ...buildOptions }, { options: true });
  result.add({ entry: entryFile }, { entry: true });
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
    external: await $ParseExternals(["esbuild", ...buildOptions.externals]),
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
  const { code, mapping } = await $ApplyWriteTransforms(buildResult.outputFiles[0].text, buildOptions);
  if (code) result.add({ code }, { code: true });
  if (mapping) result.add({ mapping }, { mapping: true });
  return result.resolve();
}
async function $Obfuscate(code, options) {
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
      stringArrayThreshold: 1,
      sourceMap: true,
      sourceMapsEnabled: true,
      sourceMapMode: "separate"
      // "inline"
    }
  );
  return { code: obfuscationResult.getObfuscatedCode(), mapping: obfuscationResult.getSourceMap() };
}
async function $ApplyWriteTransforms(code, options) {
  const writeTransforms = options.transform.write;
  let mapping;
  code = (options.platform == "node" ? "#! /usr/bin/env node\n\n" : "") + code;
  if (writeTransforms.includes("obfuscate")) {
    const { code: obfuscatedCode, mapping: obfuscatedMapping } = await $Obfuscate(code);
    code = obfuscatedCode;
    mapping = obfuscatedMapping;
  }
  if (writeTransforms.includes("gzip")) {
    const buffer = await import_forge.ForgeZip.$GZip(code);
    if (writeTransforms.includes("base64")) return { code: import_forge.Base64.Encode(buffer) };
    return { code: (0, import_forge.DecodeString)(buffer) };
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = import_forge.Base64.Encode(code);
  return { code, mapping };
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ApplyWriteTransforms,
  $Build,
  $Obfuscate,
  $ParseExternals,
  $SanitizeGlob,
  $Strip,
  $Transform,
  $UnWrapWriteTransforms,
  $VerifyDirectoryExists,
  $VerifyFile,
  BuildSocketParams,
  BuilderConfig,
  Bundle,
  CalcCodeSize,
  FilterBundled,
  FilterFormat,
  FilterPlatform,
  FormatElapsedTime,
  RenderVerifyAccessor,
  UncacheFile,
  Verbosity,
  VerifyPackages
});
