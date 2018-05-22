import CommandEvent from './CommandEvent';
import ICommand from './ICommand';
export default class Command implements ICommand {
    handle(e: CommandEvent): void;
}
