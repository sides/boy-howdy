"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandEvent_1 = require("./CommandEvent");
class Router {
    onMessage(message) {
        const e = new CommandEvent_1.default(message);
        const commands = [];
        message.client.emit('configureCommandRouterCommands', commands);
        for (let i = 0, l = commands.length; i < l; i++) {
            commands[i].handle(e);
            if (e.handled) {
                break;
            }
        }
    }
}
exports.default = Router;
