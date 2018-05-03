import Extension from './Extension'
import { getInstalledPackages } from '../util/npm'

export default class ExtensionManager {
  private extensions: Extension[];

  get all() {
    return this.extensions;
  }

  get enabled() {
    return this.extensions.filter(extension => extension.enabled);
  }

  get disabled() {
    return this.extensions.filter(extension => !extension.enabled);
  }

  reload() {
    return this.getLoadedExtensions().then(extensions => {
      this.extensions = extensions;

      return this.extensions;
    });
  }

  private getLoadedExtensions() {
    return getInstalledPackages().then(this.sortExtensionPackages);
  }

  private sortExtensionPackages(packages: Object) {
    return Object.values(packages)
      .filter(pack => !!pack['boy-howdy-extension'])
      .map(Extension.fromPackage);
  }
}
