import FormalCommand from '../FormalCommand'
import FormalCommandContext from '../FormalCommandContext'

export default class VersionCommand extends FormalCommand {
  public name = 'version';

  public respond(context: FormalCommandContext) {
    context.reply('Boy Howdy ' + (context.client.constructor as any).VERSION);
  }
}
