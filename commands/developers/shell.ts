import { Command, StringArgument } from '@guildedts/framework';
import config from "../../config";
import { Embed, Message } from 'guilded.ts';
import child from "child_process";

export default class extends Command {
	description = `Run a command in the shell.`;
    arguments = [
        class extends StringArgument {
            name = 'command';
        },
    ];
	async execute(message: Message, { command }: { command: string }) {
		const author = await message.fetchAuthor();
        if (author.id !== config.bot.ownerId) return;
        child.exec(command, (err, res) => {
            if (err) return console.log(err);
            const successEmbed = new Embed()
            .setTitle(`✅ Task Complete`)
            .setColor(`GREEN`)
            .setDescription(`\`\`\`js${res}\`\`\``);
            return message.reply({ embeds: [successEmbed] });
        });
	}
}