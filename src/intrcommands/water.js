const scoring = require('../scoring');
const Discord = require('discord.js');
const help = require('./help');
// const help = require('./help');
const contrib = require('./contribute');
const gif = require('./gif');
// const science = require('./science');
// const game = require('./game');

function command(intr) {
    // console.log(intr.options.getString("commandname"))
    if (intr.options.getString("cmd")) {
        const msgtok = intr.options.getString("cmd")
        
            //     //     scoring.inc(msg.author.id, 1);
        if (msgtok === "version"){
            intr.reply(process.env.npm_package_version);
        }
        else if (msgtok==="score") {
            (async () => {
                let points = await scoring.get(intr.member.user.id);
                if (points == 0) {
                    intr.reply('Damn such empty. You have no points.');
                } else {
                    intr.reply(`You have ${points} points.`);
                }
            })();
        }
        
        else if (msgtok === "featreq") {
                intr.reply("Create a new issue over at https://github.com/srujandeshpande/DrinkWaterBot/issues for any feature requests or bug reporting!");
            }
        
        else if (msgtok === "contrib") {
            contrib.contrib(intr);
        }
        else if (msgtok === "aggressive") {
            intr.reply('https://pics.me.me/thumb_did-you-drink-water-today-you-stupid-bitch-did-you-66625033.png')
            scoring.inc(intr.member.user.id, 1);
        }
        else if (msgtok === "spcppl"){
            science.people(intr)
        }
    }

    //     // case "space":
    //     //     switch (msgtok[2]) {
    //     //         case "people":
    //     //             science.people(msg);
    //     //             break;
    //     //     }
    //     //     break;
    //     // case "iss":
    //     //     science.issLoc(msg);
    //     //     break;
    //     // case "apod":
    //     //     science.apod(msg);
    //     //     break;
    //     // case "spacex":
    //     //     science.spacex(msg);
    //     //     break;
    //     // case "dice": case "roll":
    //     //     game.dice(msg);
    //     //     break;
    //     // default:
    //     //     msg.channel.send('https://preview.redd.it/po8ahy378nj31.jpg?auto=webp&s=49be947a9a438635c48636af09cc9934e0290a39');
    //     //     scoring.inc(msg.author.id, 1);
    //     //     break;
    // }
    else if (intr.options.getString("helpcmd")) {
        help.scripy(intr);
    }
    else if (intr.options.getString("gifcmd")) {
        gif.gif(intr)
    }
    else{
        intr.reply('https://preview.redd.it/po8ahy378nj31.jpg?auto=webp&s=49be947a9a438635c48636af09cc9934e0290a39');
    }
}


module.exports = {
    command: command
};
