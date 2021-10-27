const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const StaticMaps = require('staticmaps');
const scoring = require('../scoring');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iss')
        .setDescription("Current location of the ISS"),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const url = "http://api.open-notify.org/iss-now.json";
        axios({
            method: 'get',
            url: url,
        }).then((response) => {
            data = response.data;
            const lon = parseFloat(data['iss_position']['longitude']);
            const lat = parseFloat(data['iss_position']['latitude']);
            const coords = [lon, lat];
            const options = {
                width: 600,
                height: 400
            };
            const map = new StaticMaps(options);
            const marker = {
                img: `${__dirname}/../img/iss.png`,
                width: 54,
                height: 21,
                coord: coords,
            };
            map.addMarker(marker);
            map.render([0, 0], 1)
                .then(() => map.image.save(`${__dirname}/../img/iss-map.png`))
                .then(() => {
                    const attachment = new MessageAttachment(`${__dirname}/../img/iss-map.png`, 'map.png');
                    const embed = new MessageEmbed()
                        .setTitle(`The ISS is above ${lat}, ${lon}`)
                        .setImage('attachment://map.png');
                    interaction.reply({ embeds: [embed], files: [attachment] });
                })
                .catch(console.log);
        });
    },
};
