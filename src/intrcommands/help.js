const { exception } = require('console');
const Discord = require('discord.js');
// const scoring = require('../scoring');
require('docstring');


function scripy(intr) {
    var msgtok = intr.options.getString('helpcmd');
        const mod = require("../commands/" + msgtok)
        const embed = new Discord.MessageEmbed().setColor("#0099ff").setTitle("DrinkWaterBot Help").setDescription(mod.docs.__doc__);
        intr.reply({embeds:[embed]});
}


module.exports = {
    scripy: scripy
};
