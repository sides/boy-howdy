import { readdir, stat } from 'fs'
import { join, dirname } from 'path'

/**
 * Get packages in the main module's `node_modules` whose names start
 * with `boy-howdy-ext-`.
 */
export function getExtensionPackages() {
  return new Promise<any[]>((resolve, reject) => {
    readdir('node_modules', (err, files) => {
      if (err) throw err;

      Promise.all(
        files
          .filter(file => file.startsWith('boy-howdy-ext-'))
          .map(file => new Promise((statResolve, statReject) => {
            stat(join('node_modules', file), (err, stats) => {
              if (err) throw err;

              if (stats.isDirectory()) {
                const pack = require.main.require(join(file, 'package.json'));

                pack.path = join(dirname(require.main.filename), 'node_modules', file);

                statResolve(pack);
              }
            });
          }))
      ).then(resolve);
    });
  });
}
