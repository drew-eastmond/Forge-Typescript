#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/types/TypesPackageSanitize.ts
import { ArgumentValidationSuccess, AsyncArgumentPackageSanitize } from "@onyx-ignition/forge";
import { $SanitizeGlob } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
var TypesPackageSanitize = class extends AsyncArgumentPackageSanitize {
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
    if (packaging.validations.errors.length == 0) packaging.validations.add(new ArgumentValidationSuccess(`Package sanitized for Types`), { types: true, sanitize: true });
  }
};
export {
  TypesPackageSanitize
};
