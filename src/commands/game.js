const scoring = require('../scoring');
require('docstring');

function docs() {
    /**
    **Dice <num (optional)>:** Rolls a dice
    */
}

function dice(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    var size
    if (!isNaN(msgtok[2])) {
        size = `${msgtok[2]} sided `
        var rolled = Math.floor(Math.random() * parseInt(msgtok[2])) + 1;
    }
    else {
        size = ""
        var rolled = Math.floor(Math.random() * 6) + 1;
    }
    msg.reply(`<@${msg.author.id}>, The ${size} 🎲 rolls a ${rolled}`);
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    docs: docs,
    dice: dice
};
