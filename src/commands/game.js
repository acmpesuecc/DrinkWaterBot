const scoring = require('../scoring');
require('docstring');

function docs() {
    /**
    **Dice <num (optional)>:** Rolls a dice
    */
}

function dice(msg) {
    var msgtok = msg.content.toLowerCase().split(" ");
    var sides
    if (!isNaN(msgtok[2])) {
        sides = `${msgtok[2]} sided `
        var rolled = Math.floor(Math.random() * parseInt(msgtok[2])) + 1;
    }
    else {
        sides=""
        var rolled = Math.floor(Math.random() * 6) + 1;
    }
    msg.reply(`The ${sides}🎲 rolls a ${rolled}`);
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    docs: docs,
    dice: dice
};
