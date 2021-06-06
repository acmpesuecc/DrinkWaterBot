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


module.exports = {
    safe_joke: safe_joke,
    raw_joke: raw_joke,
    chuck_norris: chuck_norris,
    docs: docs
};
