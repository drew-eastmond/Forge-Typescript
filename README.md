# Forge-Typescript 

## Command Line Interface Routes

### Generate Types ( d.ts )

Compile and bundle all files provided via the following arguments `{ files, name, ignore, out }` into a d.ts format.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `files`, `ignore`      | file[], glob[] | Comma seperated file list. Also will resolve glob targets.     |
| `name`      | string    | Used the decalre the namespace in `declare module` statement  |
| `out`      | file     | Optional argument to target to write or default to stdout |

### Build

Using an entry file. Builds and bundles files.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `entry`      | file | Entry file for build process.     |
| `build`

### Generate Library

Export all files provided via the following arguments `{ files, library: { root },  ignore, out }` into a library file. Unlike typical builds library exports dont have an entry point and are simply all the file bundled while preserving imports and export. Use these to dynamically load in javascript or speed up bundling by precompiling code; 


| Argument  | values | Description |
| ------------- | :-------------: | ------------- |
| `files`, `ignore`     | file[], glob[] | Comma seperated file list. Also will resolve glob targets. |
| `library.root`        | string    | All files will use this as a reference to   |
| `alias.files`         | Record<string, string>     | This will resolves aliases during imports |
| `alias.files`   | Record<string, string>     | This will resolves aliases for directories during imports |
| `external`   | string, json://file::props...     | External files to exclude it from your build. If your suppy `json.keys://package.json::dependencies` You can load a json file and tarverse to the appropriate keys, properties, or array values.   |




node .\bin.js --build --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./index.mjs --platform-- node --format-- esm

node .\bin.js --types --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./index-cli.d.ts --name-- tester

node ./bin.js --library -- --in-- ../Forge-Typescript-Source/src/ts/client.ts --out-- ./lib/index.js --root-- ../Forge-Typescript-Source/src/ts --platform-- node --clean

## ClI 

### Generate Types ( d.ts )

Currently supports compiling and bundling all files via the { files } argument while filtering out conflicts with the { ignore } argument. The { name } argument will be used for declare module. Finally if an { out } argument is provided

::

Options to preserve or mangle the output will be explored in future releases.

npm run types [[files]] ../Forge-Typescript-Source/src/ts/*/** [[name]] forge/example [[out]] ./forge.d.ts
npm run types ::files:: ../Forge-Typescript-Source/src/ts/*/** ::name:: forge/example ::out:: ./forge.d.ts



# library 

npm run library -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[platform]] node [[clean [[format]] esm [[external]] "@onyx-ignition/forge" [[walk [[alias.file]]  dsfdsdsfsdfsd [[drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directory] "@ts:../Forge-Typescript-Source/src/ts" [happy


npm run library -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[platform]] node [[clean [[format]] esm [[external]] "@onyx-ignition/forge" [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directory] "@ts:../Forge-Typescript-Source/src/ts" [happy


# npm 

npm run npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[clean [[external]] "@onyx-ignition/forge" [[alias.file]]  dsfdsdsfsdfsd [[_drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json


npx @onyx-igntion/Forge-Typescript npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./ [[root]] ../Forge-Typescript-Source/src/ts [[clean [[external]] "@onyx-ignition/forge" [[alias.file]]  dsfdsdsfsdfsd [[_drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json [[external]] json.key://./package.json::dependencies [[bin]] ../Forge-Typescript-Source/src/ts/bin.ts

npm run npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[clean [[external]] "@onyx-ignition/forge" [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json [[out]] ./ [[name]] onyx-ignition/forge-typescript [[bin]] ../Forge-Typescript-Source/src/ts/bin.ts [[external]] json.key://./package.json:: [[transform]] [write.obfuscate




npx github.com/drew-eastmond/Forge-Typescript npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./ [[root]] ../Forge-Typescript-Source/src/ts [[clean [[external]] "@onyx-ignition/forge" [[alias.file]]  dsfdsdsfsdfsd [[_drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json [[external]] json.key://./package.json::dependencies

npm run npm
npx @onyx-ignition/forge-typescript npm
npm run npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] "G:\work\onyx-ignition\forge-typescript\Forge-Typescript\node_modules\@onyx-ignition\forge-typescript" [[root]] ../Forge-Typescript-Source/src/ts [[clean [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json [[external]] json.keys://./package.json::dependencies [[bin]] ../Forge-Typescript-Source/src/ts/bin.ts


node ./bin.js -- [[npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] "G:\work\onyx-ignition\forge-typescript\Forge-Typescript\node_modules\@onyx-ignition\forge-typescript\" [[root]] ../Forge-Typescript-Source/src/ts [[clean [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json [[external]] json.keys://./package.json::dependencies [[bin]] ../Forge-Typescript-Source/src/ts/bin.ts

npx @onyx-ignition/forge-typescript npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./ [[root]] ../Forge-Typescript-Source/src/ts [[clean [[external]] "@onyx-ignition/forge" [[alias.file]]  dsfdsdsfsdfsd [[_drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json [[external]] json.key://./package.json::dependencies [[bin]] ../Forge-Typescript-Source/src/ts/bin.ts


# NPX
npm run npm -- [[files]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./ [[library]] [root] ../Forge-Typescript-Source/src/ts [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] ../Forge-Typescript-Source/src/ts [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[external]] json.keys://./package.json::dependencies [[bin]] [entry] ../Forge-Typescript-Source/src/ts/bin.ts [[transform]] [write.obfuscate [[clean