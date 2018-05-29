"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegexCommand {
    handle(e) {
        let result = this.expression.exec(e.message.content);
        if (!result) {
            return;
        }
        if (!this.expression.global) {
            this.matched(e.message, result);
        }
        else {
            let resultSet = [result];
            while (result = this.expression.exec(e.message.content)) {
                resultSet.push(result);
            }
            this.matched(e.message, resultSet);
        }
        e.handled = true;
    }
}
exports.default = RegexCommand;
