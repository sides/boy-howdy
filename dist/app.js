"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('app-module-path').addPath(__dirname);
const App_1 = require("lib/App");
const config = require('../config.json');
const app = new App_1.default(config);
app.boot();
exports.default = app;
