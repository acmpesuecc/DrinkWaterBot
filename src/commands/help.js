const { exception } = require('console');
const Discord = require('discord.js');
// const scoring = require('../scoring');
require('docstring');


function scripy(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    try {
        const mod = require("./" + msgtok[2])
        const embed = new Discord.MessageEmbed().setColor("#0099ff").setTitle("DrinkWaterBot Help").setDescription(mod.docs.__doc__);
        msg.channel.send(embed);
    }
    catch {
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("DrinkWaterBot Help")
            .setDescription("Use `water help` followed by the section name to learn more about it! (More docs coming soon :))")
            .addFields(
                { name: 'wholesome', value: 'Cute gifs and feel good', inline: true },
                { name: 'joke', value: 'Jokes!', inline: true },
                { name: 'science', value: 'Sciencey stuff!', inline: true },
                { name: 'gif', value: 'Fun GIFs!', inline: true }
                // BLANK LINE { name: '\u200B', value: '\u200B' },
            );
        msg.channel.send(embed)
    }
}


module.exports = {
    scripy: scripy
};
