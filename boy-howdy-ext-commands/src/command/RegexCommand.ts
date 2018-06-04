import { Message } from 'discord.js'
import ICommand from './ICommand'
import Request from '../route/Request'

export default abstract class RegexCommand implements ICommand {
  protected pattern: RegExp;

  protected abstract matched(message: Message, values: RegExpExecArray | RegExpExecArray[]);

  protected quickMatch(message: Message) {
    return true;
  }

  handle(request: Request) {
    if (!this.quickMatch(request.originalMessage)) {
      return;
    }

    let result = this.pattern.exec(request.originalMessage.content);

    if (!result) {
      return;
    }

    if (!this.pattern.global) {
      this.matched(request.originalMessage, result);
    } else {
      let resultSet = [result];

      while (result = this.pattern.exec(request.originalMessage.content)) {
        resultSet.push(result);
      }

      this.matched(request.originalMessage, resultSet);
    }

    request.handled = true;
  }
}
