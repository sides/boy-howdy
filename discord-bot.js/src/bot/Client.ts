import { Client as BaseClient } from 'discord.js'
import Config from './Config'
import ExtensionManager from '../extend/ExtensionManager'
import Sqlite3Storage from '../storage/Sqlite3Storage'

/**
 * The `Client` class extends the base discord.js client, providing an interface for
 * an extensible Discord bot.
 */
export default class Client extends BaseClient {
    /**
     * The current discord-bot.js version.
     */
    static readonly VERSION: string = require('../../package.json').version;

    /**
     * The configuration for the bot.
     */
    readonly config: Config;

    /**
     * The extension manager for the bot.
     */
    readonly extensions: ExtensionManager;

    /**
     * The (sqlite3) store for the bot.
     */
    readonly store: Sqlite3Storage;

    /**
     * Client constructor.
     */
    constructor(config: Config) {
      super(config.clientOptions);

      this.config = config;
      this.store = new Sqlite3Storage(config.storage.path);
      this.extensions = new ExtensionManager(this);
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
    protected booting() {
      this.emit('booting', this);
    }

    /**
     * Runs when the bot has successfully logged into the Discord client.
     */
    protected booted() {
      Promise.all([
        this.extensions.reload()
      ]).then(() => this.emit('readyAndBootstrapped', this))
        .catch(err => { throw err; });
    }
}
