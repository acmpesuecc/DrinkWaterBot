const scoring = require('../scoring');
require('docstring');

function docs() {
    /**
    **Dice <num (optional)>:** Rolls a dice
    */
}

function dice(intr) {
    var rolled = Math.floor(Math.random() * 6) + 1;
    intr.reply(`<@${intr.member.user.id}>, The 🎲 rolls a ${rolled}`);
    scoring.inc(intr.member.user.id, 1);
}

module.exports = {
    docs: docs,
    dice: dice
};
