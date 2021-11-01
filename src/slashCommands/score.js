const { SlashCommandBuilder } = require('@discordjs/builders');
const scoring = require('../scoring');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('score')
        .setDescription('Gets your water score'),
    async execute(interaction) {
        let points = await scoring.get(interaction.user.id);
        console.log(points);
        if (points == 0) {
            await interaction.reply('Damn such empty. You have no points.');
        } else {
            await interaction.reply(`You have ${points} points.`);
        }
    },
};
