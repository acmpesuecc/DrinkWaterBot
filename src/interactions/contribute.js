const { exception } = require('console');
const Discord = require('discord.js');
// const scoring = require('../scoring');
require('docstring');

function docs(){
    /**
     Welcome to **DrinkWaterBot**! `water contrib` gives you access to our open source repository and gives you an idea on how to get started!
     */
}


function contrib(intr) {
        const embed = new Discord.MessageEmbed().setColor("#0099ff").setTitle("Contribute your Innovativeness!").setDescription("Welcome to **DrinkWaterBot**!\nWe are so excited to have y'all contribute to our Open Source DrinkWaterBot project!\nHead on to https://github.com/srujandeshpande/DrinkWaterBot and read the contributing.md file and get started!");
        intr.reply({embeds: [embed]})
}


module.exports = {
    contrib: contrib,
    docs: docs
};
