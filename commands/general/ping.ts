import { Command } from '@guildedts/framework';
import { Message } from 'guilded.ts';

export default class extends Command {
	description = `Check if the bot is alive.`;
	async execute(message: Message) {
		message.reply('Pong!');
	}
}