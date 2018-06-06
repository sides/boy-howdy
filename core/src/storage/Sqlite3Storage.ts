import { open as openDatabase, Database } from 'sqlite'
import ISqlStorage from './ISqlStorage'

export default class Sqlite3Storage implements ISqlStorage {
  private _db: Database;

  /**
   * Creates a new instance of `Sqlite3Storage` as well as immediately
   * opening a connection to the database in the given path.
   */
  constructor(path: string) {
    this._db = null;

    openDatabase(path)
      .then(db => this._db = db);
  }

  public run(sql: string, ...params: any[]): Promise<any> {
    if (this._db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    return this._db.run(sql, params);
  }

  public get<T = any>(sql: string, ...params: any[]): Promise<T> {
    if (this._db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    return this._db.get(sql, params);
  }

  public all<T = any>(sql: string, ...params: any[]): Promise<T[]> {
    if (this._db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    return this._db.all(sql, params);
  }

  public destroy() {
    if (this._db === null) {
      return Promise.resolve();
    }

    return this._db.close()
      .then(() => { this._db = null });
  }

  public migrate(table: string, path: string) {
    if (this._db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    this._db.migrate({ table: table, migrationsPath: path });
  }

  public async rollbackToMigration(id: number, table: string) {
    if (this._db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    const rollbackMigrations = await this._db.all(`
      SELECT id, down FROM "${table}"
      WHERE id > ?
      ORDER BY id ASC
    `, id);

    await this._db.run('BEGIN');

    try {
      rollbackMigrations.forEach(async migration => {
        await this._db.exec(migration.down);
        await this._db.run(`DELETE FROM "${table}" WHERE id = ?`, migration.id);
      });

      await this._db.run('COMMIT');
    } catch (err) {
      await this._db.run('ROLLBACK');
      throw err;
    }
  }
}
