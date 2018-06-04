import Request from '../../route/Request'
import FormalCommand from '../FormalCommand'

export default class VersionCommand extends FormalCommand {
  public name = 'version';

  public run(request: Request) {
    request.originalMessage.reply('discord-bot.js ' + (request.originalMessage.client.constructor as any).VERSION);
  }
}
