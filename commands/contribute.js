const { exception } = require('console');
const Discord = require('discord.js');
// const scoring = require('../scoring');
require('docstring');

function docs(){
    /**
     Welcome to **DrinkWaterBot**! We are so excited to have y'all contribute to our Open Source DrinkWaterBot project! 
     Head on to https://github.com/srujandeshpande/DrinkWaterBot and read the contributing.md file and get started!
     */
}


function contripy(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    try {

        const embed = new Discord.MessageEmbed().setColor("#0099ff").setTitle("Contribute your Innovativeness!").setDescription(docs.__doc__);
        msg.channel.send(embed);
    }
    catch {
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("DrinkWaterBot Contribute")
            .setDescription("Use `water contrib` to see how you can contribute!")
        msg.channel.send(embed)
    }
}


module.exports = {
    contripy: contripy
};
