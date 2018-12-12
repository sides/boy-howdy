import { User } from 'boy-howdy-core'
import FormalCommand from '../FormalCommand'
import Context from '../../route/Context'
import Signature from '../formality/Signature'
import UserMutator from '../formality/UserMutator'

export default class SlapCommand extends FormalCommand {
  protected _signatures = [
    new Signature({ overflow: 'error' },
      {
        name: 'slappee',
        description: 'The user to slap.',
        required: true,
        mutator: new UserMutator()
      }
    ),
    new Signature({},
      {
        name: 'slapper',
        description: 'The user who does the slapping.',
        required: true,
        mutator: new UserMutator()
      },
      {
        name: 'slappee',
        description: 'The user to slap.',
        required: true,
        mutator: new UserMutator()
      }
    )
  ];

  public name = 'slap';

  public respond(context: Context, slapper: User, slappee?: User) {
    if (slappee !== undefined) {
      context.channel.send(`_${slapper} slaps ${slappee} with a wet trout!_`);
    } else {
      context.channel.send(`_slaps ${slapper} with a wet trout!_`);
    }
  }
}
