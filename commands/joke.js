const scoring = require('../scoring');
require('docstring');
const Discord = require('discord.js');
const { default: axios } = require('axios');


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function docs() {
    /**
     **Usage:** `<anything> joke` for *any* joke
     **Safe Mode:** `safe joke`
     **Chuck Norris:** `<anything> chuck norris`
     */
}

function chuck_norris(msg) {
    const url = "https://api.chucknorris.io/jokes/random";
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data
        const embed = new Discord.MessageEmbed()
            .setColor("#fc861e")
            .setTitle("Chuck Norris presents DrinkWaterBot!")
            .setDescription(data['value']);
        msg.channel.send(embed)
    });
}

function joke(url, msg) {
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data
        if (data['type'] === 'single') {
            const embed = new Discord.MessageEmbed()
                .setColor("#90ee90")
                .setTitle("DrinkWaterBot Presents Joketopia!")
                .addFields(
                    { 'name': `#${data['id']}`, value: data['joke'] });
            msg.channel.send(embed)
        }
        else if (data['type'] === 'twopart') {
            const embed = new Discord.MessageEmbed()
                .setColor("#800080")
                .setTitle("DrinkWaterBot Presents Joketopia!")
                .addFields(
                    { 'name': `#${data['id']}`, value: data['setup'] + "\n" + data['delivery'] });
            msg.channel.send(embed)
        }
    });
}

function raw_joke(msg) {
    url = "https://v2.jokeapi.dev/joke/Any"
    joke(url, msg);
}

function safe_joke(msg) {
    url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit"
    joke(url, msg);
}

function eight_ball(msg) {
    const ans_types = ["Affirmative", "Contrary", "Neutral"]
    const answers = ["Signs point to yes", "Don't count on it", "Reply hazy, try again later", "You may rely on it", "Outlook not so good", "Very doubtful", "It is certain", "Concentrate and ask again", "Without a doubt", "Don't count on it"];
    const type = [0, 1, 2, 0, 1, 1, 0, 2, 0, 1]
    var q = "";
    var msgtok = msg.content.toLowerCase().split(" ");
    for (var i = 1; i < msgtok.length; i++) {
        q += (msgtok[i] + " ");
    }
    var ch = randomInteger(0, 9);
    const embed = new Discord.MessageEmbed()
        .setColor("#90ee90")
        .setTitle("DrinkWaterBot Presents Joketopia!")
        .addFields(
            { 'name': `#${data['id']}`, value: data['joke'] });
    msg.channel.send(embed)
}

module.exports = {
    safe_joke: safe_joke,
    raw_joke: raw_joke,
    chuck_norris: chuck_norris,
    eight_ball: eight_ball,
    docs: docs
};
