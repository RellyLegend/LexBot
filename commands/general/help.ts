import { Command, StringArgument } from '@guildedts/framework';
import { readdirSync } from 'fs';
import { Embed, Message } from 'guilded.ts';
import { getServerData } from '../../data/servers';
import { capitalise } from '../../utils/capitalise';

export default class extends Command {
    description = `View the bot's commands.`;
    arguments = [
        class extends StringArgument {
            name = 'cmd';
            required = false;
        }
    ];
	async execute(message: Message, { cmd }: { cmd: string }) {
        const server = await message.fetchServer();
        const serverData = await getServerData(`${server.id}`);

        const author = await message.fetchAuthor();

		if (!cmd) {
            let categories = new Array();
            
            readdirSync("./commands/").forEach((dir) => {
                const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".ts"));

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);
                    if (!file) return "None";
                    let name = command.replace(".ts", "");
                    return `\`${name}\``;
                });

                let data = new Object();
                
                data = {
                    name: capitalise(dir) + ` (${cmds.length})`,
                    value: cmds.length === 0 ? "Unknown" : cmds.join(", "), 
                };

                categories.push(data);
            });
            const helpEmbed = new Embed()
            .setTitle(`📬 Help Center`)
            .setDescription(`Use \`${serverData.prefix}help <command>\` for more information on a single command.
**${this.client.commands.size}** total commands.`)
            .setColor(`BLUE`)
            .setFooter(`Requested by ${author.user.name}`)
            .setTimestamp()
            categories.forEach((category) => {
                // @ts-ignore
                helpEmbed.addField(`${category.name}`, `${category.value}`);
            });
            return message.reply({ embeds: [helpEmbed] });
        } else {
            const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.find((c) => c.aliases && c.aliases.includes(cmd.toLowerCase()));
            if (!command) return message.reply(`Invalid command.`);

            const commandEmbed = new Embed()
            .setTitle(`Command Details`)
            .setColor(`BLUE`)
            .addField(`Name`, `${command.name || `None`}`)
            .addField(`Description`, `${command.description || `None`}`)
            .addField(`Aliases`, command.aliases.length >= 1 ? `\`${command.aliases.join("` `")}\`` : `None`)
            .setFooter(`Requested by ${author.user.name}`)
            .setTimestamp();
            return message.reply({ embeds: [commandEmbed] });
        }
	}
}