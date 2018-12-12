import ICommand from './ICommand'
import Request from '../route/Request'
import Context from '../route/Context'
import Signature from './formality/Signature'
import SignatureError  from './formality/SignatureError'

export default abstract class FormalCommand implements ICommand {
  protected _signatures: Signature[] = [];

  /**
   * The name of the command.
   */
  public abstract name: string;

  /**
   * Responds to the command being used.
   */
  public abstract respond(context: Context, ...args: any[]): void;

  /**
   * @inheritdoc
   */
  public async handle(request: Request) {
    try {
      this.respond(request.context, ...await this.processArguments(request.context, request.arguments.slice(1)));
    } catch (err) {
      if (err instanceof SignatureError) {
        request.context.reply(this.helpError(err));
      } else {
        throw err;
      }
    }

    request.handled = true;
  }

  /**
   * Prints usage help for an error.
   *
   * @param err An error that help is needed with.
   */
  public helpError(err?: SignatureError) {
    const msg = [`❗ ${err.message}`];

    msg.push('```');
    msg.push(`${this.name} ${err}`);
    msg.push('```');

    return msg.join('\n');
  }

  /**
   * @todo Actually process signatures async? It would force signatures
   *       to be unique instead of being able to rely on their order.
   *       However it may actually be less performant as the first
   *       signature can be the most commonly used one, so less time is
   *       spent processing rarely used signatures.
   */
  protected async processArguments(context: Context, rawArgs: string[]) {
    if (this._signatures.length === 0) {
      return rawArgs;
    }

    let bestError: SignatureError;

    for (let i = 0; i < this._signatures.length; i++) {
      try {
        // Return the first signature that succeeds.
        return await this._signatures[i].process(context, rawArgs);
      } catch (err) {
        if (err instanceof SignatureError) {
          // The more specific the error the better.
          if (bestError === undefined ||
            (err.index !== undefined && bestError.index === undefined)
          ) {
            bestError = err;
          }
        } else {
          throw err;
        }
      }
    }

    throw bestError;
  }
}
