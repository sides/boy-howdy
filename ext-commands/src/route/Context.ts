import { Client, TextChannel, DMChannel, GroupDMChannel, User } from 'boy-howdy-core'

/**
 * A `Context` instance is stateless context for a request that
 * commands may utilize as arguments for methods that can be called
 * request-less. It also comes with helper methods for doing things
 * within that context.
 */
export default class Context {
  public readonly client: Client;
  public readonly channel: GroupDMChannel | DMChannel | TextChannel;
  public readonly author: User;

  constructor(client: Client, channel: GroupDMChannel | DMChannel | TextChannel, author: User) {
    this.client = client;
    this.channel = channel;
    this.author = author;
  }

  /**
   * Send back a message mentioning the author.
   */
  reply(content: string) {
    this.channel.send(`${this.author}, ${content}`);
  }
}
