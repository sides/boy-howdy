import * as Discord from 'discord.js'
import IConfig from 'lib/IConfig'

export default class App {
    /**
     * The app's Discord client.
     */
    protected client: Discord.Client;

    /**
     * The configuration for the app.
     */
    protected config: IConfig;

    constructor(config?: IConfig) {
      this.config = config || {};
      this.client = new Discord.Client(config.clientOptions);
    }

    /**
     * Start the application by logging into the client.
     */
    boot() {
      this.booting();
      this.client.on('ready', this.booted.bind(this));
      this.client.login(this.config.auth.discord.token);
    }

    /**
     * Runs when the app has started boot.
     */
    booting() {

    }

    /**
     * Runs when the app has successfully logged into the client.
     */
    booted() {

    }
}
