import { Command, StringArgument } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import got from "got";

export default class extends Command {
	description = `Decode numbers to a message. (binary)`;
    arguments = [
        class extends StringArgument {
            name = 'msg';
        }
    ];
	async execute(message: Message, { msg }: { msg: string }) {
        const author = await message.fetchAuthor();

		got(`https://some-random-api.ml/binary?decode=${msg}`)
        .then((response) => {
            const { text } = JSON.parse(response.body);
            const decodedEmbed = new Embed()
            .setTitle(`✅ Decoded`)
            .setDescription(`Successfully decoded your message! Look below for your secret message.`)
            .setColor(`GREEN`)
            .addField(`Message`, `${msg}`)
            .addField(`Decoded Result`, `\`\`\`${text}\`\`\``)
            .setFooter(`Requested by ${author.user.name}`)
            .setTimestamp();
            return message.reply({ embeds: [decodedEmbed] });
        }).catch((error) => message.reply(`Unable to decode your message: ${error}`));
	}
}