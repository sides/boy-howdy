"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const Registry_1 = require("./Registry");
const Signal_1 = require("./Signal");
const VersionCommand_1 = require("../command/commands/VersionCommand");
class Router {
    constructor(client) {
        this._client = client;
        this.registry = new Registry_1.default();
        this.reload();
    }
    reload() {
        this.signals = [];
        if (this._client.config.commands.signal) {
            if (this._client.config.commands.signal === '@mention') {
                this.signals.push(Signal_1.default.createMentionSignal(this._client.user));
            }
            else {
                this.signals.push(new Signal_1.default(this._client.config.commands.signal));
            }
        }
        this.registry.clear();
        this.registry.register(new VersionCommand_1.default());
        this._client.emit('configureCommandRouter', this);
    }
    route(message) {
        // We will not route any messages sent by the client itself.
        if (message.author.id === this._client.user.id) {
            return;
        }
        const request = new Request_1.default(message, this.signals);
        // Begin by going over informal commands that could be anything. Since this
        // is ran on every message, having many informal commands can negatively affect
        // performance, especially if they are not optimized with quick matching.
        if (this.handleCommands(request, this.registry.getInformalCommands())) {
            return;
        }
        // Get the signal for the request. If no signal is found, return immediately.
        // This avoids doing any heavy parsing since we know formal commands need a
        // signal.
        if (request.signal === null) {
            return;
        }
        // We also know that if the request doesn't find any valid command name,
        // no formal command is going to match it. So we can return right away.
        if (request.command === null) {
            return;
        }
        // Finally we can try to handle our registered formal commands.
        this.handleCommands(request, this.registry.getFormalCommands());
    }
    handleCommands(request, commands) {
        for (let i = 0, l = commands.length; i < l; i++) {
            commands[i].handle(request);
            if (request.handled) {
                return true;
            }
        }
        return false;
    }
}
exports.default = Router;
