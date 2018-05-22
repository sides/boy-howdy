import ISqlStorage from '../storage/ISqlStorage';
import Extension from './Extension';
export default class ExtensionRepository {
    private store;
    constructor(store: ISqlStorage);
    getAll(): Promise<{
        id: string;
        enabled: number;
        version: string;
        installed_on: string;
    }[]>;
    add(extension: Extension): void;
    update(extension: Extension): void;
    remove(id: string): void;
}
