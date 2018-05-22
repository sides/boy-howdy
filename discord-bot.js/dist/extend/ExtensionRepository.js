"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExtensionRepository {
    constructor(store) {
        this.store = store;
    }
    getAll() {
        return this.store.all(`
      SELECT id, enabled, version, installed_on
      FROM extensions
    `);
    }
    add(extension) {
        this.store.run(`
      INSERT INTO extensions (id, enabled, version, installed_on)
      VALUES (?, ?, ?, ?)
    `, extension.id, extension.enabled ? 1 : 0, extension.version, extension.installed ? extension.installed.toISOString() : null);
    }
    update(extension) {
        this.store.run(`
      UPDATE extensions
      SET enabled = ?, version = ?, installed_on = ?
      WHERE id = ?
    `, extension.enabled ? 1 : 0, extension.version, extension.installed ? extension.installed.toISOString() : null, extension.id);
    }
    remove(id) {
        this.store.run(`
      DELETE FROM extensions
      WHERE id = ?
    `, id);
        this.store.run(`
      DROP TABLE IF EXISTS "migrations-${id}"
    `);
    }
}
exports.default = ExtensionRepository;
