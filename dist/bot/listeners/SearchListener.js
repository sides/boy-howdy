"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageListener_1 = require("lib/listeners/MessageListener");
const https = require("https");
class SearchListener extends MessageListener_1.default {
    match(message) {
        return message.content.startsWith('🔍');
    }
    handle(message) {
        const matches = message.content.match(/^🔍\s*((suisides?|mw)?\s*(\d+)?\s*(\d+)?.*$)/);
        let response = null;
        if (!matches || !matches[2]) {
            response = this.resolveAnyPost(matches[1]);
        }
        else if (!matches[3]) {
            response = this.resolveTag(matches[2]);
        }
        else if (!matches[4]) {
            response = this.resolveComic(matches[2], parseInt(matches[3]));
        }
        else {
            response = this.resolvePanel(matches[2], parseInt(matches[3]), parseInt(matches[4]));
        }
        if (response) {
            if (response instanceof Promise) {
                response
                    .then(msg => message.channel.send(msg))
                    .catch(err => this.sendWhat(message.channel));
            }
            else {
                message.channel.send(response);
            }
        }
        else {
            this.sendWhat(message.channel);
        }
    }
    sendWhat(channel) {
        const emoji = channel.guild.emojis.find(emoji => emoji.name === 'what');
        if (emoji)
            channel.send(emoji.toString());
    }
    resolveAnyPost(request) {
        const slugified = request.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]/g, '')
            .replace(/-+/, '-')
            .replace(/(^-|-$)/, '');
        return 'https://sides.tv/post/' + slugified;
    }
    resolveTag(name) {
        switch (name) {
            case 'suiside':
            case 'suisides':
                return 'https://sides.tv/tag/comic+suisides/asc';
            case 'mw':
                return 'https://sides.tv/tag/comic+mw/asc';
            default:
                return null;
        }
    }
    resolveComic(name, issue) {
        if (!issue)
            return null;
        if (name === 'suisides')
            name = 'suiside';
        return 'https://sides.tv/comic/' + name + '-' + issue;
    }
    resolvePanel(name, issue, panel) {
        if (!issue || !panel)
            return null;
        const comicUrl = this.resolveComic(name, issue);
        return new Promise((resolve, reject) => {
            https.get(comicUrl, res => {
                const { statusCode } = res;
                let rawBody = '';
                if (statusCode !== 200)
                    reject();
                res.setEncoding('utf8');
                res.on('data', chunk => rawBody += chunk);
                res.on('end', () => {
                    const regex = new RegExp(`<img\\s+.*?\\s+src='(http.*?i.sides.tv\\/comics\\/\\w+\\/\\d+\\/${panel}.(?:png|jpe?g|gif))'`);
                    const matches = rawBody.match(regex);
                    if (!matches || !matches[1])
                        resolve(null);
                    resolve(matches[1]);
                });
            });
        });
    }
}
exports.default = SearchListener;
