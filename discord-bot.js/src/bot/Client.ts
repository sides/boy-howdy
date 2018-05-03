import { Client as BaseClient } from 'discord.js'
import Config from './Config'
import ExtensionManager from '../extend/ExtensionManager'

/**
 * The `Client` class extends the base discord.js client, providing an interface for
 * an extensible Discord bot.
 */
export default class Client extends BaseClient {
    /**
     * The current discord-bot.js version.
     */
    static readonly VERSION = 'alpha';

    /**
     * The configuration for the bot.
     */
    readonly config: Config;

    /**
     * The extension manager for the bot.
     */
    readonly extensions: ExtensionManager;

    /**
     * Client constructor.
     */
    constructor(config: Config) {
      super(config.clientOptions);

      this.config = config;
      this.extensions = new ExtensionManager();
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
    protected booting() {
      this.emit('booting', this);
    }

    /**
     * Runs when the bot has successfully logged into the Discord client.
     */
    protected async booted() {
      await this.extensions.reload();

      this.emit('booted', this);
    }

    private async bootstrap() {
      await this.extensions.reload();


    }
}
