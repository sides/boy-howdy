"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageListener_1 = require("lib/listeners/MessageListener");
const Magic8ballResponse_1 = require("bot/responses/Magic8ballResponse");
class Magic8ballListener extends MessageListener_1.default {
    match(message) {
        return message.content.startsWith('🎱');
    }
    handle(message) {
        const response = new Magic8ballResponse_1.default(message.channel);
        response.handle();
    }
}
exports.default = Magic8ballListener;
