import App from 'lib/App'
import IBotConfig from 'bot/IBotConfig'

export default class BotApp extends App {
  protected config: IBotConfig;

  booting() {
    super.booting();

    this.client.on('message', message => {
      if (message.content === 'go completely bananas') {
        message.reply('i am confident that sides will finish mw');
      }
    });
  }
}
