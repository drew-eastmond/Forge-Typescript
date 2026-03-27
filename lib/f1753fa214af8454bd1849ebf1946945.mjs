#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackageSanitize.ts
import { AsyncArgumentPackageSanitize } from "@onyx-ignition/forge";
import { $ParseExternals, $SanitizeGlob, BuilderConfig } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
var BuilderPackageSanitize = class extends AsyncArgumentPackageSanitize {
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
export {
  BuilderPackageSanitize
};
