import ISqlStorage from '../storage/ISqlStorage'
import Extension from './Extension'

type ExtensionRecord = {
  id: string;
  enabled: number;
  version: string;
  installed_on: string;
};

export default class ExtensionRepository {
  private _store: ISqlStorage;

  constructor(store: ISqlStorage) {
    this._store = store;
  }

  public getAll() {
    return this._store.all<ExtensionRecord>(`
      SELECT id, enabled, version, installed_on
      FROM extensions
    `);
  }

  public add(extension: Extension) {
    this._store.run(`
      INSERT INTO extensions (id, enabled, version, installed_on)
      VALUES (?, ?, ?, ?)
    `, extension.id, extension.enabled ? 1 : 0, extension.version, extension.installed ? extension.installed.toISOString() : null);
  }

  public update(extension: Extension) {
    this._store.run(`
      UPDATE extensions
      SET enabled = ?, version = ?, installed_on = ?
      WHERE id = ?
    `, extension.enabled ? 1 : 0, extension.version, extension.installed ? extension.installed.toISOString() : null, extension.id);
  }

  public remove(id: string) {
    this._store.run(`
      DELETE FROM extensions
      WHERE id = ?
    `, id);

    this._store.run(`
      DROP TABLE IF EXISTS "migrations-${id}"
    `);
  }
}
