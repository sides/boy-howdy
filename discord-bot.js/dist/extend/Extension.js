"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathUtil = require("path");
class Extension {
    constructor(name, version, path) {
        this.name = name;
        this.version = version;
        this.path = path;
        this.enabled = false;
        this.mod = require(path);
        this.subscribedListeners = {};
    }
    enable(client) {
        if (!this.mod.enable) {
            throw new Error('Extension module has no "enable" method.');
        }
        const bootstrapper = (event, listener) => {
            this.subscribedListeners[event] = listener;
            client.addListener(event, listener);
        };
        this.mod.enable(bootstrapper);
        this.enabled = true;
    }
    disable(client) {
        Object.keys(this.subscribedListeners).forEach(key => {
            client.removeListener(key, this.subscribedListeners[key]);
        });
        this.subscribedListeners = {};
        if (this.mod.disable) {
            this.mod.disable();
        }
        this.enabled = false;
    }
    static fromPackage(pack) {
        if (!pack.path) {
            throw new Error('Tried to build extension but package metadata has no path.');
        }
        const name = pack.name || 'unknown';
        const version = pack.version || '0.0.0';
        const path = pack.path;
        const main = pack.main ? pack.main : './index.js';
        const fullPath = pathUtil.join(path, main);
        return new Extension(name, version, fullPath);
    }
}
exports.default = Extension;
