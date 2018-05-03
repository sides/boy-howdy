"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageListener {
    subscribe(client) {
        client.on('message', this.onmessage.bind(this));
    }
    match(message) {
        return message.channel.type === "text";
    }
    handle(message) {
    }
    onmessage(message) {
        if (this.match(message)) {
            this.handle(message);
        }
    }
}
exports.default = MessageListener;
