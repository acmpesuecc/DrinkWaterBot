const scoring = require('../scoring');

function command(msg) {
    switch (msg.content.toLowerCase()) {
        case "please get me out of sad":
            msg.channel.send('https://tenor.com/view/slap-bear-slap-me-you-gif-17942299');
            scoring.inc(msg.author.id, 1);
            break;
        case "please get me out of happy":
            msg.channel.send('https://tenor.com/view/killed-em-hold-this-stabbed-gif-14017151');
            scoring.inc(msg.author.id, 1);
            break;
        case "please give me pats":
            msg.channel.send('https://media0.giphy.com/media/mn1cym1jiJOUg/giphy.gif');
            scoring.inc(msg.author.id, 1);
            break;
    }
}

module.exports = {
    command: command
};
