import { Message } from 'discord.js';
import ICommand from './ICommand';
import Request from '../route/Request';
export default abstract class RegexCommand implements ICommand {
    protected pattern: RegExp;
    protected abstract matched(message: Message, values: RegExpExecArray | RegExpExecArray[]): any;
    protected quickMatch(message: Message): boolean;
    handle(request: Request): void;
}
