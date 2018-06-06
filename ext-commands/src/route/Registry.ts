import ICommand from '../command/ICommand'
import FormalCommand from '../command/FormalCommand'

export default class Registry {
  private _formalCommands: Map<string, FormalCommand>;
  private _genericCommands: ICommand[];

  constructor() {
    this._formalCommands = new Map();
    this._genericCommands = [];
  }

  public getFormalCommands() {
    return this._formalCommands;
  }

  public getGenericCommands() {
    return this._genericCommands;
  }

  public clear() {
    this._formalCommands = new Map();
    this._genericCommands = [];
  }

  public register(command: ICommand, priority = 0) {
    if (command instanceof FormalCommand) {
      this._formalCommands.set(command.name, command);
    } else {
      this._genericCommands.push(command);
    }
  }
}
