import { Message } from 'discord.js';
import { Client } from 'discord-bot.js';
import Registry from './Registry';
import Signal from './Signal';
export default class Router {
    private _client;
    /**
     * Signals used to quickly determine if formal commands need to be processed
     * for a given message.
     */
    signals: Signal[];
    /**
     * The command registry for the router.
     */
    readonly registry: Registry;
    constructor(client: Client);
    reload(): void;
    route(message: Message): void;
    private handleCommands;
}
