import ICommand from './ICommand'
import Request from '../route/Request'

export default abstract class FormalCommand implements ICommand {
  public abstract name: string;

  public abstract run(request: Request, ...args: any[]);

  public handle(request: Request) {
    if (this.name === request.command) {
      this.run(request, request.arguments.slice(1));

      request.handled = true;
    }
  }
}
