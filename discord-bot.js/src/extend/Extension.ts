import * as pathUtil from 'path'
import Client from '../bot/Client'

type ExtensionListener = (...args: any[]) => void;
type ExtensionBootstrapper = (event: string, listener: ExtensionListener) => void;

export default class Extension {
  private mod: any;
  private subscribedListeners: {[event: string]: ExtensionListener};

  name: string;
  version: string;
  path: string;
  enabled: boolean;

  constructor(name, version, path) {
    this.name = name;
    this.version = version;
    this.path = path;
    this.enabled = false;

    this.mod = require(path);
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
  }

  static fromPackage(pack: any) {
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
