"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ExtensionManager_1 = require("../extend/ExtensionManager");
/**
 * The `Client` class extends the base discord.js client, providing an interface for
 * an extensible Discord bot.
 */
class Client extends discord_js_1.Client {
    /**
     * Client constructor.
     */
    constructor(config) {
        super(config.clientOptions);
        this.config = config;
        this.extensions = new ExtensionManager_1.default();
    }
    /**
     * Start the application by logging into the client.
     */
    boot() {
        this.booting();
        this.on('ready', this.booted.bind(this));
        this.login(this.config.auth.discord.token);
    }
    /**
     * Runs when the bot has started boot.
     */
    booting() {
        this.emit('booting', this);
    }
    /**
     * Runs when the bot has successfully logged into the Discord client.
     */
    async booted() {
        await this.extensions.reload();
        this.emit('booted', this);
    }
    async bootstrap() {
        await this.extensions.reload();
    }
}
/**
 * The current discord-bot.js version.
 */
Client.VERSION = 'alpha';
exports.default = Client;
