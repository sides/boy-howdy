import { Client as BaseClient } from 'discord.js';
import Config from './Config';
import ExtensionManager from '../extend/ExtensionManager';
import Sqlite3Storage from '../storage/Sqlite3Storage';
/**
 * The `Client` class extends the base discord.js client, providing an interface for
 * an extensible Discord bot.
 */
export default class Client extends BaseClient {
    /**
     * The current discord-bot.js version.
     */
    static readonly VERSION: string;
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
    constructor(config: Config);
    /**
     * Start the application by logging into the client.
     */
    boot(): void;
    /**
     * Logs out, terminates the connection to Discord, and destroys the client.
     */
    destroy(): Promise<void>;
    /**
     * Runs when the bot has started boot.
     */
    protected booting(): void;
    /**
     * Runs when the bot has successfully logged into the Discord client.
     */
    protected booted(): void;
}
