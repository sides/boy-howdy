require('app-module-path').addPath(__dirname);

import App from 'bot/BotApp'

const config = require('../config.json');
const app = new App(config);

app.boot();

export default app;
