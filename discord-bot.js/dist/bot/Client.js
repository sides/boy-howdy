"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ExtensionManager_1 = require("../extend/ExtensionManager");
const Sqlite3Storage_1 = require("../storage/Sqlite3Storage");
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
        this.store = new Sqlite3Storage_1.default(config.storage.path);
        this.extensions = new ExtensionManager_1.default(this);
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
     * Logs out, terminates the connection to Discord, and destroys the client.
     */
    destroy() {
        if (this.store) {
            this.store.destroy();
        }
        return super.destroy();
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
    booted() {
        Promise.all([
            this.extensions.reload()
        ]).then(() => this.emit('readyAndBootstrapped', this))
            .catch(err => { throw err; });
    }
}
/**
 * The current discord-bot.js version.
 */
Client.VERSION = require('../../package.json').version;
exports.default = Client;
