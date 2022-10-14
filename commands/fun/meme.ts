import { Command } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import got from 'got';

export default class extends Command {
    aliases = ["memes"];
	description = `Get a random meme off the memes subreddit.`;
	async execute(message: Message) {
		got(`https://www.reddit.com/r/memes/random/.json`)
        .then((response) => {
            const [list] = JSON.parse(response.body);
            const [post]  = list.data.children;

            const permaLink = post.data.permalink;
            const meme = {
                title: post.data.title,
                url: `https://reddit.com${permaLink}`,
                image: post.data.url,
                upVotes: post.data.ups,
                comments: post.data.num_comments,
            };

            const memeEmbed = new Embed()
            .setTitle(`${meme.title}`)
            .setUrl(`${meme.url}`)
            .setColor(`BLUE`)
            .setImage(`${meme.image}`)
            .setFooter(`👍 ${meme.upVotes} 💬 ${meme.comments}`);
            return message.reply({ embeds: [memeEmbed] });
        }).catch((error) => message.reply(`Unable to load a meme: ${error}`));
	}
}