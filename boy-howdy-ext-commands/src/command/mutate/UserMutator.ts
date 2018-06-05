import { Client, User, GuildChannel } from 'discord-bot.js'
import FormalCommandContext from '../FormalCommandContext'
import IMutator from './IMutator'

export default class UserMutator implements IMutator<User> {
  public async mutate(context: FormalCommandContext, arg: string) {
    const mentionMatch = arg.match(/<@!?([0-9]+)>/);

    if (mentionMatch && mentionMatch[1]) {
      return context.client.fetchUser(mentionMatch[1]);
    }

    if (arg === 'me') {
      return context.author;
    }

    if (context.channel instanceof GuildChannel) {
      const member = context.channel.members.find(member => member.displayName.includes(arg));

      if (member) {
        return member.user;
      }
    }

    return Promise.reject();
  }
}
