const { SlashCommandBuilder } = require("@discordjs/builders");
const scoring = require("../scoring");
const memegenTemplates = require("../data/memegenTemplates.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Gives you some memes')
        .addStringOption(option =>
            option.setName('template')
                .setDescription('popular meme template')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('toptext')
                .setDescription('text on top of meme')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('bottomtext')
                .setDescription('text on bottom of meme')
                .setRequired(false)),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const BASE_URL = 'https://api.memegen.link';
        try {
            const template = interaction.options.getString('template');
            const topText = interaction.options.getString('toptext');
            const bottomText = interaction.options.getString('bottomtext');
            const templateReplaced = template.replace(/\s/g, '_');
            const topTextReplaced = topText ? topText.replace(/\s/g, '_') : '';
            const bottomTextReplaced = bottomText ? bottomText.replace(/\s/g, '_') : '';
            const url = `${BASE_URL}/${templateReplaced}/${topTextReplaced}/${bottomTextReplaced}`;
            interaction.reply(url);
        } catch (e) {
            console.error(e);
        }
    }
}
