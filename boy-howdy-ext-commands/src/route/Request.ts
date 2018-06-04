import { Message } from 'discord.js'
import * as argv from 'string-argv'
import Signal from './Signal'

/**
 * Every message the client receives is interpreted as a `Request`. The
 * class lazily resolves things like the signal and arguments present
 * in the original message.
 */
export default class Request {
  private _availableSignals: Signal[];
  private _signal: string;
  private _content: string;
  private _name: string;
  private _arguments: string[];

  /**
   * Whether the request has been handled or not. A request being
   * handled typically means that a router will stop trying to route it
   * further.
   */
  public handled: boolean;

  /**
   * The original message object that triggered the request.
   */
  public originalMessage: Message;

  /**
   * The signal of the message if it's in formal syntax.
   */
  public get signal() {
    if (this._signal !== undefined) {
      return this._signal;
    }

    for (let i = 0, l = this._availableSignals.length; i < l; i++) {
      if (this._availableSignals[i].isSignalled(this.originalMessage.content)) {
        return this._signal = this._availableSignals[i].toString();
      }
    }

    return this._signal = null;
  }

  /**
   * The clean contents of the message, stripping away the signal if it
   * is in formal syntax.
   */
  public get content() {
    if (this._content !== undefined) {
      return this._content;
    }

    if (this.signal === null) {
      return this._content = this.originalMessage.content;
    } else {
      return this._content = this.originalMessage.content.slice(this.signal.length);
    }
  }

  /**
   * An array split by the double quote-enclosed, space-delimited
   * contents of the message.
   */
  public get arguments() {
    if (this._arguments !== undefined) {
      return this._arguments;
    }

    const args: string[] = argv(this.content);

    if (!args || args.length <= 0) {
      return this._arguments = null;
    }

    return this._arguments = args;
  }

  /**
   * The first argument of the request's `arguments`.
   */
  public get command() {
    const args = this.arguments;

    return args ? args[0] : null;
  }

  constructor(message: Message, availableSignals: Signal[]) {
    this.handled = false;
    this.originalMessage = message;
    this._availableSignals = availableSignals;
  }
}
