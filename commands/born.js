const moment = require('moment');
const scoring = require('../scoring');

function when(msg) {
    var id = msg.author.id;
    var bin = (+id).toString(2);
    var unixbin = '';
    var unix = '';
    var m = 64 - bin.length;
    unixbin = bin.substring(0, 42 - m);
    unix = parseInt(unixbin, 2) + 1420070400000;
    var timestamp = moment.unix(unix / 1000);
    let times = (timestamp.format('YYYY-MM-DD, HH:mm:ss'));
    let years = timestamp.fromNow();
    msg.reply(`Hmmmm, I estimate you were born about ${years} ago, and to be precise, at ${times}`);
}


module.exports = {
    when: when
};