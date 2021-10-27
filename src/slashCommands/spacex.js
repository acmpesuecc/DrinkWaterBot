const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const scoring = require('../scoring');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spacex')
        .setDescription("Next SpaceX launch"),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const url = "https://api.spacexdata.com/v4/launches/latest";
        axios({
            method: 'get',
            url: url,
        }).then((response) => {
            data = response.data;
            const embed = {
                color: 0x0099ff,
                title: `**Latest SpaceX Launch**`,
                image: {
                    url: data.links.patch.small,
                },
                description: data.details
            };
            interaction.reply({ embeds: [embed] });

        });
    },
};
