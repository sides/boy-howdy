"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageListener_1 = require("lib/listeners/MessageListener");
const https = require("https");
class BalloonListener extends MessageListener_1.default {
    match(message) {
        return super.match(message) && message.content.startsWith('🎈');
    }
    handle(message) {
        if (this.lastFired && this.lastFired.getTime() + 5000 >= +new Date())
            return;
        const matches = message.content.match(/^🎈\s*(\d+)?\s*(flags?)?.*$/);
        if (!matches ||
            (!matches[1] && !matches[2]) ||
            (matches[2] && !matches[2].startsWith('flag'))) {
            this.sendWhat(message.channel);
            return;
        }
        const numFlags = matches[1]
            ? parseInt(matches[1])
            : 1;
        this.sendRandomFlag(message.channel, Math.min(2, Math.max(0, numFlags - 1)));
    }
    sendWhat(channel) {
        const emoji = channel.guild.emojis.find(emoji => emoji.name === 'what');
        if (emoji)
            channel.send(emoji.toString());
    }
    sendRandomFlag(channel, repeat = 0) {
        let emoji = channel.guild.emojis.find(emoji => emoji.name === 'cannon');
        if (emoji)
            emoji = emoji + ' ';
        else
            emoji = '';
        this.getRandomFlag()
            .then(flag => {
            channel.send(emoji + '----> ' + flag);
            if (repeat > 0) {
                setTimeout(() => this.sendRandomFlag(channel, repeat - 1), 3000);
            }
        })
            .catch(() => this.sendWhat(channel));
        this.lastFired = new Date();
    }
    getRandomFlag() {
        return this.updateFlags()
            .then(() => BalloonListener.FLAG_SOURCE + this.flags[Math.floor(Math.random() * this.flags.length)]);
    }
    updateFlags() {
        const now = new Date();
        if (this.flagFreshness && this.flagFreshness.getTime() + (30 * 24 * 60 * 60 * 1000) >= now.getTime()) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            https.get(BalloonListener.FLAG_SOURCE, res => {
                const { statusCode } = res;
                let rawBody = '';
                if (statusCode !== 200)
                    reject();
                res.setEncoding('utf8');
                res.on('data', chunk => rawBody += chunk);
                res.on('end', () => {
                    const regex = new RegExp(`<img src="\\/icons\\/image2.gif.*href="(.+?)"`, 'gi');
                    let matches;
                    this.flags = [];
                    this.flagFreshness = now;
                    while ((matches = regex.exec(rawBody)) != null) {
                        if (!matches[1])
                            continue;
                        this.flags.push(matches[1]);
                    }
                    if (this.flags.length <= 0)
                        this.flags = ['🏁'];
                    resolve();
                });
            });
        });
    }
}
BalloonListener.FLAG_SOURCE = 'https://loud.house/i/flags/';
exports.default = BalloonListener;
