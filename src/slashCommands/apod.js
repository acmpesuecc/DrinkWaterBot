const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const scoring = require('../scoring');

const nasa_key = process.env.NASA_KEY;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription("NASA's Astronomy Picture of the Day"),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const url = "https://api.nasa.gov/planetary/apod?api_key=" + nasa_key;
        axios({
            method: 'get',
            url: url,
        }).then((response) => {
            data = response.data;
            const embed = {
                color: 0x0099ff,
                title: `**${data['title']}**`,
                image: {
                    url: data['url'],
                },
                description: data['explanation']
            };
            interaction.reply({ embeds: [embed] });
        });
    },
};
