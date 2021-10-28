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
        await interaction.reply('Checking...');
        scoring.inc(interaction.user.id, 1);

        const url = "http://api.open-notify.org/iss-now.json";
        const response = await axios.get(url);

        var lon = parseFloat(response.data.iss_position.longitude);
        var lat = parseFloat(response.data.iss_position.latitude);
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
        await map.render([0, 0], 1)
        map.image.save(`${__dirname}/../img/iss-map.png`)

        var geo_options = {
            method: 'GET',
            url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
            params: {
                lat: lat,
                lon: lon,
                'accept-language': 'en',
                polygon_threshold: '0.0'
            },
            headers: {
                'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
                'x-rapidapi-key': process.env.GEOCODE_KEY
            }
        };

        const geo_response = await axios(geo_options);
        var location = geo_response.data.display_name ? geo_response.data.display_name : 'Neverland';

        lat = lat < 0 ? `${lat * -1}°S` : `${lat}°N`;
        lon = lon < 0 ? `${lon * -1}°W` : `${lon}°E`;

        const attachment = new MessageAttachment(`${__dirname}/../img/iss-map.png`, 'map.png');
        const embed = new MessageEmbed()
            .setTitle("Current location of the ISS")
            .setDescription(`The ISS is currently above ${location} and is at ${lon} and ${lat}`)
            .setImage(`attachment://map.png`)

        await interaction.editReply({ embeds: [embed], files: [attachment] });
        await interaction.editReply(" ");
    },
};
