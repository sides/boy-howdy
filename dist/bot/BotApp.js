"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("lib/App");
const Magic8ballListener_1 = require("bot/listeners/Magic8ballListener");
const SearchListener_1 = require("bot/listeners/SearchListener");
const BalloonListener_1 = require("bot/listeners/BalloonListener");
class BotApp extends App_1.default {
    booting() {
        super.booting();
        this.client.on('message', message => {
            if (message.content === 'go completely bananas') {
                message.reply('i am confident that sides will finish mw');
            }
            else if (message.isMentioned(this.client.user)) {
                const howdy = message.channel.guild.emojis.find(emoji => emoji.name === '__');
                message.channel.send(howdy.toString());
            }
        });
        const magic8ball = new Magic8ballListener_1.default();
        magic8ball.subscribe(this.client);
        const search = new SearchListener_1.default();
        search.subscribe(this.client);
        const balloon = new BalloonListener_1.default();
        balloon.subscribe(this.client);
    }
    booted() {
        if (this.config.debug) {
            this.client.user.setPresence({
                status: 'dnd',
                game: { name: ':__:' }
            });
        }
        else {
            this.client.user.setPresence({
                status: 'online',
                game: null
            });
        }
    }
}
exports.default = BotApp;
