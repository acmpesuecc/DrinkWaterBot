const { exception } = require('console');
const Discord = require('discord.js');
const scoring = require('../scoring');
require('docstring');


function scripy(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    try {
        const mod = require("./" + msgtok[1])
        const embed = new Discord.MessageEmbed().setColor("#0099ff").setTitle(msgtok[1]).setDescription(mod.docs.__doc__);
        msg.channel.send(embed);
    }
    catch {
        const embed = new Discord.MessageEmbed().setColor("#0099ff").setTitle("You doofus!").setDescription("Hmm! Seems like the command you want help for doesn't exist.");
        msg.channel.send(embed)
    }
}


module.exports = {
    scripy: scripy
};
