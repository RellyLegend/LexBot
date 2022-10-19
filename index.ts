import Client from '@guildedts/framework';
import { config } from 'dotenv';

config();

const dev = process.argv.includes('--dev');

new Client({ dev });

require("./app/server");