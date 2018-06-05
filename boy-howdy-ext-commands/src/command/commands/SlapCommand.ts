import { User, GuildMember } from 'discord-bot.js'
import Request from '../../route/Request'
import FormalCommand from '../FormalCommand'
import FormalCommandContext from '../FormalCommandContext'
import UserMutator from '../mutate/UserMutator'

export default class SlapCommand extends FormalCommand {
  protected _signatures = [
    new UserMutator()
  ];

  public name = 'slap';

  public respond(context: FormalCommandContext, user: User) {
    context.channel.send(`_slaps ${user} with a wet trout!_`);
  }
}
