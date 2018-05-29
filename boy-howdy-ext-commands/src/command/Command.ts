import { Message } from 'discord.js'
import CommandEvent from '../route/CommandEvent'
import ICommand from './ICommand'

export default abstract class Command implements ICommand {
  protected abstract match(message: Message);
  protected abstract matched(message: Message);

  handle(e: CommandEvent) {
    if (this.match(e.message)) {
      this.matched(e.message);

      e.handled = true;
    }
  }
}
