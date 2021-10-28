const water = require('./commands/water');
const obscure = require('./commands/obscure');
const advice = require('./commands/advice');
const scoring = require('./scoring');
const { default: axios } = require('axios');
const please = require('./commands/please');
const wholesome = require('./commands/wholesome');
const born = require('./commands/born');
const joke = require('./commands/joke');

function handle(msg) {
    var userid = msg.author.id;
    var msgtok = msg.content.toLowerCase().split(" ");


    scoring.msgCount(msg);
    var wholesome_flag = false;
    var i;
    for (i = 1; i < msgtok.length; i++) {
        if (msgtok[i] === 'wholesome') {
            wholesome_flag = true;
        }
    }

    if (msgtok[0] === 'water') {
        if (msgtok[1] === 'joke' && (msgtok.includes("not") == false && msgtok.includes("don't") == false && msgtok.includes("dont") == false && msgtok.includes("no") == false)) {
            joke.raw_joke(msg);
        }
        else if (msgtok[1] === 'chuck' && msgtok[2] === 'norris' && (msgtok.includes("not") == false && msgtok.includes("don't") == false && msgtok.includes("dont") == false && msgtok.includes("no") == false)) {
            joke.chuck_norris(msg);
        }
        else {
            water.command(msg);
        }
    }

    else if (msgtok[0] === "doc") {
        msg.reply("`doc` has been deprecated. Try `water help` instead!");
    }
    else if (msgtok[0] === 'pls' && msgtok[1] === 'help') {
        replies = ["Ugh watch the dufus bot reply now", "Wrong prefix dweeb", "Did you intend to not call me?", "hi but bye."]
        num = Math.floor(Math.random() * (4 - 0) + 0);
        msg.reply(replies[num]);
    }
    else if (msgtok[0] === 'color' || msgtok[0] === 'colour') {
        (async () => {
            const BASE_URL = 'https://api.color.pizza/v1';
            const num = msg.content.toLowerCase().split(" ")[1]
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
    else if (msgtok[1] === 'quote' && (msgtok.includes("not") == false && msgtok.includes("don't") == false && msgtok.includes("dont") == false && msgtok.includes("no") == false)) {
        advice.quote(msg);
    }
    else if (msgtok[1] === 'advice' && (msgtok.includes("not") == false && msgtok.includes("don't") == false && msgtok.includes("dont") == false && msgtok.includes("no") == false)) {
        advice.advice(msg);
    }
    else if (msgtok[0] === 'safe' && msgtok[1] === 'joke') {
        joke.safe_joke(msg);
    }

    else if (msgtok[0] === '8ball') {
        advice.eight_ball(msg);
    }
    else if (msgtok.includes("please") === true) {
        please.command(msg);
    }
    else if (wholesome_flag === true && msgtok[0] === "pwease") {
        wholesome.pwease(msg)
        scoring.inc(msg.author.id, 1);
    }
    else if (wholesome_flag === true && msgtok[0] !== "pwease") {
        msg.channel.send("Please be more polite! I may be here to serve your needs but not to obey your commands")
    }
    else if (msgtok[3] === 'born') {
        born.when(msg);
    }
    else {
        obscure.command(msg);
    }
}

module.exports = {
    handle: handle
};
