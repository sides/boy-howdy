import { open as openDatabase, Database } from 'sqlite'
import ISqlStorage from './ISqlStorage'

export default class Sqlite3Storage implements ISqlStorage {
  private db: Database;

  /**
   * Creates a new instance of `Sqlite3Storage` as well as immediately
   * opening a connection to the database in the given path.
   */
  constructor(path: string) {
    this.db = null;

    openDatabase(path)
      .then(db => this.db = db);
  }

  run(sql: string, ...params: any[]): Promise<any> {
    if (this.db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    return this.db.run(sql, params);
  }

  get<T = any>(sql: string, ...params: any[]): Promise<T> {
    if (this.db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    return this.db.get(sql, params);
  }

  all<T = any>(sql: string, ...params: any[]): Promise<T[]> {
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
      .then(() => { this.db = null });
  }

  migrate(table: string, path: string) {
    if (this.db === null) {
      throw new Error('Attempt to run a query on a closed database.');
    }

    this.db.migrate({ table: table, migrationsPath: path });
  }

  async rollbackToMigration(id: number, table: string) {
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
      rollbackMigrations.forEach(async migration => {
        await this.db.exec(migration.down);
        await this.db.run(`DELETE FROM "${table}" WHERE id = ?`, migration.id);
      });

      await this.db.run('COMMIT');
    } catch (err) {
      await this.db.run('ROLLBACK');
      throw err;
    }
  }
}
