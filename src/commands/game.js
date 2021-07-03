const scoring = require('../scoring');
require('docstring');

function docs() {
    /**
    **Dice <num (optional)>:** Rolls a dice
    */
}

function dice(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    if (!isNaN(msgtok[2])) {
        var rolled = Math.floor(Math.random() * parseInt(msgtok[2])) + 1;
    }
    else {
        var rolled = Math.floor(Math.random() * 6) + 1;
    }
    msg.reply(`The 🎲 rolls a ${rolled}`);
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    docs: docs,
    dice: dice
};
