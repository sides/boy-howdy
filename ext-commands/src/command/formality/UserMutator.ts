import { User, TextChannel, GroupDMChannel } from 'boy-howdy-core'
import Context from '../../route/Context'
import IMutator from './IMutator'

export default class UserMutator implements IMutator<User> {
  /**
   * @inheritdoc
   */
  public async mutate(context: Context, arg: string) {
    const mentionMatch = arg.match(/<@!?([0-9]+)>/);

    // If it's a mention, this is pretty straightforward.
    if (mentionMatch && mentionMatch[1]) {
      return context.client.fetchUser(mentionMatch[1]);
    }

    // "me" is short for the message author. This needs to be localized
    // if that ever gets added. It should also maybe be possible to disable
    // this with a config option.
    if (arg === 'me') {
      return context.author;
    }

    // Otherwise we're gonna query currently visible users by their names
    // and the argument.
    if (context.channel.type === 'text') {
      const member = (context.channel as TextChannel).members
        .find(member => member.displayName.includes(arg));

      if (member) {
        return member.user;
      }
    } else if (context.channel.type === 'group') {
      const recipient = (context.channel as GroupDMChannel).recipients
        .find(recipient => recipient.username.includes(arg));

      if (recipient) {
        return recipient;
      }
    }

    return Promise.reject(`${arg} is not a user`);
  }
}
