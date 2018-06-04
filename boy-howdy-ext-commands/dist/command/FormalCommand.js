"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormalCommand {
    handle(request) {
        if (this.name === request.command) {
            this.run(request, request.arguments.slice(1));
            request.handled = true;
        }
    }
}
exports.default = FormalCommand;
