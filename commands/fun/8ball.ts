import { Command, StringArgument } from '@guildedts/framework';
import { Message, Embed } from 'guilded.ts';

// @ts-ignore
const responses = ["Yes!", "No.", "Of course!", "Never...", "No way!"];

export default class extends Command {
    description = `Ask questions to the magical 8ball.`;
    arguments = [
        class extends StringArgument {
            name = "question"
        }
    ]
	async execute(message: Message, { question }: { question: string }) {
		const response = responses[Math.floor(Math.random() * responses.length)];
        const responseEmbed = new Embed()
        .setTitle(`${question}`)
        .addField(`Answer`, `${response}`)
        .setColor("BLUE");
        message.reply({ embeds: [responseEmbed] })
	}
}