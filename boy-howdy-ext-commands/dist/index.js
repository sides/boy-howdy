"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./route/Router");
function enable(on) {
    on('readyAndBootstrapped', (client) => {
        const router = new Router_1.default(client);
        on('extensionsWereReloaded', router.reload.bind(router));
        on('message', router.route.bind(router));
    });
}
exports.enable = enable;
