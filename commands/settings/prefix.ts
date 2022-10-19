import { Command, StringArgument } from '@guildedts/framework';
import { Message } from 'guilded.ts';
import { getServerData, setPrefix } from '../../data/servers';

export default class extends Command {
	description = `Set a custom prefix for the server.`;
    arguments = [
        class extends StringArgument {
            name = 'prefix';
            required = false;
        },
    ];
	async execute(message: Message, { prefix }: { prefix: string }) {
        const server = await message.fetchServer();
        const serverData = await getServerData(`${server.id}`);

        if (!prefix) return message.reply(`${server.name}'s Prefix: \`${serverData.prefix}\``);

        if (message.raw.createdBy !== server.raw.ownerId) return message.reply(`Only a server owner can perform this!`);

        if (prefix.length > 3) return message.reply(`Prefix length can only be under 3 characters!`);
        await setPrefix(`${server.id}`, prefix);
        this.client.prefixes.set(`${server.id}`, prefix);
        message.reply(`Set the server prefix to \`${prefix}\``);
	}
}