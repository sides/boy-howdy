import CommandEvent from '../route/CommandEvent';
export default interface ICommand {
    handle(e: CommandEvent): void;
}
