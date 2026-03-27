#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackage.ts
import { ArgumentPackage, MergePackages, QuerySequence } from "@onyx-ignition/forge";
import { BuilderPackageSanitize } from "./f1753fa214af8454bd1849ebf1946945.mjs";
import { BuilderPackageValidate } from "./98db3290e32de7b04846916e94e7b879.mjs";
var BuilderPackage = class _BuilderPackage extends ArgumentPackage {
  /**
   * Return an instance that has been merged from a { builder } mount, then validated and sanitized
   * @param packages
   * @returns {BuilderPackage}
   */
  static async $From(packages) {
    const builder = MergePackages(packages, QuerySequence.Traverse({ builder: true }));
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
export {
  BuilderPackage
};
