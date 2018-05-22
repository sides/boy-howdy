import Client from '../bot/Client'
import Storage from '../storage/ISqlStorage'
import ExtensionRepository from './ExtensionRepository'

export type ExtensionListener = (...args: any[]) => void;
export type ExtensionBootstrapper = (event: string, listener: ExtensionListener) => void;

export default class Extension {
  private mod: any;
  private subscribedListeners: {[event: string]: ExtensionListener};

  id: string;
  name: string;
  version: string;
  path: string;
  modulePath: string;
  migrationsPath: string;
  enabled: boolean;
  installed: Date;

  constructor(id: string, name: string, version: string, path: string, modulePath: string, migrationsPath: string = null) {
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

  enable(client: Client) {
    if (!this.mod.enable) {
      throw new Error('Extension module has no "enable" method.');
    }

    const bootstrapper: ExtensionBootstrapper = (event: string, listener: ExtensionListener) => {
      this.subscribedListeners[event] = listener;
      client.addListener(event, listener);
    };

    this.mod.enable(bootstrapper);

    this.enabled = true;

    client.emit('extensionWasEnabled', this);
  }

  disable(client: Client) {
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

  install(store: Storage) {
    if (this.mod.install) {
      this.mod.install(store);
    }

    this.installed = new Date();

    this.migrate(store, null, this.version);
  }

  migrate(store: Storage, oldVersion: string, newVersion: string) {
    if (this.migrationsPath) {
      if (newVersion === null) {
        store.rollbackToMigration(-1, 'migrations-' + this.id);
      } else {
        store.migrate('migrations-' + this.id, this.migrationsPath);
      }
    }

    if (this.mod.migrate) {
      this.mod.migrate(store, oldVersion, newVersion);
    }
  }

  uninstall(store: Storage) {
    if (this.mod.uninstall) {
      this.mod.uninstall(store);
    }

    this.migrate(store, this.version, null);

    this.installed = null;
  }
}
