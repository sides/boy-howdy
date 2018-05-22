import ISqlStorage from '../storage/ISqlStorage'
import Extension from './Extension'

type ExtensionRecord = {
  id: string;
  enabled: number;
  version: string;
  installed_on: string;
};

export default class ExtensionRepository {
  private store: ISqlStorage;

  constructor(store: ISqlStorage) {
    this.store = store;
  }

  getAll() {
    return this.store.all<ExtensionRecord>(`
      SELECT id, enabled, version, installed_on
      FROM extensions
    `);
  }

  add(extension: Extension) {
    this.store.run(`
      INSERT INTO extensions (id, enabled, version, installed_on)
      VALUES (?, ?, ?, ?)
    `, extension.id, extension.enabled ? 1 : 0, extension.version, extension.installed ? extension.installed.toISOString() : null);
  }

  update(extension: Extension) {
    this.store.run(`
      UPDATE extensions
      SET enabled = ?, version = ?, installed_on = ?
      WHERE id = ?
    `, extension.enabled ? 1 : 0, extension.version, extension.installed ? extension.installed.toISOString() : null, extension.id);
  }

  remove(id: string) {
    this.store.run(`
      DELETE FROM extensions
      WHERE id = ?
    `, id);

    this.store.run(`
      DROP TABLE IF EXISTS "migrations-${id}"
    `);
  }
}
