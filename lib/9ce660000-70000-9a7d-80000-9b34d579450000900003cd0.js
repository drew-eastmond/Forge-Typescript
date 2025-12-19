#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/types.ts
var import_child_process = require("child_process");
(async function() {
  try {
    console.log("generating @types from manifest ( ignoring warnings & errors )");
    (0, import_child_process.execSync)(`npx -p typescript@5.6.2 tsc ${BASE}ts/index.ts --declaration --allowJs --emitDeclarationOnly --allowSyntheticDefaultImports --outDir ${DIST}/@types --target esnext --moduleResolution node`, { stdio: "inherit" });
    console.log("removing previous directory");
    await $fs.rm(`${DIST}/@types`, { recursive: true, force: true });
  } catch (error) {
    console.log("@types have errors");
    process.exit();
  }
  const typesManifest = (await $Walk("./dist/@types/")).filter((file) => {
    for (const ignore of ignoreList) {
      const ignoredParsed = path.parse(ignore);
      const fileParsed = path.parse(file);
      if (ignoredParsed.name + ".d" == fileParsed.name) return false;
    }
    return true;
  }).map((file) => "./" + file.replace(/\\/g, "/"));
  console.log(typesManifest);
  let code = "\n";
  for (const file of typesManifest) {
    let section = await $fs.readFile(file, "utf-8") + "\n";
    section = section.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
    code += section;
  }
  let output = `// @ts-nocheck

declare module "@onyx-ignition/forge" {${code}
}`;
  await $fs.writeFile("./dist/index.d.ts", output);
})();
