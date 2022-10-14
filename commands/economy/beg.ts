import { Command } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import { addCoins, getUserData } from '../../data/users';

export default class extends Command {
    description = `Beg for coins.`;
    cooldown = 300000;
	async execute(message: Message) {
		const user = (await message.fetchAuthor()).user;
        const userData = await getUserData(`${user?.id}`);
        const beggedCoins = Math.floor(Math.random() * 100) + 1;
        addCoins(`${user.id}`, beggedCoins, "wallet");
        const begEmbed = new Embed()
        .setColor(`GREEN`)
        .setTitle(`Beg`)
        .setDescription(`You begged and received 🪙**${beggedCoins} coins**`)
        .setTimestamp();
        return message.reply({ embeds: [begEmbed] });
	}
}