"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Extension_1 = require("./Extension");
const npm_1 = require("../util/npm");
class ExtensionManager {
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
    getLoadedExtensions() {
        return npm_1.getInstalledPackages().then(this.sortExtensionPackages);
    }
    sortExtensionPackages(packages) {
        return Object.values(packages)
            .filter(pack => !!pack['boy-howdy-extension'])
            .map(Extension_1.default.fromPackage);
    }
}
exports.default = ExtensionManager;
