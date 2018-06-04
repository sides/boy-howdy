"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegexCommand {
    quickMatch(message) {
        return true;
    }
    handle(request) {
        if (!this.quickMatch(request.originalMessage)) {
            return;
        }
        let result = this.pattern.exec(request.originalMessage.content);
        if (!result) {
            return;
        }
        if (!this.pattern.global) {
            this.matched(request.originalMessage, result);
        }
        else {
            let resultSet = [result];
            while (result = this.pattern.exec(request.originalMessage.content)) {
                resultSet.push(result);
            }
            this.matched(request.originalMessage, resultSet);
        }
        request.handled = true;
    }
}
exports.default = RegexCommand;
