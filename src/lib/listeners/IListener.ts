import { Client } from 'discord.js'

interface IListener {
  subscribe(client: Client);
}

export default IListener;
