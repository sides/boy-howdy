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
    if (this._type !== 'end') {
      if (content.startsWith(this._signal)) {
        return content.slice(this._signal.length);
      } else if (content.endsWith(this._signal)) {
        return content.slice(0, -this._signal.length);
      } else {
        return false;
      }
    } else {
      return content.endsWith(this._signal)
        ? content.slice(0, -this._signal.length)
        : false;
    }
  }

  public toString() {
    return this._signal;
  }

  public static createMentionSignal(user: User) {
    return new this(`<@${user.id}>`, 'both');
  }
}
