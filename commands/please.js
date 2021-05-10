const scoring = require('../scoring');

function command(msg) {
    switch (msg.content.toLowerCase()) {
        case "please get me out of sad":
            msg.channel.send('https://tenor.com/view/slap-bear-slap-me-you-gif-17942299');
            break;
    }
}

module.exports = {
    command: command
};