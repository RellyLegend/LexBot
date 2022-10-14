import { Command, StringArgument } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import got from "got";

export default class extends Command {
	description = `Encode a secret message into numbers! (binary)`;
    arguments = [
        class extends StringArgument {
            name = 'msg';
        }
    ];
	async execute(message: Message, { msg }: { msg: string }) {
        const author = await message.fetchAuthor();

		got(`https://some-random-api.ml/binary?text=${msg}`)
        .then((response) => {
            const { binary } = JSON.parse(response.body);
            const encodedEmbed = new Embed()
            .setTitle(`✅ Encoded`)
            .setDescription(`Successfully encoded your message! Look below for your secret code.`)
            .setColor(`GREEN`)
            .addField(`Message`, `${msg}`)
            .addField(`Encoded Result`, `\`\`\`${binary}\`\`\``)
            .setFooter(`Requested by ${author.user.name}`)
            .setTimestamp();
            return message.reply({ embeds: [encodedEmbed] });
        }).catch((error) => message.reply(`Unable to encode your message: ${error}`));
	}
}