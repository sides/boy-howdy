import { Client, ExtensionBootstrapper, Message } from 'boy-howdy-core'
import Router from './route/Router'

export function enable(on: ExtensionBootstrapper) {
  on('readyAndBootstrapped', (client: Client) => {
    const router = new Router(client);

    on('extensionsWereReloaded', router.reload.bind(router));
    on('message', router.route.bind(router));
  });
}

// Library exports
export { default as Registry } from './route/Registry'
export { default as Request } from './route/Request'
export { default as Router } from './route/Router'
export { default as Signal } from './route/Signal'
export { default as Command } from './command/Command'
export { default as FormalCommand } from './command/FormalCommand'
export { default as ICommand } from './command/ICommand'
export { default as RegexCommand } from './command/RegexCommand'
export { default as IMutator } from './command/formality/IMutator'
