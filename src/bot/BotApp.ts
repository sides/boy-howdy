import App from 'lib/App'
import IBotConfig from 'bot/IBotConfig'
import Magic8ballListener from 'bot/listeners/Magic8ballListener'
import SearchListener from 'bot/listeners/SearchListener'
import { TextChannel } from 'discord.js'

export default class BotApp extends App {
  protected config: IBotConfig;

  booting() {
    super.booting();

    this.client.on('message', message => {
      if (message.content === 'go completely bananas') {
        message.reply('i am confident that sides will finish mw');
      } else if (message.isMentioned(this.client.user)) {
        const howdy = (<TextChannel> message.channel).guild.emojis.find(emoji => emoji.name === '__');
        message.channel.send(howdy.toString());
      }
    });

    const magic8ball = new Magic8ballListener();
    magic8ball.subscribe(this.client);

    const search = new SearchListener();
    search.subscribe(this.client);
  }

  booted() {
    if (this.config.debug) {
      this.client.user.setPresence({
        status: 'dnd',
        game: { name: ':__:' }
      });
    } else {
      this.client.user.setPresence({
        status: 'online',
        game: null
      });
    }
  }
}
