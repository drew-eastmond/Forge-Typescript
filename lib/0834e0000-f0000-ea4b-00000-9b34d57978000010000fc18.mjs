#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/LibraryBuilder.ts
import { ForgeFile, ForgePath, QuickHash, Result } from "@onyx-ignition/forge";
import { FileCache } from "./bbb760000-70000-37a5-80000-9b34d5797800009000090a5.mjs";
import { $Transform } from "./a43b20000-30000-9ba4-40000-9b34d579780000500001126.mjs";
function ExportPlugin(files, hashes, resolves) {
  const errors = [];
  return {
    name: "forge-export-library",
    setup: function(build) {
      build.onResolve({ filter: /.+/ }, async function(args) {
        let { path, resolveDir, importer } = args;
        if (resolves.directories) {
          for (const [match, replace] of Object.entries(resolves.directories)) {
            if (path.startsWith(match)) path = path.replace(match, ForgePath.Resolve(replace) + "/");
          }
        }
        for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
          const absolutePath = ForgePath.Resolve(resolveDir, `${path}${ext}`);
          const relativePath = ForgePath.Relative(resolveDir, absolutePath);
          if (await ForgeFile.$FileExist(absolutePath)) {
            if (resolves.files[absolutePath]) {
              return { path: resolves.files[absolutePath], external: true };
            } else if (files.includes(absolutePath)) {
              const importParsed = ForgePath.Parse(importer);
              if (importParsed.name == "{index}") return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
              const pathParsed = ForgePath.Parse(hashes.get(absolutePath).path);
              return { path: "./" + pathParsed.base, external: true, namespace: "remapped" };
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
  _sanitizeSources({ root, files }, aliases) {
    const sanitizedFiles = [];
    for (const file of files) sanitizedFiles.push(ForgePath.Resolve(file));
    const sanitizedResolves = {};
    for (const [file, resolve] of Object.entries(aliases.files)) {
      if (ForgePath.IsAbsolute(file)) {
        sanitizedResolves[file] = resolve;
      } else {
        sanitizedResolves[ForgePath.Resolve(root, file)] = resolve;
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
    const parsedPath = ForgePath.Parse(file);
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
    importEntry += `import { ${[...importations].join(", ")} } from "${ForgePath.Relative(root, parsedPath.dir)}/${name}";`.replace(/\\/g, "/").replace(".//", "./");
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
            const { path, resolveDir } = args;
            for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
              const absolutePath = ForgePath.Resolve(resolveDir, `${path}${ext}`);
              if (aliases[absolutePath]) return { path: aliases[absolutePath], external: true };
              if (files.includes(absolutePath) === false) return { path, external: true };
              if (await ForgeFile.$FileExist(absolutePath)) return { path: absolutePath, external: false };
            }
            return { path, external: true };
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
      let path;
      if (bundled == "preserve") {
        const parsedFile = ForgePath.Parse(file);
        path = ForgePath.Join(libraryExport.join, ForgePath.Relative(root, ForgePath.Join(parsedFile.dir, parsedFile.name))) + libraryExport.ext;
      } else if (bundled == "mangle") {
        path = ForgePath.Join(libraryExport.join, QuickHash()) + libraryExport.ext;
      }
      hashes.set(file, { path, contents: await FileCache.$FetchString(file) });
    }
    const bundle = new Result();
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
      const { contents: contents2, path } = hashes.get(file);
      const fileParsed = ForgePath.Parse(file);
      const transformResult2 = await $Transform({ root: fileParsed.dir, contents: contents2, source: file }, buildOptions, { plugins });
      if (transformResult2.success === false) {
        for (const [component, attributes] of transformResult2) console.log(attributes, component);
        throw `Error compiling library.$Export( ): ${file}`;
      }
      const { code: code2 } = transformResult2.or({ code: true }).first;
      bundle.add({ code: code2, path }, { code: true, dependency: true });
    }
    return bundle;
  }
};
export {
  LibraryBuilder
};
