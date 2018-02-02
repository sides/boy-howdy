"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomMagic8ballResponse_1 = require("bot/utils/randomMagic8ballResponse");
class Magic8ballResponse {
    constructor(channel) {
        this.channel = channel;
    }
    handle() {
        const emojis = this.channel.guild.emojis.filter(emoji => emoji.name === '__'
            || emoji.name === '___'
            || emoji.name === 'magic8ball').array();
        if (emojis.length !== 3) {
            return;
        }
        this.channel.send(`${emojis[0]} ${emojis[1]} ...`).then((message) => {
            setTimeout(() => {
                const response = randomMagic8ballResponse_1.default().toLowerCase();
                message.edit(`${emojis[2]} ${emojis[1]} ${response}`);
            }, Math.random() * 1500 + 3500);
        });
    }
}
exports.default = Magic8ballResponse;
