import { ClientOptions } from 'discord.js'

interface IConfig {
  clientOptions?: ClientOptions;
  debug?: boolean;
  auth?: {
    discord: {
      token: string
    }
  };
}

export default IConfig;
