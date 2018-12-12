import { User } from 'boy-howdy-core'
import FormalCommand from '../FormalCommand'
import Context from '../../route/Context'
import Signature from '../formality/Signature'
import UserMutator from '../formality/UserMutator'

export default class SlapCommand extends FormalCommand {
  protected _signatures = [
    new Signature(
      {
        name: 'slappee',
        description: 'The user to slap.',
        mutator: new UserMutator()
      }
    ),
    new Signature(
      {
        name: 'slapper',
        description: 'The user who does the slapping.',
        mutator: new UserMutator()
      },
      {
        name: 'slappees',
        greedy: true,
        description: 'The user(s) to slap.',
        mutator: new UserMutator()
      }
    )
  ];

  public name = 'slap';

  public respond(context: Context, slapper: User, ...slappees: User[]) {
    if (slappees.length > 0) {
      context.channel.send(`_${slapper} slaps ${slappees.join(' and ')} with a wet trout!_`);
    } else {
      context.channel.send(`_slaps ${slapper} with a wet trout!_`);
    }
  }
}
