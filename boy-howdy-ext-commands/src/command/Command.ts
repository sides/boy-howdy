import { Message } from 'discord-bot.js'
import Request from '../route/Request'
import ICommand from './ICommand'

export default abstract class Command implements ICommand {
  protected abstract match(message: Message);
  protected abstract matched(message: Message);

  public handle(request: Request) {
    if (this.match(request.originalMessage)) {
      this.matched(request.originalMessage);

      request.handled = true;
    }
  }
}
