import { ClientOptions } from 'discord.js';
/**
 * The `Config` class stores the client's current configuration and handles
 * defaults.
 */
export default class Config {
    /**
     * Raw client options for connecting to the discord.js client.
     */
    clientOptions?: ClientOptions;
    /**
     * Whether or not the bot is in debug mode.
     */
    debug?: boolean;
    /**
     * Tokens and other information for connecting to other services.
     */
    auth?: {
        discord: {
            token: string;
        };
    };
    storage?: {
        path: string;
    };
}
