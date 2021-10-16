const scoring = require('../scoring');
const Discord = require('discord.js');
const help = require('./help');
const contrib = require('./contribute');
const gif = require('./gif');
const science = require('./science');
const game = require('./game');

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
            if (msgtok[2] == "request") {
                msg.reply("Create a new issue over at https://github.com/srujandeshpande/DrinkWaterBot/issues for any feature requests or bug reporting!");
            } else {
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
        case "aggressive":
            msg.channel.send('https://pics.me.me/thumb_did-you-drink-water-today-you-stupid-bitch-did-you-66625033.png');
            scoring.inc(msg.author.id, 1);
            break;
        case "gif":
            gif.gif(msg);
            break;
        case "space":
            switch (msgtok[2]) {
                case "people":
                    science.people(msg);
                    break;
            }
            break;
        case "iss":
            science.issLoc(msg);
            break;
        case "apod":
            science.apod(msg);
            break;
        case "spacex":
            science.spacex(msg);
            break;
        case "dice": case "roll":
            game.dice(msg);
            break;
        case "science":
            const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Science Help")
            .setDescription("These are the available commands")
            .addFields(
                { name: 'iss', value: 'The current coords of the ISS', inline: true },
                { name: 'space people', value: 'The people that are currently in space', inline: true },
                { name: 'apod', value: 'Astronomy picture of the day', inline: true },
                { name: 'spacex', value: 'Latest spacex launch', inline: true })
            msg.channel.send(embed)
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
