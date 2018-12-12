import FormalCommand from '../FormalCommand'
import Context from '../../route/Context'

export default class VersionCommand extends FormalCommand {
  public name = 'version';

  public respond(context: Context) {
    context.reply('Boy Howdy ' + (context.client.constructor as any).VERSION);
  }
}
