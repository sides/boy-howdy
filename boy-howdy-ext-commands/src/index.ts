import { Client, ExtensionBootstrapper } from 'discord-bot.js'
import Router from './route/Router'

export function enable(on: ExtensionBootstrapper) {
  on('readyAndBootstrapped', (client: Client) => {
    const router = new Router(client);

    on('extensionsWereReloaded', router.reload.bind(router));
    on('message', router.route.bind(router));
  });
}
