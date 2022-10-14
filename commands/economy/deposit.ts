import { Command, NumberArgument } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import { depositCoins, getUserData } from '../../data/users';

export default class extends Command {
    description = `Deposit coins to your bank.`;
    aliases = ["dep"];
    arguments = [
        class extends NumberArgument {
            name = 'amount';
        }
    ];
	async execute(message: Message, { amount }: { amount: number }) {
        const user = (await message.fetchAuthor()).user;
        const userData = await getUserData(`${user?.id}`);
        // @ts-ignore
        if (amount > userData.wallet) return message.reply(`Insufficient coins.`);
        if (amount <= 0) return message.reply(`Invalid number.`);
        depositCoins(`${user.id}`, amount);
        const depositEmbed = new Embed()
        .setColor(`GREEN`)
        .setTitle(`✅ Transation Complete`)
        .setDescription(`You deposited 🪙**${amount} coins** from your wallet over to your bank.`)
        .setTimestamp();
        message.reply({ embeds: [depositEmbed] });
    }
}