"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    handle(e) {
        if (this.match(e.message)) {
            this.matched(e.message);
            e.handled = true;
        }
    }
}
exports.default = Command;
