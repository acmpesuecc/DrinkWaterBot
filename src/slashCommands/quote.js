const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const scoring = require("../scoring");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Gives you a soul-touching quote'),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);

        const BASE_URL = 'https://type.fit/api';
        try {
            const res = await axios.get(`${BASE_URL}/quotes`);
            const quotes = res.data;
            var len = quotes.length;
            len = Math.floor((Math.random() * len) + 1);
            let author = quotes[len].author;
            // if author is null, set author to "Unknown"
            if (author == null) {
                author = "Unknown";
            }
            let quote = quotes[len].text;
            interaction.reply(`"${quote}" - ${author}`);
        } catch (e) {
            console.error(e);
        }
    }
}


