const scoring = require('../scoring');

function advicecmd(msg) {
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

function help(msg) {
    (async () => {
        const BASE_URL = 'https://type.fit/api';
        try {
            const res = await axios.get(`${BASE_URL}/quotes`);
            const quotes = res.data;
            var len = quotes.length;
            len = Math.floor((Math.random() * len) + 1);
            console.log(quotes[len]["text"]);
            msg.reply(quotes[len]["text"]);
            scoring.inc(userid, 1);
            return
        } catch (e) {
            console.error(e);
        }
    })();
}

module.exports = {
    advice: advicecmd,
    advice: help
};