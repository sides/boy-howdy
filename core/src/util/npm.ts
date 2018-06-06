import { exec } from 'child_process'

export function getInstalledPackages() {
  return new Promise<any>((resolve, reject) => {
    exec('npm ls --depth=0 --json --long --prod', (error, stdout, stderr) => {
      if (error) {
        throw error;
      }

      const json = JSON.parse(stdout);

      resolve(json.dependencies);
    });
  });
}
