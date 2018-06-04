"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    handle(request) {
        if (this.match(request.originalMessage)) {
            this.matched(request.originalMessage);
            request.handled = true;
        }
    }
}
exports.default = Command;
