import { Message } from 'discord.js';
import Client from '../bot/Client';
import IListener from './IListener';
export default class MessageListener implements IListener {
    subscribe(client: Client): void;
    match(message: Message): boolean;
    handle(message: Message): void;
    private onmessage(message);
}
