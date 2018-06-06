import { Client, ExtensionBootstrapper, Message } from 'boy-howdy-core'
import Router from './route/Router'

export function enable(on: ExtensionBootstrapper) {
  on('readyAndBootstrapped', (client: Client) => {
    const router = new Router(client);

    on('extensionsWereReloaded', router.reload.bind(router));

    on('message', (message: Message) => {
      if (message.author.id === client.user.id) {
        return;
      }

      router.route(message);
    });
  });
}
