import { Message } from 'discord.js';
import { Client } from 'discord-bot.js';
export default class Router {
    private client;
    private commands;
    constructor(client: Client);
    reload(): void;
    onMessage(message: Message): void;
}
