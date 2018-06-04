import ICommand from '../command/ICommand'
import FormalCommand from '../command/FormalCommand'

export default class Registry {
  private _formalCommands: FormalCommand[];
  private _informalCommands: ICommand[];

  constructor() {
    this._formalCommands = [];
    this._informalCommands = [];
  }

  public getFormalCommands() {
    return this._formalCommands.slice();
  }

  public getInformalCommands() {
    return this._informalCommands.slice();
  }

  public getAllCommands() {
    return (this._formalCommands as ICommand[]).concat(this._informalCommands);
  }

  public clear() {
    this._formalCommands = [];
    this._informalCommands = [];
  }

  public register(command: ICommand, priority = 0) {
    if (command instanceof FormalCommand) {
      this._formalCommands.push(command);
    } else {
      this._informalCommands.push(command);
    }
  }
}
