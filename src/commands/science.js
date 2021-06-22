const { default: axios } = require('axios');
const scoring = require('../scoring');

function issLoc(msg) {
    const url = "http://api.open-notify.org/iss-now.json";
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data;
        msg.reply(`The ISS is currently above ${data['iss_position']['latitude']}, ${data['iss_position']['longitude']}`);
    });
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    issLoc: issLoc
};
