const scoring = require('../scoring');

function command(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    switch (msgtok[1]) {
        case "help":
            msg.reply('Checkout help stuff at https://srujandeshpande.github.io/DrinkWaterBot/');
            break;
        case "score":
        case "points":
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

    if (msgtok[1] == "feature" && msgtok[2] == "request") {
        msg.reply("Create a new issue over at https://github.com/srujandeshpande/DrinkWaterBot/issues for any feature requests or bug reporting!");

        /* Block for possible future direct issue creation

        if (msgtok[3] == "help") {
            msg.reply("Use this command to request a new feature (or report a bug) to DrinkWaterBot! This command can only be used once per day.\n To use it, type `water feature request <short request title> $ <optional request body >`")
        }
        else {
            var title = "";
            var body = "";
            var swap = 0;
            for (var i = 3; i < msgtok.length; i++) {
                if (msgtok[i] != "$" && !swap) {
                    title += msgtok[i] + " ";
                }
                else if (msgtok[i] == "$" && !swap) {
                    swap = 1;
                }
                else if (msgtok[i] != "$" && swap) {
                    body += msgtok[i] + " ";
                }
                else {
                    msg.reply("Check your syntax again or get help with `water feature request help`");
                    return;
                }
            }
        }
        */
    }
}

module.exports = {
    command: command
};