import { Message } from 'boy-howdy-core'
import ICommand from './ICommand'
import Request from '../route/Request'

export default abstract class RegexCommand implements ICommand {
  protected _pattern: RegExp;

  protected abstract matched(message: Message, values: RegExpExecArray | RegExpExecArray[]);

  protected quickMatch(message: Message) {
    return true;
  }

  public handle(request: Request) {
    if (!this.quickMatch(request.originalMessage)) {
      return;
    }

    let result = this._pattern.exec(request.originalMessage.content);

    if (!result) {
      return;
    }

    if (!this._pattern.global) {
      this.matched(request.originalMessage, result);
    } else {
      let resultSet = [result];

      while (result = this._pattern.exec(request.originalMessage.content)) {
        resultSet.push(result);
      }

      this.matched(request.originalMessage, resultSet);
    }

    request.handled = true;
  }
}
