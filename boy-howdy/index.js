import { Client } from 'discord-bot.js'

const config = require('../config.json');
const client = new Client(config);

client.boot();

export default client;
