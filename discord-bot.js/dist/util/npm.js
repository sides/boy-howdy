"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function getInstalledPackages() {
    return new Promise((resolve, reject) => {
        child_process_1.exec('npm ls --depth=0 --json --long --prod', (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            const json = JSON.parse(stdout);
            resolve(json.dependencies);
        });
    });
}
exports.getInstalledPackages = getInstalledPackages;
