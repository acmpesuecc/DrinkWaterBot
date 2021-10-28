const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const scoring = require("../scoring");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chuck-norris')
        .setDescription('Death once had a near Chuck Norris experience'),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const BASE_URL = 'https://api.chucknorris.io/jokes/random';
        try {
            axios({
                method: 'get',
                url: BASE_URL,
            }).then((response) => {
                data = response.data
                const embed = new MessageEmbed()
                    .setColor("#fc861e")
                    .setTitle("Chuck Norris presents DrinkWaterBot!")
                    .setDescription(data['value']);
                interaction.reply({embeds:[embed]})
            });
        } catch (e) {
            console.error(e);
        }
    }
}
