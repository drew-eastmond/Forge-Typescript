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

// ../Forge-Typescript-Source/src/ts/build/library/LibraryBuilder.ts
var LibraryBuilder_exports = {};
__export(LibraryBuilder_exports, {
  LibraryBuilder: () => LibraryBuilder
});
module.exports = __toCommonJS(LibraryBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_crypto = require("crypto");
var import_FileCache = require("./cd2e813171d8118f794a0263739facf9.js");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
function ExportPlugin(files, hashes, resolves) {
  const errors = [];
  return {
    name: "forge-export-library",
    setup: function(build) {
      build.onResolve({ filter: /.+/ }, async function(args) {
        let { path, resolveDir, importer } = args;
        if (resolves.directories) {
          for (const [match, replace] of Object.entries(resolves.directories)) {
            if (path.startsWith(match)) path = path.replace(match, import_forge.ForgePath.Resolve(replace) + "/");
          }
        }
        for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
          const absolutePath = import_forge.ForgePath.Resolve(resolveDir, `${path}${ext}`);
          const relativePath = import_forge.ForgePath.Relative(resolveDir, absolutePath);
          if (await import_forge.ForgeFile.$FileExist(absolutePath)) {
            if (resolves.files[absolutePath]) {
              return { path: resolves.files[absolutePath], external: true };
            } else if (files.includes(absolutePath)) {
              try {
                const importhashedImportPath = hashes.get(importer)?.path;
                if (importhashedImportPath === void 0) {
                  return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
                } else {
                  const path2 = import_forge.ForgePath.Relative(import_forge.ForgePath.Parse(importhashedImportPath).dir, hashes.get(absolutePath).path);
                  return { path: path2, external: true, namespace: "remapped" };
                }
              } catch (error) {
                console.green(importer);
                console.red(error.message);
                return;
              }
              const importParsed = import_forge.ForgePath.Parse(importer);
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
        const contents = hashes.has(path) ? hashes.get(path).contents : await import_FileCache.FileCache.$FetchString(path);
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
  _sanitizeSources({ root, files }, builderOptions) {
    const { aliases, ignores } = builderOptions;
    const sanitizedResolves = {};
    for (const [file, resolve] of Object.entries(aliases.files)) {
      const path = import_forge.ForgePath.IsAbsolute(file) ? file : import_forge.ForgePath.Resolve(root, file);
      sanitizedResolves[path] = resolve;
    }
    files = files.filter((file) => ignores.includes(file) === false).map((file) => import_forge.ForgePath.Resolve(file));
    return [{
      root,
      files
    }, {
      files: sanitizedResolves,
      directories: aliases.directories
    }];
  }
  async _$extractImportations(file, root, vanillaJS) {
    const parsedPath = import_forge.ForgePath.Parse(file);
    const name = parsedPath.name;
    const code = await import_FileCache.FileCache.$FetchString(file);
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
    importEntry += `import { ${[...importations].join(", ")} } from "${import_forge.ForgePath.Relative(root, parsedPath.dir)}/${name}";`.replace(/\\/g, "/").replace(".//", "./");
    if (skippedImportations.length) importEntry += ` // skipped imports :{ ${skippedImportations.join(", ")} }`;
    return importEntry;
  }
  // public async $merge(sources: LibrarySources, alias: ForgeBuilderAliases, basic?: boolean): Promise<string> {
  async $merge(packages) {
    (0, import_Core.VerifyPackages)(packages, {
      "Library packaging validation failed": import_forge.QuerySequence.And({ validate: true, library: true }),
      "Library packaging sanitation failed": import_forge.QuerySequence.And({ sanitize: true, library: true })
    });
    const forgeOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ forge: true }));
    const { sources: { files, root }, vanilla_js } = forgeOptions;
    const importations = [];
    for (const file of files) importations.push(await this._$extractImportations(file, root, false));
    return `${importations.join("\n")};
        
export {

${[...this._exportedComponents].map((value) => "	" + value.replace(/[^\w$]+/g, "_")).join(",\n")} 
            
};`;
  }
  async $bundle(packages) {
    (0, import_Core.VerifyPackages)(packages, {
      "Library packaging validation failed": import_forge.QuerySequence.And({ validate: true, library: true }),
      "Library packaging sanitation failed": import_forge.QuerySequence.And({ sanitize: true, library: true })
    });
    const forgeOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ forge: true }));
    const builderOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ builder: true }));
    const { sources } = forgeOptions;
    const [{ files, root }, aliases] = this._sanitizeSources(sources, builderOptions);
    const contents = await this.$merge(packages);
    const result = await (0, import_Core.$Transform)({ root, contents }, builderOptions, {
      plugins: [{
        name: "forge-library-bundle",
        setup(build) {
          build.onResolve({ filter: /.+/ }, async function(args) {
            const { path, resolveDir } = args;
            for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
              const absolutePath = import_forge.ForgePath.Resolve(resolveDir, `${path}${ext}`);
              if (aliases[absolutePath]) return { path: aliases[absolutePath], external: true };
              if (files.includes(absolutePath) === false) return { path, external: true };
              if (await import_forge.ForgeFile.$FileExist(absolutePath)) return { path: absolutePath, external: false };
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
    const exportResults = new import_forge.Result();
    try {
      (0, import_Core.VerifyPackages)(packages, {
        "Library packaging validation failed": import_forge.QuerySequence.And({ validate: true, library: true }),
        "Library packaging sanitation failed": import_forge.QuerySequence.And({ sanitize: true, library: true })
      });
      const validations = (0, import_forge.MergeValidations)(packages);
      const forgeOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ forge: true }));
      const builderOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ builder: true }));
      const { sources, lib, ext, index } = forgeOptions;
      let [{ files, root }, aliases] = this._sanitizeSources(sources, builderOptions);
      files = files.filter((file) => builderOptions.ignores.includes(file) === false);
      const hashes = /* @__PURE__ */ new Map();
      const { bundled } = builderOptions;
      for (const file of files) {
        let path;
        if (bundled == import_Core.Bundle.preserve) {
          const parsedFile = import_forge.ForgePath.Parse(file);
          path = import_forge.ForgePath.Join(lib, import_forge.ForgePath.Relative(root, import_forge.ForgePath.Join(parsedFile.dir, parsedFile.name))) + ext;
        } else if (bundled == import_Core.Bundle.mangle_static) {
          const hash = (0, import_crypto.createHash)("md5").update(String(hashes.size) + import_forge.ForgePath.Join(root, lib, index)).digest("hex");
          path = import_forge.ForgePath.Join(lib, hash) + ext;
        } else if (bundled == import_Core.Bundle.mangle_random) {
          path = import_forge.ForgePath.Join(lib, (0, import_forge.QuickHash)()) + ext;
        } else {
          throw new Error(`incompable Bunbled: "${bundled}"`);
        }
        hashes.set(file, { path, contents: await import_FileCache.FileCache.$FetchString(file) });
      }
      const mergePackage = new import_forge.ArgumentPackage({ validations });
      mergePackage.add({ sources: { files, root } }, { forge: true });
      mergePackage.add({ ...builderOptions }, { builder: true });
      const contents = await this.$merge([mergePackage]);
      const plugins = builderOptions.bundled == import_Core.Bundle.preserve || builderOptions.bundled == import_Core.Bundle.mangle_static || builderOptions.bundled == import_Core.Bundle.mangle_random ? [ExportPlugin(files, hashes, aliases)] : [];
      const transformResult = await (0, import_Core.$Transform)({ root, contents, entry: index }, builderOptions, { plugins });
      if (transformResult.success === false) return transformResult;
      const { code } = transformResult.or({ code: true }).first;
      exportResults.add({ code, path: index }, { code: true, index: true });
      for (const file of files) {
        if (builderOptions.ignores.includes(file)) {
          console.red("ignore found", file);
          continue;
        }
        const { contents: contents2, path } = hashes.get(file);
        const fileParsed = import_forge.ForgePath.Parse(file);
        const transformResult2 = await (0, import_Core.$Transform)({ root: fileParsed.dir, contents: contents2, entry: file }, builderOptions, { plugins });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LibraryBuilder
});
