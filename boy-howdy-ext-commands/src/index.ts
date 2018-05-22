import { Client, ExtensionBootstrapper } from 'discord-bot.js'
import Router from './Router'
import Command from './Command'

export function enable(on: ExtensionBootstrapper) {
  const router = new Router();

  on('configureCommandRouterCommands', commands => {
    const cmd = new Command();
    commands.push(cmd);
  });

  on('message', router.onMessage);
}
