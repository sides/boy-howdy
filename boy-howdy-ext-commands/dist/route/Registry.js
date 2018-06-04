"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormalCommand_1 = require("../command/FormalCommand");
class Registry {
    constructor() {
        this.formalCommands = [];
        this.informalCommands = [];
    }
    getFormalCommands() {
        return this.formalCommands.slice();
    }
    getInformalCommands() {
        return this.informalCommands.slice();
    }
    getAllCommands() {
        return this.formalCommands.concat(this.informalCommands);
    }
    clear() {
        this.formalCommands = [];
        this.informalCommands = [];
    }
    register(command, priority = 0) {
        if (command instanceof FormalCommand_1.default) {
            this.formalCommands.push(command);
        }
        else {
            this.informalCommands.push(command);
        }
    }
}
exports.default = Registry;
