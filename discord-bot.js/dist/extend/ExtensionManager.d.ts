import Client from '../bot/Client';
import Extension from './Extension';
export default class ExtensionManager {
    private extensions;
    private client;
    private store;
    private repository;
    readonly all: Extension[];
    readonly enabled: Extension[];
    readonly disabled: Extension[];
    constructor(client: Client);
    /**
     * Causes any runtime changes made to extensions to persist in storage.
     *
     * @todo This is a simplified `sync`. Find a way to combine the two into one method.
     */
    save(): void;
    /**
     * Reloads extensions.
     */
    reload(): Promise<Extension[]>;
    /**
     * Synchronizes fresh extensions according to their records. Enables extensions that
     * should be enabled, adds extensions missing from the records, removes records missing
     * from the extension list and migrates extensions that have been updated.
     *
     * This must only be ran from the `reload` method as it expects a fresh list of extensions.
     */
    private sync();
    private getLoadedExtensions();
    private sortExtensionPackages(packages);
    private static isValidExtensionPackage(pack);
    private static extensionFromPackage(pack);
}
