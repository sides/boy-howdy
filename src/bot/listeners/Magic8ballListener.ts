import { Message, TextChannel } from 'discord.js'
import MessageListener from 'lib/listeners/MessageListener'
import Magic8ballResponse from 'bot/responses/Magic8ballResponse'

export default class Magic8ballListener extends MessageListener {
  match(message: Message) {
    return super.match(message) && message.content.startsWith('🎱');
  }

  handle(message: Message) {
    const response = new Magic8ballResponse(<TextChannel> message.channel);
    response.handle();
  }
}
