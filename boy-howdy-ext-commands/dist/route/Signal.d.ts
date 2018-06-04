import { User } from 'discord.js';
export declare type SignalType = 'start' | 'end' | 'both';
export default class Signal {
    private _signal;
    private _type;
    constructor(signal: string, type?: SignalType);
    isSignalled(content: string): boolean;
    toString(): string;
    static createMentionSignal(user: User): Signal;
}
