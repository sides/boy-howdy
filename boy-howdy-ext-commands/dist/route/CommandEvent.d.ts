import { Message } from 'discord.js';
import Event from './Event';
export default class CommandEvent extends Event {
    message: Message;
    constructor(message: Message);
}
