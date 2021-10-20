const scoring = require('../scoring');
require('docstring');

function docs() {
    /**
    **Dice <num (optional)>:** Rolls a dice
    */
}

function dice(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    const diceSides = msgtok[2];
    if (!isNaN(diceSides) && diceSides != 6) {
        var rolled = Math.floor(Math.random() * parseInt(diceSides)) + 1;
        msg.reply(`The ${diceSides} sided 🎲 rolls a ${rolled}`);
    }
    else {
        var rolled = Math.floor(Math.random() * 6) + 1;
        msg.reply(`The 🎲 rolls a ${rolled}`);
    }
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    docs: docs,
    dice: dice
};
