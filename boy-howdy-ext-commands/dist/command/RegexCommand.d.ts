import { Message } from 'discord.js';
import ICommand from './ICommand';
import CommandEvent from '../route/CommandEvent';
export default abstract class RegexCommand implements ICommand {
    protected expression: RegExp;
    protected abstract matched(message: Message, values: RegExpExecArray | RegExpExecArray[]): any;
    handle(e: CommandEvent): void;
}
