import Client from '../bot/Client';
import Storage from '../storage/ISqlStorage';
export declare type ExtensionListener = (...args: any[]) => void;
export declare type ExtensionBootstrapper = (event: string, listener: ExtensionListener) => void;
export default class Extension {
    private mod;
    private subscribedListeners;
    id: string;
    name: string;
    version: string;
    path: string;
    modulePath: string;
    migrationsPath: string;
    enabled: boolean;
    installed: Date;
    constructor(id: string, name: string, version: string, path: string, modulePath: string, migrationsPath?: string);
    enable(client: Client): void;
    disable(client: Client): void;
    install(store: Storage): void;
    migrate(store: Storage, oldVersion: string, newVersion: string): void;
    uninstall(store: Storage): void;
}
