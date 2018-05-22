"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Extension {
    constructor(id, name, version, path, modulePath, migrationsPath = null) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.path = path;
        this.modulePath = modulePath;
        this.migrationsPath = migrationsPath;
        this.enabled = false;
        this.installed = null;
        this.mod = require(modulePath);
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
        client.emit('extensionWasEnabled', this);
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
        client.emit('extensionWasDisabled', this);
    }
    install(store) {
        if (this.mod.install) {
            this.mod.install(store);
        }
        this.installed = new Date();
        this.migrate(store, null, this.version);
    }
    migrate(store, oldVersion, newVersion) {
        if (this.migrationsPath) {
            if (newVersion === null) {
                store.rollbackToMigration(-1, 'migrations-' + this.id);
            }
            else {
                store.migrate('migrations-' + this.id, this.migrationsPath);
            }
        }
        if (this.mod.migrate) {
            this.mod.migrate(store, oldVersion, newVersion);
        }
    }
    uninstall(store) {
        if (this.mod.uninstall) {
            this.mod.uninstall(store);
        }
        this.migrate(store, this.version, null);
        this.installed = null;
    }
}
exports.default = Extension;
