"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Router");
const Command_1 = require("./Command");
function enable(on) {
    const router = new Router_1.default();
    on('configureCommandRouterCommands', commands => {
        const cmd = new Command_1.default();
        commands.push(cmd);
    });
    on('message', router.onMessage);
}
exports.enable = enable;
