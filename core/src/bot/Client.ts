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
     * The current Boy Howdy version.
     */
    public static readonly VERSION: string = require('../../package.json').version;

    /**
     * The configuration for the bot.
     */
    public readonly config: Config;

    /**
     * The extension manager for the bot.
     */
    public readonly extensions: ExtensionManager;

    /**
     * The (sqlite3) store for the bot.
     */
    public readonly store: Sqlite3Storage;

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
    public boot() {
      this.on('ready', this.bootstrap);
      this.login(this.config.auth.discord.token);
    }

    /**
     * Logs out, terminates the connection to Discord, and destroys the client.
     */
    public destroy() {
      if (this.store) {
        this.store.destroy();
      }

      this.emit('destroy');

      return super.destroy();
    }

    /**
     * Bootstraps the client. Runs after the bot successfully logs in.
     */
    protected async bootstrap() {
      await this.extensions.reload();

      this.emit('readyAndBootstrapped', this);
    }
}
