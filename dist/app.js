"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('app-module-path').addPath(__dirname);
const BotApp_1 = require("bot/BotApp");
const config = require('../config.json');
const app = new BotApp_1.default(config);
app.boot();
exports.default = app;
