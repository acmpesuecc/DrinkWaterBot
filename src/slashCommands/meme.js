const { SlashCommandBuilder } = require("@discordjs/builders");
const scoring = require("../scoring");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Gives you some memes')
        .addUserOption(option.setName('template').setDescription('popular meme template'))
        .addUserOption(option.setName('top_text').setDescription('top text'))
        .addUserOption(option.setName('bottom_text').setDescription('bottom text')),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const BASE_URL = 'https://api.memegen.link';
        try {
            interaction.reply(`${BASE_URL}`+`/${interaction.option.template}/${interaction.option.top_text}/${interaction.option.bottom_text}`);
        } catch (e) {
            console.error(e);
        }
    }
}
