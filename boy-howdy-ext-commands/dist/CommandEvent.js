"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("./Event");
class CommandEvent extends Event_1.default {
    constructor(message) {
        super();
        this.message = message;
    }
}
exports.default = CommandEvent;
