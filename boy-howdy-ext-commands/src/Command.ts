import CommandEvent from './CommandEvent'
import ICommand from './ICommand'

export default class Command implements ICommand {
  handle(e: CommandEvent) {
    if (e.message.author.id != e.message.client.user.id) {
      e.message.channel.send('dlafksjdfuahweiufn');
    }
  }
}
