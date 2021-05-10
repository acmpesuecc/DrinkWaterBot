const water = require('./commands/water');
const obscure = require('./commands/obscure');
const advice = require('./commands/advice');
const scoring = require('./scoring');
const { default: axios } = require('axios');
const please = require('./commands/please');

function handle(msg) {
    var userid = msg.author.id;
    var msgtok = msg.content.toLowerCase().split(" ");

    if (msgtok[0] === 'water') {
        water.command(msg);
    }
    else if (msgtok[0] === 'pls' && msgtok[1] === 'help') {
        replies = ["Ugh watch the dufus bot reply now", "Wrong prefix dweeb", "Did you intend to not call me?", "hi but bye."]
        num = Math.floor(Math.random() * (4 - 0) + 0);
        msg.reply(replies[num]);
    }
    else if (msgtok[1] === 'color' || msgtok[1] === 'colour') {
        (async () => {
            const BASE_URL = 'https://api.color.pizza/v1';
            const num = msg.content.toLowerCase().split(" ")[3]
            try {
                const res = await axios.get(`${BASE_URL}/${num}`);
                msg.reply(num + ": " + res['data']['colors'][0]['name']);
                scoring.inc(userid, 1);
                return
            } catch (e) {
                console.error(e);
            }
        })();
    }
    else if (msgtok[0]=== 'send' && msgtok[1] === 'help') {
        advice.help(msg);
    }
    else if (msgtok[1] === 'advice') {
        advice.advice(msg);
    }
    else if (msgtok[0] === 'please') {
        please.command(msg);
    }
    else {
        obscure.command(msg);
    }
}

module.exports = {
    handle: handle
};
