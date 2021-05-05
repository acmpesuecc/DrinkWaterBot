const scoring = require('../scoring');

function command(msg) {
    switch (msg.content.toLowerCase()) {
        case "water help":
            msg.reply('Checkout help stuff at https://srujandeshpande.github.io/DrinkWaterBot/');
            break;
        case ("water score"):
        case ("water points"):
            (async () => {
                let points = await scoring.get(msg.author.id);
                if (points == 0) {
                    msg.reply('Damn such empty. You have no points.')
                } else {
                    msg.reply(`You have ${points} points.`)
                }
            })();
            break;
    }
}

module.exports = {
    command: command
};