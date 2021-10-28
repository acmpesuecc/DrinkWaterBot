const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const scoring = require("../scoring");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('safe-joke')
        .setDescription('Tickle your funny bone :D'),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const BASE_URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit';

        axios({
            method: 'get',
            url: BASE_URL,
        }).then((response) => {
            data = response.data
            if (data['type'] === 'single') {
                const embed = new MessageEmbed()
                    .setColor("#90ee90")
                    .setTitle("DrinkWaterBot Presents Joketopia!")
                    .addFields(
                        { 'name': `#${data['id']}`, value: data['joke'] });
                interaction.reply({embeds:[embed]})
            }
            else if (data['type'] === 'twopart') {
                const embed = new MessageEmbed()
                    .setColor("#800080")
                    .setTitle("DrinkWaterBot Presents Joketopia!")
                    .addFields(
                        { 'name': `#${data['id']}`, value: data['setup'] + "\n" + data['delivery'] });
                interaction.reply({embeds:[embed]})
            }
        });

    }
}
