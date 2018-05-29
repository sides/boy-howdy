import { Message } from 'discord.js'
import { Client } from 'discord-bot.js'
import ICommand from '../command/ICommand'
import CommandEvent from './CommandEvent'
import VersionCommand from '../builtin/VersionCommand'

export default class Router {
  private client: Client;
  private commands: ICommand[];

  constructor(client: Client) {
    this.client = client;

    this.reload();
  }

  reload() {
    this.commands = [
      new VersionCommand()
    ];

    this.client.emit('configureCommandRouterCommands', this.commands);
  }

  onMessage(message: Message) {
    const e = new CommandEvent(message);

    for (let i = 0, l = this.commands.length; i < l; i++) {
      this.commands[i].handle(e);

      if (e.handled) {
        break;
      }
    }
  }
}
