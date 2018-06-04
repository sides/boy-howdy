import ICommand from '../command/ICommand';
import FormalCommand from '../command/FormalCommand';
export default class Registry {
    private formalCommands;
    private informalCommands;
    constructor();
    getFormalCommands(): FormalCommand[];
    getInformalCommands(): ICommand[];
    getAllCommands(): ICommand[];
    clear(): void;
    register(command: ICommand, priority?: number): void;
}
