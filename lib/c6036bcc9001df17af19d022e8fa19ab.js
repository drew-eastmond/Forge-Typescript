#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/bin.ts
var import_forge = require("@onyx-ignition/forge");
var import_bin_utils = require("./f13c3b46e06822e2249df60e2cbf6949.js");
var import_BuildClient = require("./505d842751e0fcf14b97199f9e0bc437.js");
var import_BuilderPackage = require("./d9f46ef5128f8e924b254d595e5357ca.js");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
var import_LibraryBuilder = require("./2815fdad886e131d5b813285c76cdcc5.js");
var import_LibraryPackageSanitize = require("./4c8e95ab119caa3619f68f6b1feebe9a.js");
var import_LibraryPackageValidate = require("./d683159dd8e68f473890984ea31407cb.js");
var import_NPMBuilder = require("./9105c98d3ce8e0bda613fcecdcd7cfba.js");
var import_NPMPackageSanitize = require("./ceb833d0b6c6f9034a12e846e3e6ff33.js");
var import_NPMPackageValidate = require("./5323ce1df9cc465f2799a796aedb383f.js");
var import_TypesBuilder = require("./e564693af5f22bea6e40aaee8b0ec30d.js");
var import_TypesPackageSanitize = require("./fdf6fd6f5c6c645b25dbfb7686c5f961.js");
var import_TypesPackageValidate = require("./acca53d04135a28f5153325ee9283928.js");
var import_Core2 = require("./7a0362d7d75257ca468d645e44cba11e.js");
(async function() {
  const AppArguments = await (0, import_bin_utils.$FetchArguments)();
  const forgePackage = AppArguments.mount(new import_forge.AttributesArgumentPackageMount({ forge: true }));
  const forgeParams = forgePackage.implode();
  const builderPackage = await import_BuilderPackage.BuilderPackage.$From([AppArguments.mount(new import_forge.AttributesArgumentPackageMount({ builder: true }))]);
  if ((0, import_Core2.GetEnviromentParams)().VERBOSITY == import_Core.Verbosity.all) {
  }
  if (forgeParams.watch || forgeParams.socket || forgeParams.http) {
    console.parse("<red>Persist STARTED");
    const application = new import_BuildClient.BuildClient({ race: { ".*": 500 } });
    if (forgeParams.socket) {
      const server = await application.$listen(forgeParams.socket.port);
    }
  }
  const errors = [];
  const warnings = [];
  if (AppArguments.has(import_forge.QuerySequence.Or({ app: { types: import_forge.Intersects } })) || forgeParams.types === true) {
    let { out } = forgeParams;
    await (0, import_Core.$VerifyFile)({ out }, { warnings, errors });
    await forgePackage.$validate(new import_TypesPackageValidate.TypesPackageValidate());
    const sanitizedPackage = await forgePackage.$sanitize(new import_TypesPackageSanitize.TypesPackageSanitize());
    (0, import_bin_utils.ProcessWarnignsAndErrors)({ errors, args: [sanitizedPackage, builderPackage] });
    const result = await (0, import_TypesBuilder.$BuildTypes)([sanitizedPackage, builderPackage]);
    ProcessBuilderResult(result, { footer: `<red>Error bundling types to "${out}" with the following errors:` });
    const { code, path } = result.or({ code: true }).first;
    await (0, import_Core2.$OutputCompiledCode)(code, out);
  } else if (AppArguments.has(import_forge.QuerySequence.Or({ app: { build: import_forge.Intersects } })) || forgeParams.build === true) {
    const { out, entry } = forgeParams;
    await (0, import_Core.$VerifyFile)({ entry }, { errors });
    await (0, import_Core.$VerifyFile)({ out }, { warnings, errors });
    (0, import_bin_utils.ProcessWarnignsAndErrors)({ errors, warnings });
    const results = await (0, import_Core.$Build)(entry, builderOptions);
    ProcessBuilderResult(results, { footer: `<red>errors building "${entry}" to "${out}"` });
    const { code } = results.or({ code: true }).first;
    await (0, import_Core2.$OutputCompiledCode)(code, out);
    if (results.has(import_forge.QuerySequence.Or({ mapping: true }))) await (0, import_Core2.$OutputCompiledCode)(code, out + ".map");
  } else if (AppArguments.has(import_forge.QuerySequence.Or({ app: { library: import_forge.Intersects } })) || forgeParams.library === true) {
    await forgePackage.$validate(new import_LibraryPackageValidate.LibraryPackageValidate());
    const sanitizedPackage = await forgePackage.$sanitize(new import_LibraryPackageSanitize.LibraryPackageSanitize());
    const { out } = forgePackage.implode();
    const { bundled } = builderPackage.implode();
    if ([import_Core.Bundle.mangle_random, import_Core.Bundle.mangle_static, import_Core.Bundle.preserve, import_Core.Bundle.merge].includes(bundled) === false) {
      errors.push(`[Process] arguments for <error>{ builder: { bundled } }</error> should be one of the dollowing options: mangle_random | mangle_static | preserve | merge`);
    }
    (0, import_bin_utils.ProcessWarnignsAndErrors)({ warnings, errors, args: [AppArguments] });
    const library = new import_LibraryBuilder.LibraryBuilder();
    if ([import_Core.Bundle.mangle_random, import_Core.Bundle.mangle_static, import_Core.Bundle.preserve].includes(bundled)) {
      const results = await library.$export([sanitizedPackage, builderPackage]);
      ProcessBuilderResult(results, { footer: `<red>Error transforming source into library` });
      for (const [component, attributes] of results.or({ code: true })) {
        const { code, path } = component;
        const target = import_forge.ForgePath.Join(out, path);
        await (0, import_Core2.$OutputCompiledCode)(code, target);
      }
    } else if (bundled === import_Core.Bundle.merge) {
      const code = await library.$bundle([sanitizedPackage, builderPackage]);
      await (0, import_Core2.$OutputCompiledCode)(code, out);
    } else {
      throw new Error(`Invalid bundle option for library: ${bundled}`);
    }
  } else if (AppArguments.has(import_forge.QuerySequence.Traverse({ npm: true })) || forgeParams.npm === true) {
    const { out, manifest, init, name } = forgeParams;
    errors.push(...(await (0, import_Core.$VerifyDirectoryExists)({ out })).errors);
    let npmPackageSanitized;
    if (true) {
      await forgePackage.$validate(new import_NPMPackageValidate.NPMPackageValidate());
      const sanitizer = new import_NPMPackageSanitize.PackageSanitizeNPM();
      npmPackageSanitized = await forgePackage.$sanitize(sanitizer);
      (0, import_bin_utils.ProcessWarnignsAndErrors)({ errors, args: [forgePackage, builderPackage] });
    } else {
      await AppArguments.$validate(new import_NPMPackageValidate.NPMPackageValidate().mount({ forge: true }));
      const sanitizer = new import_NPMPackageSanitize.PackageSanitizeNPM().mount({ forge: true }, { forge: true });
      npmPackageSanitized = await AppArguments.$sanitize(sanitizer);
      (0, import_bin_utils.ProcessWarnignsAndErrors)({ errors, args: [AppArguments, builderPackage] });
    }
    const includes = [];
    const results = await (0, import_NPMBuilder.$BuildNPM)([npmPackageSanitized, builderPackage]);
    ProcessBuilderResult(results, { header: `<red>Errors found building a NPM package` });
    for (let [{ code, path }, attributes] of results.or({ code: true })) {
      if (import_forge.QuerySequence.Or({ npx: true }).match(attributes)) {
        const includesHeader = includes.map((include) => `require("${include}");`).join("\n");
        code = String(code).replace(/#! \/usr\/bin\/env node/, `#! /usr/bin/env node
${includesHeader}
`);
      }
      const target = import_forge.ForgePath.Resolve(out, path);
      await (0, import_Core2.$OutputCompiledCode)(code, target);
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
      const target = import_forge.ForgePath.Resolve(out, `package.json`);
      await (0, import_Core2.$OutputCompiledCode)(JSON.stringify(packageJSON), target);
    }
    if (manifest) {
      const target = import_forge.ForgePath.Resolve(out, manifest);
      const files = results.or({ manifest: true }).last;
      if (init) files.manifest.push(import_forge.ForgePath.Resolve(out, `package.json`));
      await (0, import_Core2.$OutputCompiledCode)(files.manifest.join("\n"), target);
    }
  } else {
    console.yellow("no build option selected?");
  }
  if (forgeParams.copy) {
    const startTime = Date.now();
    for (const { source, targets } of forgeParams.copy) {
      try {
        if ((0, import_Core2.GetEnviromentParams)().DRY_RUN) {
          console.parse(`[DRY_RUN]copying ${source} to:
 ${targets.join("\n")}`);
        } else {
          const promises = [];
          for (const target of targets) promises.push(import_forge.ForgeFile.$CopyGlob([source], target));
          console.log(await Promise.allSettled(promises));
        }
      } catch (error) {
        console.red("error copying files", error?.message);
        console.log(source, targets);
      }
    }
  }
  if ((0, import_Core2.GetEnviromentParams)().DRY_RUN) console.red("DRY ENDED");
})();
function ProcessBuilderResult(result, messaging) {
  if (result.success == false) {
    if (messaging?.header) console.parse(messaging?.header);
    for (const [component, attributes] of result.or({ error: true })) console.parse(`<blue>	* <cyan>${component.error}`);
    if (messaging?.footer) console.parse(messaging?.footer);
    process.exit(1);
  }
}
