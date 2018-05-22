import ISqlStorage from './ISqlStorage';
export default class Sqlite3Storage implements ISqlStorage {
    private db;
    /**
     * Creates a new instance of `Sqlite3Storage` as well as immediately
     * opening a connection to the database in the given path.
     */
    constructor(path: string);
    run(sql: string, ...params: any[]): Promise<any>;
    get<T = any>(sql: string, ...params: any[]): Promise<T>;
    all<T = any>(sql: string, ...params: any[]): Promise<T[]>;
    destroy(): Promise<void>;
    migrate(table: string, path: string): void;
    rollbackToMigration(id: number, table: string): Promise<void>;
}
