import Extension from './Extension';
export default class ExtensionManager {
    private extensions;
    readonly all: Extension[];
    readonly enabled: Extension[];
    readonly disabled: Extension[];
    reload(): Promise<Extension[]>;
    private getLoadedExtensions();
    private sortExtensionPackages(packages);
}
