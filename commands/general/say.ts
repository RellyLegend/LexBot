import { Command, StringArgument } from '@guildedts/framework';
import { Message } from 'guilded.ts';

export default class extends Command {
	description = `Repeat your message.`;
    aliases = ["repeat", "echo"];
    arguments = [
        class extends StringArgument {
            name = 'msg';
        }
    ];
	async execute(message: Message, { msg }: { msg: string }) {
		const author = await message.fetchAuthor();
        return message.reply(`${msg} - ${author.user.name}`);
	}
}