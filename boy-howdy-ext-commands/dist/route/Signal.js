"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Signal {
    constructor(signal, type = 'start') {
        this._signal = signal;
        this._type = type;
    }
    isSignalled(content) {
        switch (this._type) {
            case 'start':
                return content.startsWith(this._signal);
            case 'both':
                return content.startsWith(this._signal) || content.endsWith(this._signal);
            case 'end':
                return content.endsWith(this._signal);
            default:
                return false;
        }
    }
    toString() {
        return this._signal;
    }
    static createMentionSignal(user) {
        return new this(`<@${user.id}> `, 'both');
    }
}
exports.default = Signal;
