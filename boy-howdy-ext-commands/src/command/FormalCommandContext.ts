import { Client, TextChannel, DMChannel, GroupDMChannel, User } from 'discord-bot.js'
import Request from '../route/Request'

export default class FormalCommandContext {
  public readonly client: Client;
  public readonly channel: GroupDMChannel | DMChannel | TextChannel;
  public readonly author: User;
  public readonly content: string;

  constructor(client: Client, channel: GroupDMChannel | DMChannel | TextChannel, author: User, content: string) {
    this.client = client;
    this.channel = channel;
    this.author = author;
    this.content = content;
  }

  reply(content: string) {
    this.channel.send(this.author + ', ' + content);
  }
}
