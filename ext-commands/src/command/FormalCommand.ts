import { Client } from 'boy-howdy-core'
import ICommand from './ICommand'
import FormalCommandContext from './FormalCommandContext'
import Request from '../route/Request'
import IMutator from './mutate/IMutator'

export default abstract class FormalCommand implements ICommand {
  protected _signatures: IMutator<any>[] = [];

  public abstract name: string;

  public abstract respond(context: FormalCommandContext, ...args: any[]): void;

  protected async mutateArgs(context: FormalCommandContext, rawArgs: string[]) {
    if (this._signatures.length === 0) {
      return rawArgs;
    }

    let args = [];

    for (let i = 0; i < rawArgs.length; i++) {
      if (this._signatures[i]) {
        args.push(await this._signatures[i].mutate(context, rawArgs[i]));
      } else {
        args.push(rawArgs[i]);
      }
    }

    return args;
  }

  public async handle(request: Request) {
    const context = new FormalCommandContext(request.originalMessage.client as Client,
      request.originalMessage.channel,
      request.originalMessage.author,
      request.content);

    let args: any[] = [context];

    args.push.apply(args, await this.mutateArgs(context, request.arguments.slice(1)));

    this.respond.apply(this, args);

    request.handled = true;
  }
}
