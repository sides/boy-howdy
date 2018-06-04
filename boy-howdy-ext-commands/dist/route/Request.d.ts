import { Message } from 'discord.js';
import Signal from './Signal';
/**
 * Every message the client receives is interpreted as a `Request`. The
 * class lazily resolves things like the signal and arguments present
 * in the original message.
 */
export default class Request {
    private _availableSignals;
    private _signal;
    private _content;
    private _name;
    private _arguments;
    /**
     * Whether the request has been handled or not. A request being
     * handled typically means that a router will stop trying to route it
     * further.
     */
    handled: boolean;
    /**
     * The original message object that triggered the request.
     */
    originalMessage: Message;
    /**
     * The signal of the message if it's in formal syntax.
     */
    readonly signal: string;
    /**
     * The clean contents of the message, stripping away the signal if it
     * is in formal syntax.
     */
    readonly content: string;
    /**
     * An array split by the double quote-enclosed, space-delimited
     * contents of the message.
     */
    readonly arguments: string[];
    /**
     * The first argument of the request's `arguments`.
     */
    readonly command: string;
    constructor(message: Message, availableSignals: Signal[]);
}
