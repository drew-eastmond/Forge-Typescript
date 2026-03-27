#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/bin.ts
import { AttributesArgumentPackageMount, ForgeFile, ForgePath, Intersects, QuerySequence } from "@onyx-ignition/forge";
import { $FetchArguments, ProcessWarnignsAndErrors } from "./a52a5335bc81fac56a09a661fff42c84.mjs";
import { BuildClient } from "./01e97d637ea6d19f0fb993de56054a52.mjs";
import { BuilderPackage } from "./79724177c42a63f60d976b4cc543849a.mjs";
import { $Build, $VerifyDirectoryExists, $VerifyFile, Bundle, Verbosity } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
import { LibraryBuilder } from "./e1ea2b1d17e55c7011350ffc1464ef0e.mjs";
import { LibraryPackageSanitize } from "./a1f5be2c70c5699a5fa7cf838653c988.mjs";
import { LibraryPackageValidate } from "./b413c1dc23f077deaad6e69981b8d697.mjs";
import { $BuildNPM } from "./5ab1bda1b09442d3288a4876edc66b85.mjs";
import { PackageSanitizeNPM } from "./02e14f9f19497d16de80293c4b09f289.mjs";
import { NPMPackageValidate } from "./42925cb99ab5d29b40aa723bc799a767.mjs";
import { $BuildTypes } from "./71c2299d17c8b0e03c17edc196a9ee0a.mjs";
import { TypesPackageSanitize } from "./d4f027756ea8d7f777ee981e62a3f73d.mjs";
import { TypesPackageValidate } from "./45bd0240e82e1e606fcdbd234786faec.mjs";
import { $OutputCompiledCode, GetEnviromentParams } from "./78e417175b709158fb879bcea6099cbf.mjs";
(async function() {
  const AppArguments = await $FetchArguments();
  const forgePackage = AppArguments.mount(new AttributesArgumentPackageMount({ forge: true }));
  const forgeParams = forgePackage.implode();
  const builderPackage = await BuilderPackage.$From([AppArguments.mount(new AttributesArgumentPackageMount({ builder: true }))]);
  if (GetEnviromentParams().VERBOSITY == Verbosity.all) {
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
  if (AppArguments.has(QuerySequence.Or({ app: { types: Intersects } })) || forgeParams.types === true) {
    let { out } = forgeParams;
    await $VerifyFile({ out }, { warnings, errors });
    await forgePackage.$validate(new TypesPackageValidate());
    const sanitizedPackage = await forgePackage.$sanitize(new TypesPackageSanitize());
    ProcessWarnignsAndErrors({ errors, args: [sanitizedPackage, builderPackage] });
    const result = await $BuildTypes([sanitizedPackage, builderPackage]);
    ProcessBuilderResult(result, { footer: `<red>Error bundling types to "${out}" with the following errors:` });
    const { code, path } = result.or({ code: true }).first;
    await $OutputCompiledCode(code, out);
  } else if (AppArguments.has(QuerySequence.Or({ app: { build: Intersects } })) || forgeParams.build === true) {
    const { out, entry } = forgeParams;
    await $VerifyFile({ entry }, { errors });
    await $VerifyFile({ out }, { warnings, errors });
    ProcessWarnignsAndErrors({ errors, warnings });
    const results = await $Build(entry, builderOptions);
    ProcessBuilderResult(results, { footer: `<red>errors building "${entry}" to "${out}"` });
    const { code } = results.or({ code: true }).first;
    await $OutputCompiledCode(code, out);
    if (results.has(QuerySequence.Or({ mapping: true }))) await $OutputCompiledCode(code, out + ".map");
  } else if (AppArguments.has(QuerySequence.Or({ app: { library: Intersects } })) || forgeParams.library === true) {
    await forgePackage.$validate(new LibraryPackageValidate());
    const sanitizedPackage = await forgePackage.$sanitize(new LibraryPackageSanitize());
    const { out } = forgePackage.implode();
    const { bundled } = builderPackage.implode();
    if ([Bundle.mangle_random, Bundle.mangle_static, Bundle.preserve, Bundle.merge].includes(bundled) === false) {
      errors.push(`[Process] arguments for <error>{ builder: { bundled } }</error> should be one of the dollowing options: mangle_random | mangle_static | preserve | merge`);
    }
    ProcessWarnignsAndErrors({ warnings, errors, args: [AppArguments] });
    const library = new LibraryBuilder();
    if ([Bundle.mangle_random, Bundle.mangle_static, Bundle.preserve].includes(bundled)) {
      const results = await library.$export([sanitizedPackage, builderPackage]);
      ProcessBuilderResult(results, { footer: `<red>Error transforming source into library` });
      for (const [component, attributes] of results.or({ code: true })) {
        const { code, path } = component;
        const target = ForgePath.Join(out, path);
        await $OutputCompiledCode(code, target);
      }
    } else if (bundled === Bundle.merge) {
      const code = await library.$bundle([sanitizedPackage, builderPackage]);
      await $OutputCompiledCode(code, out);
    } else {
      throw new Error(`Invalid bundle option for library: ${bundled}`);
    }
  } else if (AppArguments.has(QuerySequence.Traverse({ npm: true })) || forgeParams.npm === true) {
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
      if (QuerySequence.Or({ npx: true }).match(attributes)) {
        const includesHeader = includes.map((include) => `require("${include}");`).join("\n");
        code = String(code).replace(/#! \/usr\/bin\/env node/, `#! /usr/bin/env node
${includesHeader}
`);
      }
      const target = ForgePath.Resolve(out, path);
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
      const target = ForgePath.Resolve(out, `package.json`);
      await $OutputCompiledCode(JSON.stringify(packageJSON), target);
    }
    if (manifest) {
      const target = ForgePath.Resolve(out, manifest);
      const files = results.or({ manifest: true }).last;
      if (init) files.manifest.push(ForgePath.Resolve(out, `package.json`));
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
          for (const target of targets) promises.push(ForgeFile.$CopyGlob([source], target));
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
