import { User } from 'discord-bot.js'

export type SignalType = 'start' | 'end' | 'both';

export default class Signal {
  private _signal: string;
  private _type: SignalType;

  constructor(signal: string, type: SignalType = 'start') {
    this._signal = signal;
    this._type = type;
  }

  public isSignalled(content: string) {
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

  public toString() {
    return this._signal;
  }

  public static createMentionSignal(user: User) {
    return new this(`<@${user.id}> `, 'both');
  }
}
