#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/library/LibraryPackageSanitize.ts
import { ArgumentValidationSuccess, AsyncArgumentPackageSanitize, Intersects, MergeAttributes } from "@onyx-ignition/forge";
import { $SanitizeGlob } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
var LibraryPackageSanitize = class extends AsyncArgumentPackageSanitize {
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
    const forgeParams = MergeAttributes(await Promise.all(query.or({ forge: Intersects }).all));
    const { root, files } = forgeParams;
    query.add({ sources: { root, files } }, { forge: { sources: { root, files } } });
  }
  validate(packaging) {
    super.validate(packaging);
    if (packaging.validations.errors.length == 0) packaging.validations.add(new ArgumentValidationSuccess(`Package sanitized for Library`), { library: true, sanitize: true });
  }
};
export {
  LibraryPackageSanitize
};
