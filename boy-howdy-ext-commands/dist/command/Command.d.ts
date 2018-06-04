import { Message } from 'discord.js';
import Request from '../route/Request';
import ICommand from './ICommand';
export default abstract class Command implements ICommand {
    protected abstract match(message: Message): any;
    protected abstract matched(message: Message): any;
    handle(request: Request): void;
}
