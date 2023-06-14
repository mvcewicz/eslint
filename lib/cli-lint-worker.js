"use strict";

const { workerData, parentPort } = require("worker_threads");
const { FlatESLint } = require("./eslint/flat-eslint");
const { ESLint } = require("./eslint");

/**
 * Lint the files and post the results back to the parent thread.
 * @returns {void}
 */
async function cliWorker() {
    const { usingFlatConfig, files, options } = workerData;
    const ActiveESLint = usingFlatConfig ? FlatESLint : ESLint;
    const engine = new ActiveESLint(options);

    const results = await engine.lintFiles(files);

    parentPort.postMessage(results);
}

cliWorker();
