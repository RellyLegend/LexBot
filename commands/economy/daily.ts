import { Command } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import { daily, getUserData } from '../../data/users';

export default class extends Command {
    cooldown = 86400;
	description = `Earn your daily coins.`;
	async execute(message: Message) {
        const author = await message.fetchAuthor();
        const userData = await getUserData(author.id);

        let dailyCoins = Math.floor(Math.random() * 1000) + 50;
        
        await daily(author.id, dailyCoins);
        const dailyEmbed = new Embed()
        .setTitle(`✅ Daily Coins`)
        .setColor(`GREEN`)
        .setDescription(`Successfully claimed your daily coins, **${dailyCoins} coins** has been added to your wallet.`)
        .setFooter(`Requested by ${author.user.name}`)
        .setTimestamp();
        return message.reply({ embeds: [dailyEmbed] });
	}
}