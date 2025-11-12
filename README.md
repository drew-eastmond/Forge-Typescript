# forge-typescript
Typescript build package for Forge


node .\bin.js --build --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./index.mjs --platform-- node --format-- esm

node .\bin.js --types --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./index-cli.d.ts --name-- tester

node .\bin.js --library --in-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts\client.ts --out-- ./lib/index.js --root-- C:\work\forge-typescript\Forge-Typescript-Source\src\ts