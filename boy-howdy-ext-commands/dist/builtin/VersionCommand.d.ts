import { Message } from 'discord.js';
import RegexCommand from '../command/RegexCommand';
export default class VersionCommand extends RegexCommand {
    protected expression: RegExp;
    protected matched(message: Message): void;
}
