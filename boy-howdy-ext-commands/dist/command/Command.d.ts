import { Message } from 'discord.js';
import CommandEvent from '../route/CommandEvent';
import ICommand from './ICommand';
export default abstract class Command implements ICommand {
    protected abstract match(message: Message): any;
    protected abstract matched(message: Message): any;
    handle(e: CommandEvent): void;
}
