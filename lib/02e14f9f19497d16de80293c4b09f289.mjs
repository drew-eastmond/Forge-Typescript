#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageSanitize.ts
import { ArgumentValidationSuccess, AsyncArgumentPackageSanitize, ForgeFile, ForgePath } from "@onyx-ignition/forge";
import { $SanitizeGlob } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
import { TypesPackageSanitize } from "./d4f027756ea8d7f777ee981e62a3f73d.mjs";
import { LibraryPackageSanitize } from "./a1f5be2c70c5699a5fa7cf838653c988.mjs";
var PackageSanitizeNPM = class extends AsyncArgumentPackageSanitize {
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
          let contents = buildValues.contents ?? await ForgeFile.$ReadDecoded(entry);
          let root = buildValues.root ?? ForgePath.Parse(entry).dir;
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
    if (packaging.validations.errors.length == 0) packaging.validations.add(new ArgumentValidationSuccess(`Package sanitized for NPM`), { npm: true, sanitize: true });
  }
};
export {
  PackageSanitizeNPM
};
