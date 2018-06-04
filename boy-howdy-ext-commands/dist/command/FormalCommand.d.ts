import ICommand from './ICommand';
import Request from '../route/Request';
export default abstract class FormalCommand implements ICommand {
    abstract name: string;
    abstract run(request: Request, ...args: any[]): any;
    handle(request: Request): void;
}
