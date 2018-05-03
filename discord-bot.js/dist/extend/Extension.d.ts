import Client from '../bot/Client';
export default class Extension {
    private mod;
    private subscribedListeners;
    name: string;
    version: string;
    path: string;
    enabled: boolean;
    constructor(name: any, version: any, path: any);
    enable(client: Client): void;
    disable(client: Client): void;
    static fromPackage(pack: any): Extension;
}
