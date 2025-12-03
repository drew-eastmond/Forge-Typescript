# forge-typescript
Typescript build package for Forge


node .\bin.js --build --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./index.mjs --platform-- node --format-- esm

node .\bin.js --types --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./index-cli.d.ts --name-- tester

node ./bin.js --library -- --in-- ../Forge-Typescript-Source/src/ts/client.ts --out-- ./lib/index.js --root-- ../Forge-Typescript-Source/src/ts --platform-- node --clean

# types
npm run types ::in:: ../Forge-Typescript-Source/src/ts/client.ts ::out:: ./index-cli.d.ts ::name:: @onyx-ignition/forge-typescript

# library 

npm run library -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[platform]] node [[clean [[format]] esm [[external]] "@onyx-ignition/forge" [[walk [[alias.file]]  dsfdsdsfsdfsd [[drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directory] "@ts:../Forge-Typescript-Source/src/ts" [happy


npm run library -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[platform]] node [[clean [[format]] esm [[external]] "@onyx-ignition/forge" [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directory] "@ts:../Forge-Typescript-Source/src/ts" [happy


# npm 

npm run npm -- [[in]] ../Forge-Typescript-Source/src/ts/*/** [[out]] ./lib/index.mjs [[root]] ../Forge-Typescript-Source/src/ts [[clean [[external]] "@onyx-ignition/forge" [[alias.file]]  dsfdsdsfsdfsd [[_drew]] .\package.json [[ignore]] ../Forge-Typescript-Source/src/ts/formless/*/** [[alias]] [directories.@ts] "../Forge-Typescript-Source/src/ts" [happy [[alias]] [directories.@tsx] ..\Forge-Typescript-Source\src\tsx\ [[alias]] [files] drew.txt [[alias]] [files] drew.json