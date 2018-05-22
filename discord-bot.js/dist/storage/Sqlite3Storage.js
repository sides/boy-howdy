"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = require("sqlite");
class Sqlite3Storage {
    /**
     * Creates a new instance of `Sqlite3Storage` as well as immediately
     * opening a connection to the database in the given path.
     */
    constructor(path) {
        this.db = null;
        sqlite_1.open(path)
            .then(db => this.db = db);
    }
    run(sql, ...params) {
        if (this.db === null) {
            throw new Error('Attempt to run a query on a closed database.');
        }
        return this.db.run(sql, params);
    }
    get(sql, ...params) {
        if (this.db === null) {
            throw new Error('Attempt to run a query on a closed database.');
        }
        return this.db.get(sql, params);
    }
    all(sql, ...params) {
        if (this.db === null) {
            throw new Error('Attempt to run a query on a closed database.');
        }
        return this.db.all(sql, params);
    }
    destroy() {
        if (this.db === null) {
            return Promise.resolve();
        }
        return this.db.close()
            .then(() => { this.db = null; });
    }
    migrate(table, path) {
        if (this.db === null) {
            throw new Error('Attempt to run a query on a closed database.');
        }
        this.db.migrate({ table: table, migrationsPath: path });
    }
    async rollbackToMigration(id, table) {
        if (this.db === null) {
            throw new Error('Attempt to run a query on a closed database.');
        }
        const rollbackMigrations = await this.db.all(`
      SELECT id, down FROM "${table}"
      WHERE id > ?
      ORDER BY id ASC
    `, id);
        await this.db.run('BEGIN');
        try {
            rollbackMigrations.forEach(async (migration) => {
                await this.db.exec(migration.down);
                await this.db.run(`DELETE FROM "${table}" WHERE id = ?`, migration.id);
            });
            await this.db.run('COMMIT');
        }
        catch (err) {
            await this.db.run('ROLLBACK');
            throw err;
        }
    }
}
exports.default = Sqlite3Storage;
