let water = require('./commands/water');
let obscure = require('./commands/obscure');
let advice = require('./commands/advice');
let scoring = require('./scoring');

function handle(msg) {
    var userid = msg.author.id;
    var msgtok = msg.content.toLowerCase().split(" ");

    if (msgtok[0] = 'water') {
        water.command(msg);
    }
    if (msgtok[1] === 'color' || msgtok[1] === 'colour') {
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
    if(msgtok[1] === 'help'){
        advice.help(msg);
    }
    if(msgtok[1] === 'advice'){
        advice.advice(msg);
    }
    // else {
        // console.log("called obs")
        obscure.command(msg);
    // }
}

module.exports = {
    handle: handle
};