import CommandEvent from './CommandEvent';
export default interface ICommand {
    handle(e: CommandEvent): void;
}
