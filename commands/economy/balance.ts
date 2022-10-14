import { Command } from '@guildedts/framework';
import { Embed, Message, UserType } from 'guilded.ts';
import { getUserData } from '../../data/users';

export default class extends Command {
    description = `Check your or a user's balance.`;
    aliases = ["bal", "coins"];
	async execute(message: Message) {
        const server = await message.fetchServer();
        const author = (await message.fetchAuthor()).user;
        if (message.mentions?.users?.length !== 1) {
            const userData = await getUserData(`${author?.id}`);
            const balanceEmbed = new Embed()
            .setColor("BLUE")
            .setAuthor(`🪙${author?.name}'s Coins`)
            .addField(`👜Wallet`, `**${userData?.wallet}** coins`)
            .addField(`🏦Bank`, `**${userData?.bank}** coins`)
            .setFooter(`Requested by ${author.name}`)
            .setTimestamp();
            return message.reply({ embeds: [balanceEmbed] });
        } else {
            const member = await server.members.fetch(`${message.mentions.users[0].id}`);
            const user = member.user;
            if (user.type === "bot") return message.reply(`Invalid user.`);
            const userData = await getUserData(`${user?.id}`);
            const balanceEmbed = new Embed()
            .setColor("BLUE")
            .setAuthor(`🪙${user?.name}'s Coins`)
            .addField(`👜Wallet`, `**${userData?.wallet}** coins`)
            .addField(`🏦Bank`, `**${userData?.bank}** coins`)
            .setFooter(`Requested by ${author.name}`)
            .setTimestamp();
            return message.reply({ embeds: [balanceEmbed] });
        }
    }
}