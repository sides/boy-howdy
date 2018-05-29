"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandEvent_1 = require("./CommandEvent");
const VersionCommand_1 = require("../builtin/VersionCommand");
class Router {
    constructor(client) {
        this.client = client;
        this.reload();
    }
    reload() {
        this.commands = [
            new VersionCommand_1.default()
        ];
        this.client.emit('configureCommandRouterCommands', this.commands);
    }
    onMessage(message) {
        const e = new CommandEvent_1.default(message);
        for (let i = 0, l = this.commands.length; i < l; i++) {
            this.commands[i].handle(e);
            if (e.handled) {
                break;
            }
        }
    }
}
exports.default = Router;
