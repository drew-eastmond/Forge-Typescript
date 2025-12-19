#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/client.ts
import { ForgeFile, Result } from "@onyx-ignition/forge";
async function BuildLibrary(socket, parameters) {
  return ParseResult(await socket.$signal("library", parameters));
}
function ParseResult([serialize, error]) {
  error = error?.error || error;
  const output = new Result();
  try {
    const { result } = serialize;
    for (const [component, attributes] of result) output.add(component, attributes);
    if (error) throw output.reject();
    return output.resolve();
  } catch (error2) {
    console.red(error2);
    return output.reject();
  }
}
async function $BuildBundle(socket, parameters) {
  return ParseResult(await socket.$signal("bundle", parameters));
}
async function $ResetBuilder(socket) {
  return socket.$signal("reset", {}).then(function([serialize, error]) {
    const { success } = serialize;
    return success;
  }).catch(function(error) {
    console.red(error);
    return false;
  });
}
async function $ClientBuildTypes(socket, parameters) {
  const { entry: { files }, build: { bundled } } = parameters;
  if (files.constructor !== Array) throw new Error(`File must be and array of files urls`);
  if (bundled == "preserve" || bundled == "mangle") throw new Error(`Build Types only support bundled == "merge" option`);
  return ParseResult(await socket.$signal("types", parameters, { race: 35e3 }));
}
async function $ReadResolveFile(file) {
  try {
    const { files, directories } = JSON.parse(await ForgeFile.$ReadDecoded(file));
    return {
      files: files || {},
      directories: directories || {}
    };
  } catch (error) {
    return {
      files: {},
      directories: {}
    };
  }
}
async function $WalkSources(source, walk) {
  const sources = source.split(/\s*,\s*/);
  const files = [];
  if (walk) {
    for (const folder of sources) files.push(...await ForgeFile.$Walk(folder));
  } else {
    files.push(...sources);
  }
  return files;
}
async function $OutputCompiledCode(code, outFile) {
  if (outFile) {
    console.log("writing file", outFile);
    await ForgeFile.$Write(outFile, code, { recursive: true });
  } else {
    await new Promise(function(resolve, reject) {
      if (code instanceof ArrayBuffer) {
        process.stdout.write(new Uint8Array(code), resolve);
      } else {
        process.stdout.write(code, resolve);
      }
    });
  }
}
export {
  $BuildBundle,
  $ClientBuildTypes,
  $OutputCompiledCode,
  $ReadResolveFile,
  $ResetBuilder,
  $WalkSources,
  BuildLibrary,
  ParseResult
};
