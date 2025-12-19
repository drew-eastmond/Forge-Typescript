#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/Core.ts
import { rm } from "node:fs/promises";
import { Base64, DecodeAttributes, DecodeString, ForgeFile, ForgeIO, ForgePath, ForgeZip, Result } from "@onyx-ignition/forge";
import { build as esBuild } from "esbuild";
import { obfuscate } from "javascript-obfuscator";
import { FileCache } from "./bbb760000-70000-37a5-80000-9b34d5797800009000090a5.mjs";
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
      let contents = await FileCache.$FetchString(filePath);
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
    const result = new Result();
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
        let jsonData = DecodeAttributes(await ForgeIO.$Fetch(file));
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
      const file = ForgePath.Sanitize(root, results.groups.file);
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
      const file = ForgePath.Sanitize(root, results.groups.file);
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
  const result = new Result();
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
      const ignores = buildOptions.ignores.map((file) => ForgePath.Resolve(file));
      return;
      build.onResolve({ filter: /./ }, async function(args) {
        const { path, resolveDir } = args;
        for (const ext of [".ts", ".tsx", ".jsx", ".js", ".mjs"]) {
          const absolutePath = ForgePath.Resolve(resolveDir, `${path}${ext}`);
          if (await ForgeFile.$FileExist(absolutePath) && ignores.includes(absolutePath)) {
          }
        }
        return;
      });
    }
  });
  if (options?.cache !== false) plugins.push(CachePlugin);
  if (options?.plugins) plugins.push(...options?.plugins);
  const result = new Result();
  result.add({ ...buildOptions }, { options: true });
  const startTime = Date.now();
  const { bundled, write, verbosity, treeShaking } = buildOptions;
  let logLevel;
  switch (verbosity) {
    default:
      logLevel = "silent";
  }
  const buildQuery = await esBuild({
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
  const result = new Result();
  const stats = await ForgeFile.$Stat(entryFile).catch((error) => void 0);
  if (stats === void 0 || stats.isFile() === false) {
    result.add({ error: `Entry file missing or not a file: "${entryFile}"` }, { error: true });
    return result.reject();
  }
  const plugins = options?.plugins || [];
  if (options?.cache !== false) plugins.push(CachePlugin);
  result.add({ ...buildOptions }, { options: true });
  result.add({ entry: entryFile }, { entry: true });
  const startTime = Date.now();
  const buildQuery = await esBuild({
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
  const obfuscationResult = obfuscate(
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
    const buffer = await ForgeZip.$GZip(code);
    if (writeTransforms.includes("base64")) return Base64.Encode(buffer);
    return DecodeString(buffer);
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = Base64.Encode(code);
  return code;
}
async function $UnWrapWriteTransforms(code, options) {
  const writeTransforms = options.transform.write;
  if (writeTransforms.includes("gzip")) {
    if (writeTransforms.includes("base64")) {
      const buffer2 = await ForgeZip.$GUnzip(Base64.ArrayBuffer(code));
      return DecodeString(buffer2);
    }
    const buffer = await ForgeZip.$GUnzip(code);
    return DecodeString(buffer);
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = Base64.String(code);
  return code;
}
async function $Clean() {
  const files = [
    ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
    ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
  ];
  const promises = [];
  for (const file of files) promises.push(rm(file, { recursive: true, force: true }));
  await Promise.allSettled(promises);
}
export {
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
};
