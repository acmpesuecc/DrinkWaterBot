const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const scoring = require("../scoring");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('Gives you some advice'),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const BASE_URL = 'https://api.adviceslip.com/advice';
        try {
            const res = await axios.get(`${BASE_URL}`);
            interaction.reply(res.data.slip.advice);
        } catch (e) {
            console.error(e);
        }
    }
}
