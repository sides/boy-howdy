import ICommand from '../command/ICommand'
import FormalCommand from '../command/FormalCommand'

export default class Registry {
  private formalCommands: FormalCommand[];
  private informalCommands: ICommand[];

  constructor() {
    this.formalCommands = [];
    this.informalCommands = [];
  }

  getFormalCommands() {
    return this.formalCommands.slice();
  }

  getInformalCommands() {
    return this.informalCommands.slice();
  }

  getAllCommands() {
    return (this.formalCommands as ICommand[]).concat(this.informalCommands);
  }

  clear() {
    this.formalCommands = [];
    this.informalCommands = [];
  }

  register(command: ICommand, priority = 0) {
    if (command instanceof FormalCommand) {
      this.formalCommands.push(command);
    } else {
      this.informalCommands.push(command);
    }
  }
}
