const scoring = require('../scoring');
const Discord = require('discord.js');
const help = require('./help');
const contrib = require('./contribute');

function command(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    switch (msgtok[1]) {
        case "version":
            msg.reply(process.env.npm_package_version);
            break;
        case "score":
        case "points":
            (async () => {
                let points = await scoring.get(msg.author.id);
                if (points == 0) {
                    msg.reply('Damn such empty. You have no points.');
                } else {
                    msg.reply(`You have ${points} points.`);
                }
            })();
            break;
        case "feature":
            if (msgtok[2]=="request"){
            msg.reply("Create a new issue over at https://github.com/srujandeshpande/DrinkWaterBot/issues for any feature requests or bug reporting!");
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("DrinkWaterBot Feature Request")
                .setDescription("Use `water feature request` to see how you can raise issues and feature requests for DrinkWaterBot!");
                msg.channel.send(embed);
            }
            break;
        case "help":
            help.scripy(msg);
            break;
        case "contrib":
            contrib.contrib(msg);
            break;
        default:
            msg.channel.send('https://preview.redd.it/po8ahy378nj31.jpg?auto=webp&s=49be947a9a438635c48636af09cc9934e0290a39');
            scoring.inc(msg.author.id, 1);
            break;
    }
}


module.exports = {
    command: command
};
