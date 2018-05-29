import { Message } from 'discord.js'
import ICommand from './ICommand'
import CommandEvent from '../route/CommandEvent'

export default abstract class RegexCommand implements ICommand {
  protected expression: RegExp;

  protected abstract matched(message: Message, values: RegExpExecArray | RegExpExecArray[]);

  handle(e: CommandEvent) {
    let result = this.expression.exec(e.message.content);

    if (!result) {
      return;
    }

    if (!this.expression.global) {
      this.matched(e.message, result);
    } else {
      let resultSet = [result];

      while (result = this.expression.exec(e.message.content)) {
        resultSet.push(result);
      }

      this.matched(e.message, resultSet);
    }

    e.handled = true;
  }
}
