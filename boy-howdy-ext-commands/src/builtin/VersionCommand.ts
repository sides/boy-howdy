import { Message } from 'discord.js'
import RegexCommand from '../command/RegexCommand'

export default class VersionCommand extends RegexCommand {
  protected expression = /^\!version/;

  protected matched(message: Message) {
    message.reply('discord-bot.js ' + (message.client.constructor as any).VERSION);
  }
}
