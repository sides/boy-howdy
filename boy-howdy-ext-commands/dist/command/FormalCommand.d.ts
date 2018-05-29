import ICommand from './ICommand';
export default abstract class FormalCommand implements ICommand {
    handle(): void;
}
