"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magic8ballRespones = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    'Don\'t count on it',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful'
];
function randomMagic8ballResponse() {
    return exports.magic8ballRespones[Math.floor(Math.random() * exports.magic8ballRespones.length)];
}
exports.default = randomMagic8ballResponse;
