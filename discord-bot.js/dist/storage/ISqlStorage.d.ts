import IStorage from './IStorage';
export default interface ISqlStorage extends IStorage {
    /**
     * Runs an SQL query on the store.
     *
     * @param  sql    The SQL query. Can contain placeholders that are sanitized
     *                with input from the params argument.
     * @param  params Values to replace placeholders in the query.
     */
    run(sql: string, ...params: any[]): Promise<any>;
    /**
     * Runs a SELECT query on the store, returning the first matching record.
     *
     * @param  sql    The SQL query. Can contain placeholders that are sanitized
     *                with input from the params argument.
     * @param  params Values to replace placeholders in the query.
     */
    get(sql: string, ...params: any[]): Promise<any>;
    /**
     * Runs a SELECT query on the store, returning the first matching record.
     *
     * @param  sql    The SQL query. Can contain placeholders that are sanitized
     *                with input from the params argument.
     * @param  params Values to replace placeholders in the query.
     */
    get<T>(sql: string, ...params: any[]): Promise<T>;
    /**
     * Runs a SELECT query on the store, returning all matching records.
     *
     * @param  sql    The SQL query. Can contain placeholders that are sanitized
     *                with input from the params argument.
     * @param  params Values to replace placeholders in the query.
     */
    all(sql: string, ...params: any[]): Promise<any[]>;
    /**
     * Runs a SELECT query on the store, returning all matching records.
     *
     * @param  sql    The SQL query. Can contain placeholders that are sanitized
     *                with input from the params argument.
     * @param  params Values to replace placeholders in the query.
     */
    all<T>(sql: string, ...params: any[]): Promise<T[]>;
    /**
     * Runs SQL migrations.
     *
     * @param table The table the migration history is stored in.
     * @param path  The path to migration files.
     */
    migrate(table: string, path: string): void;
    /**
     * Rolls back SQL migrations to the specified ID.
     *
     * @param id    The ID of the migration to roll back to.
     * @param table The table the migration history is stored in.
     */
    rollbackToMigration(id: number, table: string): void;
}
