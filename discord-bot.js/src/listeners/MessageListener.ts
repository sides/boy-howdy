import { Message } from 'discord.js'
import Client from '../bot/Client'
import IListener from './IListener'

export default class MessageListener implements IListener {
  subscribe(client: Client) {
    client.on('message', this.onmessage.bind(this));
  }

  match(message: Message) {
    return message.channel.type === "text";
  }

  handle(message: Message) {

  }

  private onmessage(message: Message) {
    if (this.match(message)) {
      this.handle(message);
    }
  }
}
