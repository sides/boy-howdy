import { Message, TextChannel } from 'discord.js'
import MessageListener from 'lib/listeners/MessageListener'
import * as https from 'https'

export default class BalloonListener extends MessageListener {
  private static readonly FLAG_SOURCE = 'https://loud.house/i/flags/';

  private flags: string[];
  private flagFreshness: Date;
  private lastFired: Date;

  match(message: Message) {
    return super.match(message) && message.content.startsWith('🎈');
  }

  handle(message: Message) {
    if (this.lastFired && this.lastFired.getTime() + 5000 >= +new Date())
      return;

    const matches = message.content.match(/^🎈\s*(\d+)?\s*(flags?)?.*$/);

    if (!matches ||
      (!matches[1] && !matches[2]) ||
      (matches[2] && !matches[2].startsWith('flag')))
    {
      this.sendWhat(<TextChannel> message.channel);
      return;
    }

    const numFlags = matches[1]
      ? parseInt(matches[1])
      : 1;

    this.sendRandomFlag(<TextChannel> message.channel, Math.min(2, Math.max(0, numFlags - 1)));
  }

  sendWhat(channel: TextChannel) {
    const emoji = channel.guild.emojis.find(emoji => emoji.name === 'what');

    if (emoji)
      channel.send(emoji.toString());
  }

  sendRandomFlag(channel: TextChannel, repeat = 0) {
    let emoji: any = channel.guild.emojis.find(emoji => emoji.name === 'cannon');

    if (emoji)
      emoji = emoji + ' ';
    else
      emoji = '';

    this.getRandomFlag()
      .then(flag => {
        channel.send(emoji + '----> ' + flag);

        if (repeat > 0) {
          setTimeout(() => this.sendRandomFlag(channel, repeat - 1), 3000);
        }
      })
      .catch(() => this.sendWhat(channel));

    this.lastFired = new Date();
  }

  getRandomFlag(): Promise<string> {
    return this.updateFlags()
      .then(() => BalloonListener.FLAG_SOURCE + this.flags[Math.floor(Math.random() * this.flags.length)]);
  }

  private updateFlags() {
    const now = new Date();

    if (this.flagFreshness && this.flagFreshness.getTime() + (30 * 24 * 60 * 60 * 1000) >= now.getTime()) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      https.get(BalloonListener.FLAG_SOURCE, res => {
        const { statusCode } = res;
        let rawBody = '';

        if (statusCode !== 200)
          reject();

        res.setEncoding('utf8');
        res.on('data', chunk => rawBody += chunk);
        res.on('end', () => {
          const regex = new RegExp(`<img src="\\/icons\\/image2.gif.*href="(.+?)"`, 'gi');
          let matches;

          this.flags = [];
          this.flagFreshness = now;

          while ((matches = regex.exec(rawBody)) != null) {
            if (!matches[1])
              continue;

            this.flags.push(matches[1]);
          }

          if (this.flags.length <= 0)
            this.flags = ['🏁'];

          resolve();
        });
      });
    });
  }
}
