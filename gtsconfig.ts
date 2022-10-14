import { ClientConfig } from '@guildedts/framework';
import config from './config';

export default {
    token: `${config.bot.token}`,
    prefix: '.'
} as ClientConfig;