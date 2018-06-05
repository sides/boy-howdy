import { Client, Message } from 'discord-bot.js'
import ICommand from '../command/ICommand'
import Request from './Request'
import Registry from './Registry'
import Signal from './Signal'
import VersionCommand from '../command/commands/VersionCommand'
import SlapCommand from '../command/commands/SlapCommand'

export default class Router {
  private _client: Client;

  /**
   * Signals used to quickly determine if formal commands need to be processed
   * for a given message.
   */
  public signals: Signal[];

  /**
   * The command registry for the router.
   */
  public readonly registry: Registry;

  constructor(client: Client) {
    this._client = client;
    this.registry = new Registry();

    this.reload();
  }

  public reload() {
    this.signals = [];

    if (this._client.config.commands.signal) {
      if (this._client.config.commands.signal === '@mention') {
        this.signals.push(Signal.createMentionSignal(this._client.user));
      } else {
        this.signals.push(new Signal(this._client.config.commands.signal));
      }
    }

    this.registry.clear();
    this.registry.register(new VersionCommand());
    this.registry.register(new SlapCommand());

    this._client.emit('configureCommandRouter', this);
  }

  public route(message: Message) {
    const request = new Request(message, this.signals);

    // Begin by going over informal commands that could be anything. Since this
    // is ran on every message, having many informal commands can negatively affect
    // performance, especially if they are not optimized with quick matching.
    if (this.handleCommands(request, this.registry.getInformalCommands())) {
      return;
    }

    // Get the signal for the request. If no signal is found, return immediately.
    // This avoids doing any heavy parsing since we know formal commands need a
    // signal.
    if (request.signal === null) {
      return;
    }

    // We also know that if the request doesn't find any valid command name,
    // no formal command is going to match it. So we can return right away.
    if (request.command === null) {
      return;
    }

    // Finally we can try to handle our registered formal commands.
    this.handleCommands(request, this.registry.getFormalCommands());
  }

  private handleCommands(request: Request, commands: ICommand[]) {
    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].handle(request);

      if (request.handled) {
        return true;
      }
    }

    return false;
  }
}
