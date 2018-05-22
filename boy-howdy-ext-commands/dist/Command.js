"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    handle(e) {
        if (e.message.author.id != e.message.client.user.id) {
            e.message.channel.send('dlafksjdfuahweiufn');
        }
    }
}
exports.default = Command;
