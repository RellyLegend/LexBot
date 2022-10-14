import { Command, StringArgument } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
const cowsay = require("cowsay");

export default class extends Command {
	description = `Make a cow say something...`;
    arguments = [
        class extends StringArgument {
            name = 'msg';
        }
    ];
	async execute(message: Message, { msg }: { msg: string }) {
		const cowMsg = cowsay.say({ text: msg });
        const cowEmbed = new Embed()
        .setTitle(`🐄 Cow`)
        .setColor(`GREEN`)
        .setDescription(`\`\`\`${cowMsg}\`\`\``);
        return message.reply({ embeds: [cowEmbed] });
	}
}