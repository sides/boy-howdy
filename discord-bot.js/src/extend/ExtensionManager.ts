import * as pathUtil from 'path'
import Client from '../bot/Client'
import Extension from './Extension'
import Storage from '../storage/ISqlStorage'
import ExtensionRepository from './ExtensionRepository'
import { getInstalledPackages } from '../util/npm'

export default class ExtensionManager {
  private extensions: Extension[];
  private client: Client;
  private store: Storage;
  private repository: ExtensionRepository;

  get all() {
    return this.extensions;
  }

  get enabled() {
    return this.extensions.filter(extension => extension.enabled);
  }

  get disabled() {
    return this.extensions.filter(extension => !extension.enabled);
  }

  constructor(client: Client) {
    this.extensions = [];
    this.client = client;
    this.store = client.store;
    this.repository = new ExtensionRepository(client.store);
  }

  /**
   * Causes any runtime changes made to extensions to persist in storage.
   *
   * @todo This is a simplified `sync`. Find a way to combine the two into one method.
   */
  save() {
    this.extensions.forEach(extension => {
      this.repository.update(extension);
    });
  }

  /**
   * Reloads extensions.
   */
  async reload() {
    this.client.emit('extensionsWillBeReloaded', this.extensions);

    // Begin by disabling all the current extensions.
    this.extensions.forEach(extension => {
      extension.disable(this.client);
    });

    // Fetch a new list of all installed extensions from npm.
    this.extensions = await this.getLoadedExtensions();

    console.log('bootstrapped with ' + this.extensions.length + ' extensions');

    // Synchronize the extensions in storage with the new list.
    await this.sync();

    this.extensions.forEach(extension => {
      console.log('loaded extension: '
        + extension.name
        + ` (enabled? ${extension.enabled ? 'yes' : 'no'}, installed on ${extension.installed ? extension.installed.toLocaleString() : 'never'})`);
    });

    this.client.emit('extensionsWereReloaded', this.extensions);

    return this.extensions;
  }

  /**
   * Synchronizes fresh extensions according to their records. Enables extensions that
   * should be enabled, adds extensions missing from the records, removes records missing
   * from the extension list and migrates extensions that have been updated.
   *
   * This must only be ran from the `reload` method as it expects a fresh list of extensions.
   */
  private async sync() {
    // Get all extensions that have been stored in the database.
    let records = await this.repository.getAll();

    this.extensions.forEach(extension => {
      const foundRecord = records.findIndex(record => record.id == extension.id);

      if (foundRecord !== -1) {
        const record = records[foundRecord];

        if (record.enabled) {
          if (!record.installed_on) {
            extension.install(this.store);
          } else {
            extension.installed = new Date(record.installed_on);

            if (extension.version && record.version != extension.version) {
              extension.migrate(this.store, record.version, extension.version);
            }
          }

          extension.enable(this.client);

          this.repository.update(extension);
        }

        records.splice(foundRecord, 1);
      } else {
        this.repository.add(extension);
      }
    });

    // Found records were removed from this array. The records that remain are for uninstalled
    // packages.
    records.forEach(record => {
      this.repository.remove(record.id);
    });
  }

  private getLoadedExtensions() {
    return getInstalledPackages().then(this.sortExtensionPackages);
  }

  private sortExtensionPackages(packages: Object) {
    return Object.values(packages)
      .filter(ExtensionManager.isValidExtensionPackage)
      .map(ExtensionManager.extensionFromPackage);
  }

  private static isValidExtensionPackage(pack: any) {
    return pack['boy-howdy-extension'] && pack['boy-howdy-extension']['id'];
  }

  private static extensionFromPackage(pack: any) {
    if (!pack.path) {
      throw new Error('Tried to build extension but package metadata has no path.');
    }

    const id = pack['boy-howdy-extension']['id'];
    const name = pack.name || 'unknown';
    const version = pack.version || '0.0.0';
    const path = pack.path;
    const main = pack.main ? pack.main : './index.js';
    const modulePath = pathUtil.join(path, main);

    let migrationsPath = null;

    if (pack['boy-howdy-extension']['migrations']) {
      migrationsPath = pathUtil.join(path, pack['boy-howdy-extension']['migrations']);
    }

    return new Extension(id, name, version, path, modulePath, migrationsPath);
  }
}
