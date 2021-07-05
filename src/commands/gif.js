const { default: axios } = require('axios');
const scoring = require('../scoring');
require('docstring');

const giphy_key = process.env.GIPHY_KEY;
const tenor_key = process.env.TENOR_KEY;

function docs() {
    /**
    **Random GIF:** `want haha` or `want gif`
    **Nicholas Cage GIF:** `cage` or `nicholas cage` or `nick cage`
    **Specific GIF:** `water gif <query>`
    */
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function command(msg) {
    switch (msg.content) {
        case "want haha": case "want gif":
            laugh(msg);
            break;
        case "cage": case 'nicholas cage': case 'nick cage':
            cage(msg);
            break;
        default:
            return;
    }
}

function gif(msg) {
    const msgtok = msg.content.toLowerCase().split(" ");
    msgtok.shift();
    msgtok.shift();
    const query = msgtok.join('-');
    const r = randomInteger(0, 19);
    (async () => {
        const BASE_URL = 'https://g.tenor.com/v1/random?q=' + query + '&limit=20&key=' + tenor_key;
        try {
            const res = await axios.get(`${BASE_URL}`);
            msg.channel.send(res['data']['results'][r]['url']);
            return
        } catch (e) {
            console.error(e);
        }
    })();
    scoring.inc(msg.author.id, 1);
}

function cage(msg) {
    const r = randomInteger(0, 29);
    (async () => {
        const BASE_URL = 'https://g.tenor.com/v1/random?q=nicholas-cage&limit=30&key=' + tenor_key;
        try {
            const res = await axios.get(`${BASE_URL}`);
            msg.channel.send(res['data']['results'][r]['url']);
            return
        } catch (e) {
            console.error(e);
        }
    })();
    scoring.inc(msg.author.id, 1);
}

function laugh(msg) {
    (async () => {
        const BASE_URL = 'http://api.giphy.com/v1/gifs/random?api_key=' + giphy_key;
        try {
            const res = await axios.get(`${BASE_URL}`);
            msg.channel.send(res['data']['data']['url']);
            return
        } catch (e) {
            console.error(e);
        }
    })();
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    command: command,
    gif: gif,
    docs: docs
};
