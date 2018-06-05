import FormalCommand from '../FormalCommand'
import FormalCommandContext from '../FormalCommandContext'

export default class VersionCommand extends FormalCommand {
  public name = 'version';

  public respond(context: FormalCommandContext) {
    context.reply('discord-bot.js ' + (context.client.constructor as any).VERSION);
  }
}
