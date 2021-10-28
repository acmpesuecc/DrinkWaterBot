const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const scoring = require('../scoring');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('space-people')
        .setDescription("Names and spacecraft of the astronauts in space"),
    async execute(interaction) {
        scoring.inc(interaction.user.id, 1);
        const url = "http://api.open-notify.org/astros.json";
        axios({
            method: 'get',
            url: url,
        }).then((response) => {
            data = response.data;
            const embed = new MessageEmbed()
                .setColor('#f5b642')
                .setTitle('**The people 👽 currently in space 🌌**')
            for (var i = 0; i < data['people'].length; i++) {
                embed.addField(data['people'][i]['name'], data['people'][i]['craft'] + " 🛰️", true)
            }
            interaction.reply({ embeds: [embed] });
        });
    },
};
