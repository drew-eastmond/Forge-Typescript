// src/ts/index.ts
var { workerData } = require("worker_threads");
if (workerData) {
  new Application(workerData.key, workerData, { race: { "*": 5e3 } });
} else {
}
