import { Client, Message } from 'discord.js'
import IListener from 'lib/listeners/IListener'

export default class MessageListener implements IListener {
  subscribe(client: Client) {
    client.on('message', this.onmessage.bind(this));
  }

  match(message: Message): boolean {
    return true;
  }

  handle(message: Message) {

  }

  private onmessage(message: Message) {
    if (this.match(message)) {
      this.handle(message);
    }
  }
}
