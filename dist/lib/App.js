"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
class App {
    constructor(config) {
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
exports.default = App;
