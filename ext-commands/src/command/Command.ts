import { Message } from 'boy-howdy-core'
import Request from '../route/Request'
import ICommand from './ICommand'

export default abstract class Command implements ICommand {
  protected abstract match(message: Message): boolean;
  protected abstract matched(message: Message): void;

  /**
   * @inheritdoc
   */
  public handle(request: Request) {
    if (this.match(request.originalMessage)) {
      this.matched(request.originalMessage);

      request.handled = true;
    }
  }
}
