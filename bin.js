#! /usr/bin/env node



// ../Forge-Typescript-Source/src/Forge-Typescript-Source/src/ts/bin.ts
var import_forge18 = require("@onyx-ignition/forge");

// ../Forge-Typescript-Source/src/ts/bin-utils.ts
var import_forge4 = require("@onyx-ignition/forge");

// ../Forge-Typescript-Source/src/ts/build/Core.ts
var import_forge3 = require("@onyx-ignition/forge");
var import_esbuild = require("esbuild");
var import_javascript_obfuscator = require("javascript-obfuscator");

// ../Forge-Typescript-Source/src/ts/Core.ts
var import_forge = require("@onyx-ignition/forge");
function GetEnviromentParams() {
  return {
    DRY_RUN: /true/i.test(process.env.DRY_RUN),
    VERBOSITY: process.env.VERBOSITY ?? "all" /* all */
  };
}
async function $OutputCompiledCode(code, outFile) {
  if (GetEnviromentParams().DRY_RUN) {
    console.log("[DRY_RUN]", outFile, "written");
    return;
  }
  if (outFile) {
    await import_forge.ForgeFile.$Write(outFile, code, { recursive: true });
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
  if (target?.constructor === Array) return import_forge3.ForgeFile.$Glob(target, { resolve: true });
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
  const fragments = (0, import_forge3.ExplodeAttributes)(files);
  for (const { accessor, value } of fragments) {
    const file = value;
    if (file === void 0) {
      errors.push(`Top level: arguments for file: <error>${RenderVerifyAccessor(accessor)}</error> is undefined`);
    } else {
      if (await import_forge3.ForgeFile.$DirectoryExists(file).catch((error) => false) === true) {
        errors.push(`Top level: arguments for file: <error>${RenderVerifyAccessor(accessor)}</error> is a directory and not a valid target for "${file}"`);
      } else {
        const { dir } = import_forge3.ForgePath.Parse(file);
        if (await import_forge3.ForgeFile.$DirectoryExists(dir) === false) {
          errors.push(`Top level: arguments for file: <error>${RenderVerifyAccessor(accessor)}</error> is an invalid directory to write file`);
        } else if (await import_forge3.ForgeFile.$DirectoryExists(dir)) {
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
  const fragments = (0, import_forge3.ExplodeAttributes)(directories);
  for (const { accessor, value } of fragments) {
    const dir = value;
    if (dir === void 0) {
      errors.push(`Top level: arguments for <error>{ out }</error> is undefined`);
    } else if (await import_forge3.ForgeFile.$DirectoryExists(dir) === false) {
      errors.push(`Top level: arguments for <error>{ out }</error> is an invalid directory "${dir}"`);
    }
  }
  return { warnings, errors };
}
var BuilderConfig = class _BuilderConfig extends Object {
  static async $From(packages) {
    const builderData = (0, import_forge3.MergePackages)(packages, import_forge3.QuerySequence.Or({ builder: import_forge3.Intersects }));
    const format = builderData.format;
    const bundled = FilterBundled(builderData.bundled);
    const platform = FilterPlatform(builderData.platform);
    const metafile = builderData.meta;
    const treeShaking = builderData["tree-shaking"];
    const ignores = await import_forge3.ForgeFile.$Glob(builderData.ignores ?? []);
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
  const { builtinModules } = require("node:module");
  const results = /* @__PURE__ */ new Set(["esbuild", ...builtinModules, ...builtinModules.map((submodule) => `node:${submodule}`)]);
  const externalStatement = new import_forge3.ForgeSyntaxStatement();
  externalStatement.add(
    new import_forge3.SequentialExpression({ json: true, keys: true, fragment: true }).add(/json/i, { literal: true }).add(".", { literal: true }).add("keys", { literal: true }).add(new import_forge3.ScopeExpression("(", ")"), { mount: true }).add(":", { literal: true }).add("//", { literal: true }).add(/.+/g, { file: true })
  ).add(
    new import_forge3.SequentialExpression({ json: true, values: true, fragment: true }).add(/json/i, { literal: true }).add(".", { literal: true }).add("values", { literal: true }).add(new import_forge3.ScopeExpression("(", ")"), { mount: true }).add(":", { literal: true }).add("//", { literal: true }).add(/.+/g, { file: true })
  ).add(
    new import_forge3.SequentialExpression({ json: true, root: true }).add(/json/i, { literal: true }).add(":", { literal: true }).add("//", { literal: true }).add(/.+/g, { file: true })
  );
  for (const entry of externals) {
    externalStatement.frame();
    const traversalParser = new import_forge3.ForgeSyntaxParser(externalStatement);
    const syntaxResults = traversalParser.consume(entry);
    if (syntaxResults.success) {
      const tokens = syntaxResults.or({ json: true }).first;
      const query = new import_forge3.QueryManager();
      for (const [token, attributes] of tokens) query.add(token, attributes);
      const file = query.or({ file: true }).all.join("");
      const data = (0, import_forge3.DecodeAttributes)(await import_forge3.ForgeIO.$Fetch(file));
      if (syntaxResults.has(import_forge3.QuerySequence.And({ json: true, values: true }))) {
        const accessor = query.or({ mount: true }).slice(1, -1).join("").split(".");
        for (const value of Object.values(import_forge3.Accessor.Fetch(accessor, data))) {
          if (value.constructor === String) results.add(value);
        }
      } else if (syntaxResults.has(import_forge3.QuerySequence.And({ json: true, keys: true }))) {
        const accessor = query.or({ mount: true }).slice(1, -1).join("").split(".");
        for (const key of Object.keys(import_forge3.Accessor.Fetch(accessor, data))) {
          if (key.constructor === String) results.add(key);
        }
      } else if (syntaxResults.has(import_forge3.QuerySequence.Not({ values: true, keys: true }))) {
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
  FileCache.Uncache(file);
}
async function $Transform({ root, contents, entry }, buildOptions, options) {
  if (GetEnviromentParams().DRY_RUN) {
    const result2 = new import_forge3.Result();
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
      const ignores = buildOptions.ignores.map((file) => import_forge3.ForgePath.Resolve(file));
      return;
      build.onResolve({ filter: /./ }, async function(args) {
        const { path, resolveDir } = args;
        for (const ext of [".ts", ".tsx", ".jsx", ".js", ".mjs"]) {
          const absolutePath = import_forge3.ForgePath.Resolve(resolveDir, `${path}${ext}`);
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
  const result = new import_forge3.Result();
  const stats = await import_forge3.ForgeFile.$Stat(entryFile).catch((error) => void 0);
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
    const buffer = await import_forge3.ForgeZip.$GZip(code);
    if (writeTransforms.includes("base64")) return { code: import_forge3.Base64.Encode(buffer) };
    return { code: (0, import_forge3.DecodeString)(buffer) };
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = import_forge3.Base64.Encode(code);
  return { code, mapping };
}

// ../Forge-Typescript-Source/src/ts/bin-utils.ts
async function $FetchArguments() {
  const compositeArguemnts = new import_forge4.ArgumentPackage();
  const cliArguments = new import_forge4.CLIArgumentPackage();
  cliArguments.add({
    forge: {
      verbose: "all" /* all */
    }
  }, { forge: true });
  cliArguments.parse(process.argv);
  const stdinPackage = new import_forge4.StdinArgumentPackage().add({ builder: new BuilderConfig() }, { builder: true });
  await stdinPackage.$parse().catch((error) => console.yellow("StdinArgumentPackage.parse( ... ) race failure caught"));
  compositeArguemnts.before(stdinPackage);
  compositeArguemnts.after(cliArguments);
  await compositeArguemnts.$validate({
    async $flush(query, validations) {
      const { forge: { copy, files } } = (0, import_forge4.MergeAttributes)(await Promise.all(query.or({ forge: import_forge4.Intersects }).all));
      const errorAttributes = { ...import_forge4.ArgumentValidationErrorAttributes, forge: true };
      console.log((0, import_forge4.MergeAttributes)(await Promise.all(query.or({ forge: import_forge4.Intersects }).all)));
      if (files) {
        console.yellow("has files", files);
      }
      if (copy) {
        if (Array.isArray(copy) === false) {
          validations.add(
            new import_forge4.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy } }</error> is not an array of { source, targets }`, { cause: copy }),
            { forge: { copy }, ...errorAttributes }
          );
        } else {
          for (const cause of copy) {
            const { source, targets } = cause;
            if (source === void 0) {
              validations.add(
                new import_forge4.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { source } } }</error> is undefined`, { cause }),
                { forge: { copy: { source: true } }, ...errorAttributes }
              );
            } else {
              const results = await import_forge4.ForgeFile.$GlobExist([source]);
              if (results.success === false) {
                validations.add(
                  new import_forge4.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { source } } }</error> is not a valid source:
	${source}`, { cause }),
                  { forge: { copy: { source: true } }, ...errorAttributes }
                );
              }
            }
            if (targets === void 0) {
              validations.add(
                new import_forge4.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is undefined`, { cause }),
                { forge: { copy: { targets: true } }, ...errorAttributes }
              );
            } else if (Array.isArray(targets) === false) {
              validations.add(
                new import_forge4.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is not an array of file targets`, { cause }),
                { forge: { copy: { targets: true } }, ...errorAttributes }
              );
            } else {
              const results = await import_forge4.ForgeFile.$GlobExist([source]);
              if (results.success === false) {
                const invalidTargets = [];
                for (const [target, attributes] of results) invalidTargets.push(target);
                validations.add(
                  new import_forge4.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is has the follwoing invalid targets:
	${invalidTargets.join("\n	")}`, { cause }),
                  { forge: { copy: { targets: true } }, ...errorAttributes }
                );
              }
            }
          }
        }
      }
    }
  });
  return compositeArguemnts.$sanitize({
    async $sanitize(packageComponent, attributes) {
      const component = await packageComponent;
      if (component.app) {
        const { files } = component.app;
        if (files) component.app.files = await $SanitizeGlob(files);
      }
      return component;
    }
  });
}
function ProcessWarnignsAndErrors({ args, warnings, errors }) {
  const collectedSuccesses = /* @__PURE__ */ new Set();
  const collectedWarnings = /* @__PURE__ */ new Set();
  const collectedErrors = /* @__PURE__ */ new Set();
  function FormatText(text) {
    return text.replace(/<error>/g, "<red>").replace(/<\/error>/g, "</red>").replace(/<warning>/g, "<yellow>").replace(/<\/warning>/g, "</yellow>");
  }
  if (warnings && warnings.length) for (const warning of warnings) collectedWarnings.add(warning);
  if (errors && errors.length) for (const error of errors) collectedErrors.add(error);
  if (args) {
    for (const overload of args) {
      if (overload instanceof import_forge4.ArgumentPackage) {
        const { successes, warnings: warnings2, errors: errors2 } = overload.validations;
        if (successes.length) for (const success of successes) collectedSuccesses.add(success.message);
        if (warnings2.length) for (const warning of warnings2) collectedWarnings.add(warning.message);
        if (errors2.length) for (const error of errors2) collectedErrors.add(error.message);
      } else if (overload instanceof import_forge4.ArgumentValues) {
      } else {
        console.red("WRONG ARGUMENT");
        process.exit();
      }
    }
  }
  if (collectedSuccesses.size) {
    console.green("Successes:");
    for (const success of collectedSuccesses) console.parse(`	<cyan>${FormatText(success)}`);
  }
  if (collectedWarnings.size) {
    console.yellow("Warnings:");
    for (const warnings2 of collectedWarnings) console.parse(`	<cyan>${FormatText(warnings2)}`);
  }
  if (collectedErrors.size) {
    console.red("Errors:");
    for (const error of collectedErrors) console.parse(`	<cyan>${FormatText(error)}`);
    console.red("\nAborting build!!!");
    process.exit();
  }
}

// ../Forge-Typescript-Source/src/ts/build/BuildClient.ts
var import_forge7 = require("@onyx-ignition/forge");
var import_promises = require("node:fs/promises");

// ../Forge-Typescript-Source/src/ts/build/library/LibraryBuilder.ts
var import_forge5 = require("@onyx-ignition/forge");
var import_crypto = require("crypto");
function ExportPlugin(files, hashes, resolves) {
  const errors = [];
  return {
    name: "forge-export-library",
    setup: function(build) {
      build.onResolve({ filter: /.+/ }, async function(args) {
        let { path, resolveDir, importer } = args;
        if (resolves.directories) {
          for (const [match, replace] of Object.entries(resolves.directories)) {
            if (path.startsWith(match)) path = path.replace(match, import_forge5.ForgePath.Resolve(replace) + "/");
          }
        }
        for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
          const absolutePath = import_forge5.ForgePath.Resolve(resolveDir, `${path}${ext}`);
          const relativePath = import_forge5.ForgePath.Relative(resolveDir, absolutePath);
          if (await import_forge5.ForgeFile.$FileExist(absolutePath)) {
            if (resolves.files[absolutePath]) {
              return { path: resolves.files[absolutePath], external: true };
            } else if (files.includes(absolutePath)) {
              try {
                const importhashedImportPath = hashes.get(importer)?.path;
                if (importhashedImportPath === void 0) {
                  return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
                } else {
                  const path2 = import_forge5.ForgePath.Relative(import_forge5.ForgePath.Parse(importhashedImportPath).dir, hashes.get(absolutePath).path);
                  return { path: path2, external: true, namespace: "remapped" };
                }
              } catch (error) {
                console.green(importer);
                console.red(error.message);
                return;
              }
              const importParsed = import_forge5.ForgePath.Parse(importer);
              if (importParsed.name == "{index}")
                console.log("importer", hashes.get(importer)?.path ?? args);
              console.log("current", hashes.get(absolutePath).path);
              console.log("---");
              return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
              return { namespace: "ignore" };
            }
            console.red(`Unresolved file found`, absolutePath, resolves, files);
            errors.push(`Unresolved file found: ${absolutePath}`);
          }
        }
        return { path, external: true };
      });
      build.onLoad({ filter: /\.((ts|x$)|(js|x))/ }, async function(args) {
        console.magenta("onload", args);
        const { path } = args;
        const contents = hashes.has(path) ? hashes.get(path).contents : await FileCache.$FetchString(path);
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
  _sanitizeSources({ root, files }, builderOptions2) {
    const { aliases, ignores } = builderOptions2;
    const sanitizedResolves = {};
    for (const [file, resolve] of Object.entries(aliases.files)) {
      const path = import_forge5.ForgePath.IsAbsolute(file) ? file : import_forge5.ForgePath.Resolve(root, file);
      sanitizedResolves[path] = resolve;
    }
    files = files.filter((file) => ignores.includes(file) === false).map((file) => import_forge5.ForgePath.Resolve(file));
    return [{
      root,
      files
    }, {
      files: sanitizedResolves,
      directories: aliases.directories
    }];
  }
  async _$extractImportations(file, root, vanillaJS) {
    const parsedPath = import_forge5.ForgePath.Parse(file);
    const name = parsedPath.name;
    const code = await FileCache.$FetchString(file);
    const importations = /* @__PURE__ */ new Set();
    const skippedImportations = [];
    const regExp = vanillaJS === true ? /(^|\n)\s*export\s+(default)?((async function)|function|class|var|const|let)\s+(?<component>[$\w]+)/gm : /(^|\n)\s*export\s+(default)?((async function)|function|class|enum|interface|var|const|let|type)\s+(?<component>[$\w]+)/gm;
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
    importEntry += `import { ${[...importations].join(", ")} } from "${import_forge5.ForgePath.Relative(root, parsedPath.dir)}/${name}";`.replace(/\\/g, "/").replace(".//", "./");
    if (skippedImportations.length) importEntry += ` // skipped imports :{ ${skippedImportations.join(", ")} }`;
    return importEntry;
  }
  // public async $merge(sources: LibrarySources, alias: ForgeBuilderAliases, basic?: boolean): Promise<string> {
  async $merge(packages) {
    VerifyPackages(packages, {
      "Library packaging validation failed": import_forge5.QuerySequence.And({ validate: true, library: true }),
      "Library packaging sanitation failed": import_forge5.QuerySequence.And({ sanitize: true, library: true })
    });
    const forgeOptions = (0, import_forge5.MergePackages)(packages, import_forge5.QuerySequence.Traverse({ forge: true }));
    const { sources: { files, root }, vanilla_js } = forgeOptions;
    const importations = [];
    for (const file of files) importations.push(await this._$extractImportations(file, root, false));
    return `${importations.join("\n")};
        
export {

${[...this._exportedComponents].map((value) => "	" + value.replace(/[^\w$]+/g, "_")).join(",\n")} 
            
};`;
  }
  async $bundle(packages) {
    VerifyPackages(packages, {
      "Library packaging validation failed": import_forge5.QuerySequence.And({ validate: true, library: true }),
      "Library packaging sanitation failed": import_forge5.QuerySequence.And({ sanitize: true, library: true })
    });
    const forgeOptions = (0, import_forge5.MergePackages)(packages, import_forge5.QuerySequence.Traverse({ forge: true }));
    const builderOptions2 = (0, import_forge5.MergePackages)(packages, import_forge5.QuerySequence.Traverse({ builder: true }));
    const { sources } = forgeOptions;
    const [{ files, root }, aliases] = this._sanitizeSources(sources, builderOptions2);
    const contents = await this.$merge(packages);
    const result = await $Transform({ root, contents }, builderOptions2, {
      plugins: [{
        name: "forge-library-bundle",
        setup(build) {
          build.onResolve({ filter: /.+/ }, async function(args) {
            const { path, resolveDir } = args;
            for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
              const absolutePath = import_forge5.ForgePath.Resolve(resolveDir, `${path}${ext}`);
              if (aliases[absolutePath]) return { path: aliases[absolutePath], external: true };
              if (files.includes(absolutePath) === false) return { path, external: true };
              if (await import_forge5.ForgeFile.$FileExist(absolutePath)) return { path: absolutePath, external: false };
            }
            return { path, external: true };
          });
        }
      }]
    });
    return result.or({ code: true }).first.code;
  }
  // public async $export(sources: LibrarySources, buildOptions: ForgeBuilderOptions, libraryExport: { lib: string, ext: string, index: string }): Promise<IResult<Attributes>> {
  async $export(packages) {
    const exportResults = new import_forge5.Result();
    try {
      VerifyPackages(packages, {
        "Library packaging validation failed": import_forge5.QuerySequence.And({ validate: true, library: true }),
        "Library packaging sanitation failed": import_forge5.QuerySequence.And({ sanitize: true, library: true })
      });
      const validations = (0, import_forge5.MergeValidations)(packages);
      const forgeOptions = (0, import_forge5.MergePackages)(packages, import_forge5.QuerySequence.Traverse({ forge: true }));
      const builderOptions2 = (0, import_forge5.MergePackages)(packages, import_forge5.QuerySequence.Traverse({ builder: true }));
      const { sources, lib, ext, index } = forgeOptions;
      let [{ files, root }, aliases] = this._sanitizeSources(sources, builderOptions2);
      files = files.filter((file) => builderOptions2.ignores.includes(file) === false);
      const hashes = /* @__PURE__ */ new Map();
      const { bundled } = builderOptions2;
      for (const file of files) {
        let path;
        if (bundled == "preserve" /* preserve */) {
          const parsedFile = import_forge5.ForgePath.Parse(file);
          path = import_forge5.ForgePath.Join(lib, import_forge5.ForgePath.Relative(root, import_forge5.ForgePath.Join(parsedFile.dir, parsedFile.name))) + ext;
        } else if (bundled == "mangle_static" /* mangle_static */) {
          const hash = (0, import_crypto.createHash)("md5").update(String(hashes.size) + import_forge5.ForgePath.Join(root, lib, index)).digest("hex");
          path = import_forge5.ForgePath.Join(lib, hash) + ext;
        } else if (bundled == "mangle_random" /* mangle_random */) {
          path = import_forge5.ForgePath.Join(lib, (0, import_forge5.QuickHash)()) + ext;
        } else {
          throw new Error(`incompable Bunbled: "${bundled}"`);
        }
        hashes.set(file, { path, contents: await FileCache.$FetchString(file) });
      }
      const mergePackage = new import_forge5.ArgumentPackage({ validations });
      mergePackage.add({ sources: { files, root } }, { forge: true });
      mergePackage.add({ ...builderOptions2 }, { builder: true });
      const contents = await this.$merge([mergePackage]);
      const plugins = builderOptions2.bundled == "preserve" /* preserve */ || builderOptions2.bundled == "mangle_static" /* mangle_static */ || builderOptions2.bundled == "mangle_random" /* mangle_random */ ? [ExportPlugin(files, hashes, aliases)] : [];
      const transformResult = await $Transform({ root, contents, entry: index }, builderOptions2, { plugins });
      if (transformResult.success === false) return transformResult;
      const { code } = transformResult.or({ code: true }).first;
      exportResults.add({ code, path: index }, { code: true, index: true });
      for (const file of files) {
        if (builderOptions2.ignores.includes(file)) {
          console.red("ignore found", file);
          continue;
        }
        const { contents: contents2, path } = hashes.get(file);
        const fileParsed = import_forge5.ForgePath.Parse(file);
        const transformResult2 = await $Transform({ root: fileParsed.dir, contents: contents2, entry: file }, builderOptions2, { plugins });
        if (transformResult2.success === false) {
          const errors = [];
          for (const [component, attributes] of transformResult2.or({ error: true })) errors.push(`<red>Error[X]</red>

    ${component.error}

        <cyan>${file}:${component.row}:${component.column}:
    `);
          throw new Error(errors.join("\n\n"));
        }
        const { code: code2 } = transformResult2.or({ code: true }).first;
        exportResults.add({ code: code2, path }, { code: true, dependency: true });
      }
      exportResults.resolve();
    } catch (error) {
      console.red(error);
      exportResults.reject();
    }
    return exportResults;
  }
};

// ../Forge-Typescript-Source/src/ts/build/types/TypesBuilder.ts
var import_forge6 = require("@onyx-ignition/forge");
var import_typescript = require("typescript");
async function $BuildTypes(packages) {
  VerifyPackages(packages, {
    "Types packaging validation failed": import_forge6.QuerySequence.And({ validate: true, types: true }),
    "Types packaging sanitation failed": import_forge6.QuerySequence.And({ sanitize: true, types: true })
  });
  const forgeOptions = (0, import_forge6.MergePackages)(packages, import_forge6.QuerySequence.Traverse({ forge: true }));
  const builderOptions2 = (0, import_forge6.MergePackages)(packages, import_forge6.QuerySequence.Traverse({ builder: true }));
  let { files, name, out } = forgeOptions;
  const { ignores } = builderOptions2;
  files = files.filter((value) => ignores.includes(value));
  const startTime = Date.now();
  const result = new import_forge6.Result();
  if (GetEnviromentParams().DRY_RUN) {
    return result.add({ code: `console.log("DRY RUN $BuildTypes( ... )")`, path: "./index.d.ts" }, { code: true, types: true }).add({ elapsed: 0, size: 0 }, { stats: true, types: true }).resolve();
  }
  try {
    const compilerOptions = {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true
    };
    const createdFiles = {};
    const host = (0, import_typescript.createCompilerHost)(compilerOptions);
    host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
    const program = (0, import_typescript.createProgram)(files, compilerOptions, host);
    program.emit();
    const codeSegments = ["\n", `// @ts-nocheck

declare module "${name}" {
`];
    if (builderOptions2.bundled === "merge" /* merge */ || true) {
      for (const [filename, contents] of Object.entries(createdFiles)) {
        const code2 = contents.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
        codeSegments.push(code2);
      }
      codeSegments.push("\n}");
      const { code } = await $ApplyWriteTransforms(codeSegments.join("\n"), { transform: { write: [] } });
      result.add({ code, path: out }, { code: true });
      const size = CalcCodeSize(code);
      const elapsed = Date.now() - startTime;
      result.add({ elapsed, size }, { stats: true, types: true });
    } else if (builderOptions2.bundled == "preserve" /* preserve */) {
      throw new Error(`not yet implemented bundled == "preserve"`);
    } else {
    }
    return result.resolve();
  } catch (error) {
    console.red(error);
    result.add({ error }, { error: true });
    return result.reject();
  }
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
var BuildClient = class extends import_forge7.ForgeClient {
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
      ...await import_forge7.ForgeFile.$Walk(import_forge7.ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
      ...await import_forge7.ForgeFile.$Walk(import_forge7.ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
    ];
    const promises = [];
    for (const file of files) {
      promises.push((0, import_promises.rm)(file, { recursive: true, force: true }));
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
    const hash = (0, import_forge7.QuickHash)();
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
    const files = source ? source.files : await import_forge7.ForgeFile.$Walk(source.walk);
    const aliases = build.aliases;
    const library = new LibraryBuilder();
    if (build.bundled == "mangle_static" /* mangle_static */ || build.bundled == "mangle_random" /* mangle_random */ || build.bundled == "preserve" /* preserve */) {
      return SerializeResult(await library.$export({ files, root }, new BuilderConfig(build), { lib: "./lib/", ext: ".js" }));
    } else if (build.bundled == "merge" /* merge */) {
      const code2 = await library.$bundle({ files, root }, new BuilderConfig(build));
      return {
        success: true,
        result: [{ code: code2 }, { code: true, source: true }]
      };
    }
    const code = await library.$merge({ root, files }, aliases);
    return {
      success: true,
      result: [{ code }, { code: true, source: true }]
    };
  }
  async $listen(port, key) {
    if (this._server) return this._server;
    if (isNaN(port) === true) throw new Error(`Port not supplied to Socket Server`);
    this._server = new import_forge7.ForgeWebSocketServer(port, key);
    this._server[import_forge7.Reactivity].subscribe(async function([socket, header, data]) {
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
    return SerializeResult(await $BuildTypes(entry, name, build));
  }
};

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackage.ts
var import_forge10 = require("@onyx-ignition/forge");

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackageSanitize.ts
var import_forge8 = require("@onyx-ignition/forge");
var BuilderPackageSanitize = class extends import_forge8.AsyncArgumentPackageSanitize {
  constructor(options) {
    options = options ?? {
      default: {
        component: {},
        attributes: { builder: true }
      }
    };
    options.default.component = new BuilderConfig(options.default?.component);
    super(options);
  }
  async $sanitize(component, attributes) {
    component = component instanceof Promise ? await component : component;
    for (const [key, value] of Object.entries(component)) {
      switch (key) {
        case "ignores":
          component.ignores = await $SanitizeGlob(value);
          break;
        case "externals":
          switch (value?.constructor) {
            case String:
              component.externals = await $ParseExternals(String(value).split(/\s*,\s*/));
              break;
            case Array:
              component.externals = await $ParseExternals(value);
              break;
          }
          break;
        case "transform":
          const { read, write } = component.transform;
          break;
      }
    }
    return component;
  }
};

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackageValidate.ts
var import_forge9 = require("@onyx-ignition/forge");
var BuilderPackageValidate = class extends import_forge9.AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    const builderParams = (0, import_forge9.MergeAttributes)(await Promise.all(query.or({ builder: import_forge9.Intersects }).all));
    let { format, platform, bundled, ignores, transform } = builderParams;
    const errorAttributes = { ...import_forge9.ArgumentValidationErrorAttributes, builder: true };
    const warningAttributes = { ...import_forge9.ArgumentValidationWarningAttributes, builder: true };
    const cause = builderParams;
    if (format) {
      validations.add(
        new import_forge9.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is optional and will default to <blue>cjs`, { cause }),
        { format: true, ...warningAttributes }
      );
    } else {
      format = String(format).toLowerCase();
      if (["cjs", "esm", "iife"].includes(format) === false) validations.add(
        new import_forge9.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is an invalid value. Should be <blue>cjs | esm | iife`, { cause }),
        { format: true, ...errorAttributes }
      );
    }
    if (platform) {
      validations.add(
        new import_forge9.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ platform }</warning> is optional and will default to <blue>neutral`, { cause }),
        { platform: true, ...warningAttributes }
      );
    } else {
      platform = String(platform).toLowerCase();
      if (["node", "neutral", "browser"].includes(platform) === false) validations.add(
        new import_forge9.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is an invalid value. Should be <blue>node | neutral | browser`, { cause }),
        { platform: true, ...errorAttributes }
      );
    }
    if (bundled) {
      validations.add(
        new import_forge9.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ bundled }</warning> is optional and will default to <blue>mangle-static`, { cause }),
        { bundled: true, ...warningAttributes }
      );
    } else {
      bundled = String(bundled).toLowerCase();
      if (["preserve", "mangle-static", "mangle-random", "merge"].includes(bundled) === false) validations.add(
        new import_forge9.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <error>{ bundled }</warning> is an invalid value. Should be <blue> preserve | mangle-static | mangle-random | merge`, { cause }),
        { bundled: true, ...errorAttributes }
      );
    }
    if (ignores) {
      switch (ignores.constructor) {
        case String:
          ignores = ignores.split(/\s*,\s*/g);
        // fall thorugh
        case Array:
          const results = await import_forge9.ForgeFile.$GlobExist(ignores);
          if (results.success === false) {
            const warnings = [];
            for (const [warning, attributes] of results) warnings.push(warning);
            validations.add(
              new import_forge9.ArgumentValidationWarning(
                `[${this.constructor.name}] arguments for <warning>{ ignores }</warning> has the following invalid targets:
		<magenta>${warnings.join("\n		")}`,
                { cause: warnings }
              ),
              { ignores: true, ...warningAttributes }
            );
          }
          break;
      }
    }
    if (transform) {
      if (Array.isArray(transform.write)) {
      }
      if (Array.isArray(transform.read)) {
      }
    }
    if (validations.errors.length === 0) validations.add(
      new import_forge9.ArgumentValidationSuccess(`${this.constructor.name}] Package validated for builder`),
      { builder: true, validate: true }
    );
  }
};

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackage.ts
var BuilderPackage = class _BuilderPackage extends import_forge10.ArgumentPackage {
  /**
   * Return an instance that has been merged from a { builder } mount, then validated and sanitized
   * @param packages
   * @returns {BuilderPackage}
   */
  static async $From(packages) {
    const builder = (0, import_forge10.MergePackages)(packages, import_forge10.QuerySequence.Traverse({ builder: true }));
    const packaging = new _BuilderPackage();
    packaging.add(builder, { builder: true });
    await packaging.$validate(new BuilderPackageValidate());
    return packaging.$sanitize(new BuilderPackageSanitize());
  }
  async $validate(validator) {
    return super.$validate(validator ?? new BuilderPackageValidate());
  }
  async $sanitize(sanitizer) {
    return super.$sanitize(sanitizer ?? new BuilderPackageSanitize());
  }
};

// ../Forge-Typescript-Source/src/ts/build/library/LibraryPackageSanitize.ts
var import_forge11 = require("@onyx-ignition/forge");
var LibraryPackageSanitize = class extends import_forge11.AsyncArgumentPackageSanitize {
  _source = {};
  constructor() {
    super({
      default: {
        component: {
          lib: "./lib",
          ext: ".js"
        },
        attributes: { library: true, forge: true }
      }
    });
  }
  async $sanitize(component, attributes) {
    if (component instanceof Promise) component = await component;
    for (const [name, value] of Object.entries(component)) {
      switch (name) {
        case "files":
          component.files = await $SanitizeGlob(value);
          break;
      }
    }
    return component;
  }
  async $flush(query) {
    const forgeParams = (0, import_forge11.MergeAttributes)(await Promise.all(query.or({ forge: import_forge11.Intersects }).all));
    const { root, files } = forgeParams;
    query.add({ sources: { root, files } }, { forge: { sources: { root, files } } });
  }
  validate(packaging) {
    super.validate(packaging);
    if (packaging.validations.errors.length == 0) packaging.validations.add(new import_forge11.ArgumentValidationSuccess(`Package sanitized for Library`), { library: true, sanitize: true });
  }
};

// ../Forge-Typescript-Source/src/ts/build/library/LibraryPackageValidate.ts
var import_forge12 = require("@onyx-ignition/forge");
var LibraryPackageValidate = class extends import_forge12.AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    const forgeParams = (0, import_forge12.MergeAttributes)(await Promise.all(query.or({ forge: import_forge12.Intersects }).all));
    const { sources, files, root, lib, ext, index } = forgeParams;
    const cause = forgeParams;
    const errorAttributes = { ...import_forge12.ArgumentValidationErrorAttributes, library: true };
    const warningAttributes = { ...import_forge12.ArgumentValidationWarningAttributes, library: true };
    if (sources) {
      if (sources.files === void 0) validations.add(
        new import_forge12.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ source: { files } }</error> is undefined`, { cause }),
        { files: true, ...errorAttributes }
      );
      if (sources.root === void 0) validations.add(
        new import_forge12.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ source: { root } }</error> is is undefined`, { cause }),
        { root: true, ...errorAttributes }
      );
    } else {
      if (files === void 0) validations.add(
        new import_forge12.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ files }</error> is undefined`, { cause }),
        { files: true, ...errorAttributes }
      );
      if (root === void 0) validations.add(
        new import_forge12.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ root }</error> is is undefined`, { cause }),
        { root: true, ...errorAttributes }
      );
    }
    if (index === void 0) validations.add(
      new import_forge12.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ index }</error> is is undefined`, { cause }),
      { index: true, ...errorAttributes }
    );
    if (lib === void 0) validations.add(
      new import_forge12.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ lib }</warning> is optional and will default to <blue>"./lib/"`, { cause }),
      { lib: true, ...warningAttributes }
    );
    if (ext === void 0) validations.add(
      new import_forge12.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext }</warning> is optional and will default to = <blue>".js"`, { cause }),
      { ext: true, ...warningAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new import_forge12.ArgumentValidationSuccess(`[${this.constructor.name}] package validated for Library`),
      { library: true, validate: true }
    );
  }
};

// ../Forge-Typescript-Source/src/ts/build/npm/NPMBuilder.ts
var import_forge13 = require("@onyx-ignition/forge");
async function $BuildNPM(packages) {
  VerifyPackages(packages, {
    "NPM packaging validation failed": import_forge13.QuerySequence.And({ validate: true, npm: true }),
    "NPM packaging sanitation failed": import_forge13.QuerySequence.And({ sanitize: true, npm: true })
  });
  const validations = (0, import_forge13.MergeValidations)(packages);
  const forgeOptions = (0, import_forge13.MergePackages)(packages, import_forge13.QuerySequence.Traverse({ forge: true }));
  const builderOptions2 = (0, import_forge13.MergePackages)(packages, import_forge13.QuerySequence.Traverse({ builder: true }));
  const results = new import_forge13.Result();
  const totalTime = Date.now();
  const manifest = [];
  {
    if (process.env.verbose == "all" /* all */) console.blue(`starting index.d.ts >>>`);
    const { files, name } = forgeOptions;
    const typesPackage = new import_forge13.ArgumentPackage({ validations });
    typesPackage.add({ ...builderOptions2, bundled: "merge" /* merge */ }, { builder: true });
    typesPackage.add({ files, name, out: "./index.d.ts" }, { forge: true });
    const typesResult = await $BuildTypes([typesPackage]);
    if (typesResult.success === false) return results.merge(typesResult).reject();
    const { code, path } = typesResult.or({ code: true }).first;
    results.add({ code, path }, { code: true, types: true });
    manifest.push("./index.d.ts");
    const stats = typesResult.or({ stats: true }).first;
    results.add(stats, { stats: true, types: true, npm: true });
    console.blue(`index.d.ts compiled in: ${FormatElapsedTime(stats.elapsed)} s`);
  }
  {
    const startTime = Date.now();
    const { files, root, lib, ext } = forgeOptions;
    const formats = [["cjs", "./index.js", ext.cjs], ["esm", "./index.mjs", ext.esm]];
    const bundled = builderOptions2.bundled;
    for (const [format, index, ext2] of formats) {
      const library = new LibraryBuilder();
      if (bundled == "mangle_static" /* mangle_static */ || bundled == "mangle_random" /* mangle_random */ || bundled == "preserve" /* preserve */) {
        const libraryExportPackage = new import_forge13.ArgumentPackage({ validations });
        libraryExportPackage.add({
          sources: {
            files,
            root
          },
          formats,
          files,
          root,
          lib,
          ext: ext2,
          index
        }, { forge: true });
        libraryExportPackage.add({ ...builderOptions2, format, bundled }, { builder: true });
        libraryExportPackage.validations = (0, import_forge13.MergeValidations)(packages);
        const libraryResults = await library.$export([libraryExportPackage]).catch(function(error) {
          console.parse("-".repeat(20), "\n" + error.message, "\n" + "-".repeat(20));
          process.exit();
        });
        if (libraryResults.success === false) return results.merge(libraryResults).reject();
        for (const [component, attributes] of libraryResults.or({ code: true })) {
          let { code, path } = component;
          manifest.push(path);
          const size = CalcCodeSize(code);
          const elapsed2 = startTime - Date.now();
          if (attributes.index === true) {
            results.add({ code, path }, { code: true, library: true, index: true, format });
            results.add({ elapsed: elapsed2, size }, { stats: true, library: true, index: true, format });
          } else {
            results.add({ code, path }, { code: true, library: true, dependency: true, format });
            results.add({ elapsed: elapsed2, size }, { stats: true, library: true, dependency: true, format });
          }
        }
      } else if (builderOptions2.bundled == "merge" /* merge */) {
        const code = await library.$bundle(packages);
        results.add({ code, path: index }, { code: true, library: true, index: true, format });
        manifest.push(index);
      } else {
        throw new Error(`Invalid bundle option: ${builderOptions2.bundled}`);
      }
    }
    const elapsed = Date.now() - startTime;
    results.add({ elapsed }, { stats: true, library: true, npm: true });
    results.add({ manifest }, { manifest: true });
    console.blue(`library compiled in: ${FormatElapsedTime(elapsed)}s`);
  }
  if (forgeOptions.bin) {
    builderOptions2.format = "cjs";
    builderOptions2.platform = "node";
    const npxResults = await $Transform(forgeOptions.bin, builderOptions2);
    if (npxResults.success === false) return results.merge(npxResults).reject();
    let { code } = npxResults.or({ code: true }).first;
    results.add({ code, path: "./bin.js" }, { code: true, npx: true });
    const stats = npxResults.or({ stats: true }).first;
    results.add(stats, { stats: true, npx: true, npm: true });
    console.blue("bin.js compiled in:", FormatElapsedTime(stats.elapsed), "s");
  }
  console.blue("NPM package compiled in", FormatElapsedTime(Date.now() - totalTime), "s");
  return results;
}

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageSanitize.ts
var import_forge15 = require("@onyx-ignition/forge");

// ../Forge-Typescript-Source/src/ts/build/types/TypesPackageSanitize.ts
var import_forge14 = require("@onyx-ignition/forge");
var TypesPackageSanitize = class extends import_forge14.AsyncArgumentPackageSanitize {
  async $sanitize(component, attributes) {
    await super.$sanitize(component, attributes);
    if (component instanceof Promise) component = await component;
    for (const [name, value] of Object.entries(component)) {
      switch (name) {
        case "files":
          component.files = await $SanitizeGlob(value);
          break;
      }
    }
    return component;
  }
  validate(packaging) {
    super.validate(packaging);
    if (packaging.validations.errors.length == 0) packaging.validations.add(new import_forge14.ArgumentValidationSuccess(`Package sanitized for Types`), { types: true, sanitize: true });
  }
};

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageSanitize.ts
var PackageSanitizeNPM = class extends import_forge15.AsyncArgumentPackageSanitize {
  constructor() {
    super({
      default: {
        component: {
          lib: "./lib",
          ext: {
            cjs: ".js",
            esm: ".mjs"
          },
          package_json: false
        },
        attributes: { npm: true, forge: true }
      },
      sanitizers: [
        new TypesPackageSanitize(),
        new LibraryPackageSanitize()
      ]
    });
  }
  async $sanitize(component, attributes) {
    await super.$sanitize(component, attributes);
    if (component instanceof Promise) component = await component;
    for (const [name, value] of Object.entries(component)) {
      switch (name) {
        case "files":
          component.files = await $SanitizeGlob(value);
          break;
        case "bin":
          let buildValues = value;
          let entry = buildValues.entry;
          let contents = buildValues.contents ?? await import_forge15.ForgeFile.$ReadDecoded(entry);
          let root = buildValues.root ?? import_forge15.ForgePath.Parse(entry).dir;
          component.bin = {
            contents,
            root,
            entry
          };
          break;
      }
    }
    return component;
  }
  validate(packaging) {
    super.validate(packaging);
    if (packaging.validations.errors.length == 0) packaging.validations.add(new import_forge15.ArgumentValidationSuccess(`Package sanitized for NPM`), { npm: true, sanitize: true });
  }
};

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageValidate.ts
var import_forge17 = require("@onyx-ignition/forge");

// ../Forge-Typescript-Source/src/ts/build/types/TypesPackageValidate.ts
var import_forge16 = require("@onyx-ignition/forge");
var TypesPackageValidate = class extends import_forge16.AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    await super.$flush(query, validations);
    const params = (0, import_forge16.MergeAttributes)(await Promise.all(query.or({ forge: import_forge16.Intersects }).all));
    const { files, name } = params;
    const cause = params;
    if (files === void 0) validations.add(
      new import_forge16.ArgumentValidationError(`arguments for <error>{ files }</error> is undefined`, { cause }),
      { files: true, ...import_forge16.ArgumentValidationErrorAttributes }
    );
    if (name === void 0) validations.add(
      new import_forge16.ArgumentValidationError(`arguments for <error>{ name }</error> is undefined"`, { cause }),
      { name: true, ...import_forge16.ArgumentValidationErrorAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new import_forge16.ArgumentValidationSuccess(`Package validated for Types`),
      { types: true, validate: true }
    );
  }
};

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageValidate.ts
var NPMPackageValidate = class extends import_forge17.AsyncArgumentPackageValidate {
  constructor(options) {
    super({
      ...options,
      validators: [
        new TypesPackageValidate(),
        new LibraryPackageValidate(),
        ...options?.validators ?? []
      ]
    });
  }
  async $flush(query, validations) {
    await super.$flush(query, validations);
    const params = (0, import_forge17.MergeAttributes)(await Promise.all(query.or({ forge: import_forge17.Intersects }).all));
    const { bin, ext, includes, package_json } = params;
    const cause = params;
    const purges = [];
    if (validations.has(import_forge17.QuerySequence.Or({ library: true }))) {
      purges.push(...validations.purge(import_forge17.QuerySequence.And({ library: true, index: true })));
      purges.push(...validations.purge(import_forge17.QuerySequence.And({ library: true, ext: true })));
      if (validations.has(import_forge17.QuerySequence.And({ library: true, error: true })) === false) validations.add(
        new import_forge17.ArgumentValidationSuccess(`Package validated for Library`),
        { library: true, validate: true }
      );
    } else {
      console.red("NO tested validation found for library");
      validations.add(
        new import_forge17.ArgumentValidationError(`[${this.constructor.name}] No nested valiation found for [LibraryPackageValidate]"`, { cause }),
        { npm: true, library: true, ...import_forge17.ArgumentValidationErrorAttributes }
      );
    }
    if (purges.length) console.log(String(purges.map((val) => `${val?.constructor?.name}`)));
    if (bin) {
      const { entry, contents, root } = bin;
      if (bin.constructor === String) {
        validations.add(
          new import_forge17.ArgumentValidationError(`[${this.constructor.name}] arguments type <error>{ bin }</error> is a string should be { bin: { entry } }"`, { cause }),
          { bin: true, ...import_forge17.ArgumentValidationErrorAttributes }
        );
      } else if (entry) {
        if (await import_forge17.ForgeFile.$FileExist(entry) === false) validations.add(
          new import_forge17.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { entry } }</error> is missing"`, { cause }),
          { bin: { entry: true }, ...import_forge17.ArgumentValidationErrorAttributes }
        );
      } else {
        if (contents === void 0) validations.add(
          new import_forge17.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { content } }</error> is undefined"`, { cause }),
          { bin: { content: true }, ...import_forge17.ArgumentValidationErrorAttributes }
        );
        if (root === void 0) validations.add(
          new import_forge17.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { root } }</error> is missing"`, { cause }),
          { bin: { root: true }, ...import_forge17.ArgumentValidationErrorAttributes }
        );
      }
    } else {
      validations.add(
        new import_forge17.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin }</cyan> is undefined`, { cause }),
        { bin: true, ...import_forge17.ArgumentValidationErrorAttributes }
      );
    }
    if (ext?.cjs === void 0) validations.add(
      new import_forge17.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext: { cjs } }</warning> is optional and will default to cjs = <blue>".js"`, { cause }),
      { ext: { cjs: true }, ...import_forge17.ArgumentValidationWarningAttributes }
    );
    if (ext?.esm === void 0) validations.add(
      new import_forge17.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext: { esm } }</warning> is optional and will default to esm = <blue>".mjs"`, { cause }),
      { ext: { esm: true }, ...import_forge17.ArgumentValidationWarningAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new import_forge17.ArgumentValidationSuccess(`Package validated for NPM`),
      { npm: true, validate: true }
    );
  }
};

// ../Forge-Typescript-Source/src/Forge-Typescript-Source/src/ts/bin.ts
(async function() {
  const AppArguments = await $FetchArguments();
  const forgePackage = AppArguments.mount(new import_forge18.AttributesArgumentPackageMount({ forge: true }));
  const forgeParams = forgePackage.implode();
  const builderPackage = await BuilderPackage.$From([AppArguments.mount(new import_forge18.AttributesArgumentPackageMount({ builder: true }))]);
  if (GetEnviromentParams().VERBOSITY == "all" /* all */) {
  }
  if (forgeParams.watch || forgeParams.socket || forgeParams.http) {
    console.parse("<red>Persist STARTED");
    const application = new BuildClient({ race: { ".*": 500 } });
    if (forgeParams.socket) {
      const server = await application.$listen(forgeParams.socket.port);
    }
  }
  const errors = [];
  const warnings = [];
  if (AppArguments.has(import_forge18.QuerySequence.Or({ app: { types: import_forge18.Intersects } })) || forgeParams.types === true) {
    let { out } = forgeParams;
    await $VerifyFile({ out }, { warnings, errors });
    await forgePackage.$validate(new TypesPackageValidate());
    const sanitizedPackage = await forgePackage.$sanitize(new TypesPackageSanitize());
    ProcessWarnignsAndErrors({ errors, args: [sanitizedPackage, builderPackage] });
    const result = await $BuildTypes([sanitizedPackage, builderPackage]);
    ProcessBuilderResult(result, { footer: `<red>Error bundling types to "${out}" with the following errors:` });
    const { code, path } = result.or({ code: true }).first;
    await $OutputCompiledCode(code, out);
  } else if (AppArguments.has(import_forge18.QuerySequence.Or({ app: { build: import_forge18.Intersects } })) || forgeParams.build === true) {
    const { out, entry } = forgeParams;
    await $VerifyFile({ entry }, { errors });
    await $VerifyFile({ out }, { warnings, errors });
    ProcessWarnignsAndErrors({ errors, warnings });
    const results = await $Build(entry, builderOptions);
    ProcessBuilderResult(results, { footer: `<red>errors building "${entry}" to "${out}"` });
    const { code } = results.or({ code: true }).first;
    await $OutputCompiledCode(code, out);
    if (results.has(import_forge18.QuerySequence.Or({ mapping: true }))) await $OutputCompiledCode(code, out + ".map");
  } else if (AppArguments.has(import_forge18.QuerySequence.Or({ app: { library: import_forge18.Intersects } })) || forgeParams.library === true) {
    await forgePackage.$validate(new LibraryPackageValidate());
    const sanitizedPackage = await forgePackage.$sanitize(new LibraryPackageSanitize());
    const { out } = forgePackage.implode();
    const { bundled } = builderPackage.implode();
    if (["mangle_random" /* mangle_random */, "mangle_static" /* mangle_static */, "preserve" /* preserve */, "merge" /* merge */].includes(bundled) === false) {
      errors.push(`[Process] arguments for <error>{ builder: { bundled } }</error> should be one of the dollowing options: mangle_random | mangle_static | preserve | merge`);
    }
    ProcessWarnignsAndErrors({ warnings, errors, args: [AppArguments] });
    const library = new LibraryBuilder();
    if (["mangle_random" /* mangle_random */, "mangle_static" /* mangle_static */, "preserve" /* preserve */].includes(bundled)) {
      const results = await library.$export([sanitizedPackage, builderPackage]);
      ProcessBuilderResult(results, { footer: `<red>Error transforming source into library` });
      for (const [component, attributes] of results.or({ code: true })) {
        const { code, path } = component;
        const target = import_forge18.ForgePath.Join(out, path);
        await $OutputCompiledCode(code, target);
      }
    } else if (bundled === "merge" /* merge */) {
      const code = await library.$bundle([sanitizedPackage, builderPackage]);
      await $OutputCompiledCode(code, out);
    } else {
      throw new Error(`Invalid bundle option for library: ${bundled}`);
    }
  } else if (AppArguments.has(import_forge18.QuerySequence.Traverse({ npm: true })) || forgeParams.npm === true) {
    const { out, manifest, init, name } = forgeParams;
    errors.push(...(await $VerifyDirectoryExists({ out })).errors);
    let npmPackageSanitized;
    if (true) {
      await forgePackage.$validate(new NPMPackageValidate());
      const sanitizer = new PackageSanitizeNPM();
      npmPackageSanitized = await forgePackage.$sanitize(sanitizer);
      ProcessWarnignsAndErrors({ errors, args: [forgePackage, builderPackage] });
    } else {
      await AppArguments.$validate(new NPMPackageValidate().mount({ forge: true }));
      const sanitizer = new PackageSanitizeNPM().mount({ forge: true }, { forge: true });
      npmPackageSanitized = await AppArguments.$sanitize(sanitizer);
      ProcessWarnignsAndErrors({ errors, args: [AppArguments, builderPackage] });
    }
    const includes = [];
    const results = await $BuildNPM([npmPackageSanitized, builderPackage]);
    ProcessBuilderResult(results, { header: `<red>Errors found building a NPM package` });
    for (let [{ code, path }, attributes] of results.or({ code: true })) {
      if (import_forge18.QuerySequence.Or({ npx: true }).match(attributes)) {
        const includesHeader = includes.map((include) => `require("${include}");`).join("\n");
        code = String(code).replace(/#! \/usr\/bin\/env node/, `#! /usr/bin/env node
${includesHeader}
`);
      }
      const target = import_forge18.ForgePath.Resolve(out, path);
      await $OutputCompiledCode(code, target);
    }
    if (init) {
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
      const target = import_forge18.ForgePath.Resolve(out, `package.json`);
      await $OutputCompiledCode(JSON.stringify(packageJSON), target);
    }
    if (manifest) {
      const target = import_forge18.ForgePath.Resolve(out, manifest);
      const files = results.or({ manifest: true }).last;
      if (init) files.manifest.push(import_forge18.ForgePath.Resolve(out, `package.json`));
      await $OutputCompiledCode(files.manifest.join("\n"), target);
    }
  } else {
    console.yellow("no build option selected?");
  }
  if (forgeParams.copy) {
    const startTime = Date.now();
    for (const { source, targets } of forgeParams.copy) {
      try {
        if (GetEnviromentParams().DRY_RUN) {
          console.parse(`[DRY_RUN]copying ${source} to:
 ${targets.join("\n")}`);
        } else {
          const promises = [];
          for (const target of targets) promises.push(import_forge18.ForgeFile.$CopyGlob([source], target));
          console.log(await Promise.allSettled(promises));
        }
      } catch (error) {
        console.red("error copying files", error?.message);
        console.log(source, targets);
      }
    }
  }
  if (GetEnviromentParams().DRY_RUN) console.red("DRY ENDED");
})();
function ProcessBuilderResult(result, messaging) {
  if (result.success == false) {
    if (messaging?.header) console.parse(messaging?.header);
    for (const [component, attributes] of result.or({ error: true })) console.parse(`<blue>	* <cyan>${component.error}`);
    if (messaging?.footer) console.parse(messaging?.footer);
    process.exit(1);
  }
}
