import { User } from 'boy-howdy-core'

export type SignalType = 'start' | 'end' | 'both';

export default class Signal {
  private _signal: string;
  private _type: SignalType;

  constructor(signal: string, type: SignalType = 'start') {
    this._signal = signal;
    this._type = type;
  }

  public clean(content: string) {
    switch (this._type) {
      case 'start':
        if (content.startsWith(this._signal)) {
          return content.slice(this._signal.length);
        }

        return false;
      case 'both':
        if (content.startsWith(this._signal)) {
          return content.slice(this._signal.length);
        } else if (content.endsWith(this._signal)) {
          return content.slice(0, -this._signal.length);
        }

        return false;
      case 'end':
        if (content.endsWith(this._signal)) {
          return content.slice(0, -this._signal.length);
        }

        return false;
      default:
        return false;
    }
  }

  public toString() {
    return this._signal;
  }

  public static createMentionSignal(user: User) {
    return new this(`<@${user.id}>`, 'both');
  }
}
