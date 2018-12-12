import FormalCommand from '../FormalCommand'
import FormalCommandContext from '../../route/Context'

export default class VersionCommand extends FormalCommand {
  public name = 'version';

  public respond(context: FormalCommandContext) {
    context.reply('Boy Howdy ' + (context.client.constructor as any).VERSION);
  }
}
