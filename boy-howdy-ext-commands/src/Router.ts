import { Message } from 'discord.js'
import ICommand from './ICommand'
import CommandEvent from './CommandEvent'

export default class Router {
  onMessage(message: Message) {
    const e = new CommandEvent(message);
    const commands: ICommand[] = [];

    message.client.emit('configureCommandRouterCommands', commands);

    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].handle(e);

      if (e.handled) {
        break;
      }
    }
  }
}
