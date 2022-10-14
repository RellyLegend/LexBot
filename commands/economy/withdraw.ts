import { Command, NumberArgument } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import { getUserData, withdrawCoins } from '../../data/users';

export default class extends Command {
    description = `Withdraw coins to your wallet.`;
    aliases = ["wd", "withd", "wdraw"];
    arguments = [
        class extends NumberArgument {
            name = 'amount';
        }
    ];
	async execute(message: Message, { amount }: { amount: number }) {
        const user = (await message.fetchAuthor()).user;
        const userData = await getUserData(`${user?.id}`);
        // @ts-ignore
        if (amount > userData.bank) return message.reply(`Insufficient coins.`);
        if (amount <= 0) return message.reply(`Invalid number.`);
        withdrawCoins(`${user.id}`, amount);
        const withdrawEmbed = new Embed()
        .setColor(`GREEN`)
        .setTitle(`✅ Transation Complete`)
        .setDescription(`You withdrawed 🪙**${amount} coins** from your bank over to your wallet.`)
        .setTimestamp();
        message.reply({ embeds: [withdrawEmbed] });
    }
}