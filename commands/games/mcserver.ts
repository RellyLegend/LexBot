import { StringArgument, Command } from '@guildedts/framework';
import { Embed, Message } from "guilded.ts";
import { status } from 'minecraft-server-util';

const options = {
    timeout: 1000 * 5,
    enableSRV: true,
};

export default class extends Command {
    aliases = ["minecrafts", "minecraftserver", "mcs"];
    arguments = [
        class extends StringArgument {
            name = 'ip';
        }
    ];
	description = `Grab information of a existing Minecraft Server.`;
	async execute(message: Message, { ip }: { ip: string }) {
		status(ip, 25565, options)
        .then((result) => {
            const serverEmbed = new Embed()
            .setColor(`GREEN`)
            .setTitle(`${ip}`)
            .addField(`Ping`, `**${result.roundTripLatency}ms**`, true)
            .addField(`Version`, `**${result.version.name}** (${result.version.protocol})`, true)
            .addField(`Players`, `**${result.players.online}** / **${result.players.max}**`, true)
            .addField(`MOTD`, `${result.motd.clean}`)
            .setFooter(`Minecraft Server`)
            .setTimestamp();
            return message.reply({ embeds: [serverEmbed] });
        })
        .catch((err) => message.reply(`Unable to find the server: ${err}`));
	}
}