const { default: axios } = require('axios');
const scoring = require('../scoring');

const giphy_key = process.env.GIPHY_KEY

function command(msg) {
    const msgtok = msg.content.toLowerCase().split(" ");
    switch (msg.content) {
        case "want haha": case "want gif":
            laugh(msg);
            break;
        case "cage": case 'nicholas cage': case 'nick cage': case 'nick cage':
            cage(msg);
            break;
        default:
            return;
    }
}

function cage(msg) {
    (async () => {
        const BASE_URL = 'http://api.giphy.com/v1/gifs/random?api_key=' + giphy_key + '&tag=nicholas-cage';
        try {
            const res = await axios.get(`${BASE_URL}`);
            console.log(res['data']['data']['url']);
            msg.reply(res['data']['data']['url']);
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
            console.log(res['data']['data']['url']);
            msg.reply(res['data']['data']['url']);
            return
        } catch (e) {
            console.error(e);
        }
    })();
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    command: command
};
