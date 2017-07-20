"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("lib/App");
class BotApp extends App_1.default {
    booting() {
        super.booting();
        this.client.on('message', message => {
            if (message.content === 'go completely bananas') {
                message.reply('i am confident that sides will finish mw');
            }
        });
    }
}
exports.default = BotApp;
