"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argv = require("string-argv");
/**
 * Every message the client receives is interpreted as a `Request`. The
 * class lazily resolves things like the signal and arguments present
 * in the original message.
 */
class Request {
    /**
     * The signal of the message if it's in formal syntax.
     */
    get signal() {
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
    get content() {
        if (this._content !== undefined) {
            return this._content;
        }
        if (this.signal === null) {
            return this._content = this.originalMessage.content;
        }
        else {
            return this._content = this.originalMessage.content.slice(this.signal.length);
        }
    }
    /**
     * An array split by the double quote-enclosed, space-delimited
     * contents of the message.
     */
    get arguments() {
        if (this._arguments !== undefined) {
            return this._arguments;
        }
        const args = argv(this.content);
        if (!args || args.length <= 0) {
            return this._arguments = null;
        }
        return this._arguments = args;
    }
    /**
     * The first argument of the request's `arguments`.
     */
    get command() {
        const args = this.arguments;
        return args ? args[0] : null;
    }
    constructor(message, availableSignals) {
        this.handled = false;
        this.originalMessage = message;
        this._availableSignals = availableSignals;
    }
}
exports.default = Request;
