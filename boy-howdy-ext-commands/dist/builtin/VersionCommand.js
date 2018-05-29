"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegexCommand_1 = require("../command/RegexCommand");
class VersionCommand extends RegexCommand_1.default {
    constructor() {
        super(...arguments);
        this.expression = /^\!version/;
    }
    matched(message) {
        message.reply('discord-bot.js ' + message.client.constructor.VERSION);
    }
}
exports.default = VersionCommand;
