const Discord = require('discord.js');
require('docstring');
const { default: axios } = require('axios');
const scoring = require('../scoring');

function docs() {
    /**
     **Quote:** `<anything> quote`
     **Advice:** `<anything> advice`
     **8Ball:** `8ball <question>`
     */
}


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function advicecmd(msg) {
    var userid = msg.author.id;
    (async () => {
        const BASE_URL = 'https://api.adviceslip.com/advice';
        try {
            const res = await axios.get(`${BASE_URL}`);
            data = res.data;
            msg.reply(data["slip"]["advice"]);
            scoring.inc(userid, 1);
            return
        } catch (e) {
            console.error(e);
        }
    })();
}

function quote(msg) {
    var userid = msg.author.id;
    (async () => {
        const BASE_URL = 'https://type.fit/api';
        try {
            const res = await axios.get(`${BASE_URL}/quotes`);
            const quotes = res.data;
            var len = quotes.length;
            len = Math.floor((Math.random() * len) + 1);
            let author = quotes[len].author;
            // if author is null, set author to "Unknown"
            if (author == null) {
                author = "Unknown";
            }
            let quote = quotes[len].text;
            msg.reply(`"${quote}" - ${author}`);
            scoring.inc(userid, 1);
            return
        } catch (e) {
            console.error(e);
        }
    })();
}

function eight_ball(msg) {
    const ans_types = ["Affirmative", "Contrary", "Neutral"];
    const answers = ["Signs point to yes", "Don't count on it", "Reply hazy, try again later", "You may rely on it", "Outlook not so good", "Very doubtful", "It is certain", "Concentrate and ask again", "Without a doubt", "Don't count on it"];
    const type = [0, 1, 2, 0, 1, 1, 0, 2, 0, 1];
    var q = "";
    var msgtok = msg.content.toLowerCase().split(" ");
    for (var i = 1; i < msgtok.length; i++) {
        q += (msgtok[i] + " ");
    }
    var ch = randomInteger(0, 9);
    const embed = new Discord.MessageEmbed()
        .setColor("#A100FB")
        .setTitle("DrinkWaterBot answers your questions!")
        .addFields(
            { 'name': "Question", value: `${q}` },
            { 'name': "Answer Category", value: `${ans_types[type[ch]]}` },
            { 'name': "Answer", value: `${answers[ch]}` });
    msg.channel.send(embed)
}

module.exports = {
    advice: advicecmd,
    quote: quote,
    eight_ball: eight_ball,
    docs: docs
};
