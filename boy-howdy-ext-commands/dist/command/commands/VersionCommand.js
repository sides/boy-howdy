"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormalCommand_1 = require("../FormalCommand");
class VersionCommand extends FormalCommand_1.default {
    constructor() {
        super(...arguments);
        this.name = 'version';
    }
    run(request) {
        request.originalMessage.reply('discord-bot.js ' + request.originalMessage.client.constructor.VERSION);
    }
}
exports.default = VersionCommand;
