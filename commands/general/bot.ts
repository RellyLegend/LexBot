import { Command } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import { getTotalServers } from '../../data/servers';
import { getTotalUsers } from '../../data/users';
import { parseDur } from '../../utils/parseDur';

export default class extends Command {
    aliases = ["stat", "stats"];
	description = `See how well Lex is performing.`;
	async execute(message: Message) {
        const servers = await getTotalServers();
        const users = await getTotalUsers();
		const statsEmbed = new Embed()
        .setTitle(`Lex - Stats`)
        .setColor(`BLUE`)
        .addField(`Ping`, `**${this.client.ws.ping}ms**`, true)
        .addField(`Uptime`, `**${parseDur(this.client.uptime)}**`, true)
        .addField(`Saved Users`, `**${users.length}** users`, true)
        .addField(`Saved Servers`, `**${servers.length}** servers`, true)
        return message.reply({ embeds: [statsEmbed] });
	}
};