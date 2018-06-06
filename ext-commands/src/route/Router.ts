import { Client, Message, DMChannel } from 'boy-howdy-core'
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

    // Begin by going over generic commands that could be anything.
    const commands = this.registry.getGenericCommands();
    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].handle(request);

      if (request.handled) {
        return;
      }
    }

    // Get the signal for the request. If no signal is found, return immediately.
    // A signal is not required for DMs. We will also return if no arguments were
    // found.
    if ((request.signal === null && request.originalMessage.channel.type !== 'dm') || request.arguments.length === 0) {
      return;
    }

    // Formal commands always handle a request without checking if their name
    // matches the first argument. As such, we use the registry's map to find
    // what command we want to run here, which is keyed by their names.
    const command = this.registry.getFormalCommands().get(request.arguments[0]);

    if (command !== undefined) {
      command.handle(request);
    }
  }
}
