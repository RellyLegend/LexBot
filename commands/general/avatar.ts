import { Command } from '@guildedts/framework';
import { Embed, Message, UserType } from 'guilded.ts';
import { getUserData } from '../../data/users';

export default class extends Command {
    description = `Get someone's avatar.`;
    aliases = ["bal", "coins"];
	async execute(message: Message) {
        const server = await message.fetchServer();
        const author = (await message.fetchAuthor()).user;
        if (message.mentions?.users?.length !== 1) {
            const userData = await getUserData(`${author?.id}`);
            const avatarEmbed = new Embed()
            .setColor("BLUE")
            .setAuthor(`🖼️ ${author?.name}'s Avatar`)
            .setImage(author.avatar)
            .setTimestamp();
            return message.reply({ embeds: [avatarEmbed] });
        } else {
            const member = await server.members.fetch(`${message.mentions.users[0].id}`);
            const user = member.user;
            const avatarEmbed = new Embed()
            .setColor("BLUE")
            .setAuthor(`🖼️ ${user?.name}'s Avatar`)
            .setImage(user.avatar)
            .setFooter(`Requested by ${author.name}`)
            .setTimestamp();
            return message.reply({ embeds: [avatarEmbed] });
        }
    }
}