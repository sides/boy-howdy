import Client from '../bot/Client'
import Storage from '../storage/ISqlStorage'
import ExtensionRepository from './ExtensionRepository'

export type ExtensionListener = (...args: any[]) => void;
export type ExtensionBootstrapper = (event: string, listener: ExtensionListener) => void;

export default class Extension {
  private _mod: any;
  private _subscribedListeners: {[event: string]: ExtensionListener};

  public id: string;
  public name: string;
  public version: string;
  public path: string;
  public modulePath: string;
  public migrationsPath: string;
  public enabled: boolean;
  public installed: Date;

  constructor(id: string, name: string, version: string, path: string, modulePath: string, migrationsPath: string = null) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.path = path;
    this.modulePath = modulePath;
    this.migrationsPath = migrationsPath;
    this.enabled = false;
    this.installed = null;

    this._mod = require(modulePath);
    this._subscribedListeners = {};
  }

  public enable(client: Client) {
    if (!this._mod.enable) {
      throw new Error('Extension module has no "enable" method.');
    }

    const bootstrapper: ExtensionBootstrapper = (event: string, listener: ExtensionListener) => {
      this._subscribedListeners[event] = listener;
      client.addListener(event, listener);
    };

    this._mod.enable(bootstrapper);

    this.enabled = true;

    client.emit('extensionWasEnabled', this);
  }

  public disable(client: Client) {
    Object.keys(this._subscribedListeners).forEach(key => {
      client.removeListener(key, this._subscribedListeners[key]);
    });

    this._subscribedListeners = {};

    if (this._mod.disable) {
      this._mod.disable();
    }

    this.enabled = false;

    client.emit('extensionWasDisabled', this);
  }

  public install(store: Storage) {
    if (this._mod.install) {
      this._mod.install(store);
    }

    this.installed = new Date();

    this.migrate(store, null, this.version);
  }

  public migrate(store: Storage, oldVersion: string, newVersion: string) {
    if (this.migrationsPath) {
      if (newVersion === null) {
        store.rollbackToMigration(-1, 'migrations-' + this.id);
      } else {
        store.migrate('migrations-' + this.id, this.migrationsPath);
      }
    }

    if (this._mod.migrate) {
      this._mod.migrate(store, oldVersion, newVersion);
    }
  }

  public uninstall(store: Storage) {
    if (this._mod.uninstall) {
      this._mod.uninstall(store);
    }

    this.migrate(store, this.version, null);

    this.installed = null;
  }
}
