import { Message, TextChannel } from 'discord.js'
import randomMagic8ballResponse from 'bot/utils/randomMagic8ballResponse'

export default class Magic8ballResponse {
  channel: TextChannel;

  constructor(channel: TextChannel) {
    this.channel = channel;
  }

  handle() {
    const emojis = this.channel.guild.emojis.filter(emoji => emoji.name === '__'
      || emoji.name === '___'
      || emoji.name === 'magic8ball').array();

    if (emojis.length !== 3) {
      return;
    }

    this.channel.send(`${emojis[0]} ${emojis[1]} ...`).then((message: Message) => {
      setTimeout(() => {
        const response = randomMagic8ballResponse().toLowerCase();
        message.edit(`${emojis[2]} ${emojis[1]} ${response}`);
      }, Math.random() * 1500 + 3500);
    });
  }
}
