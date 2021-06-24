const { default: axios } = require('axios');
const StaticMaps = require('staticmaps');
const scoring = require('../scoring');

function issLoc(msg) {
    const url = "http://api.open-notify.org/iss-now.json";
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data;
        const coords = [parseFloat(data['iss_position']['longitude']), parseFloat(data['iss_position']['latitude'])];
        const options = {
            width: 600,
            height: 400
        };
        const map = new StaticMaps(options);
        const marker = {
            img: `${__dirname}/../img/iss.png`,
            width: 54,
            height: 21,
            coord: coords,
        };
        map.addMarker(marker);
        map.render([0, 0], 1)
            .then(() => map.image.save(`${__dirname}/../img/iss-map.png`))
            .then(() => msg.channel.send(`The ISS is currently above ${parseFloat(data['iss_position']['latitude'])}, ${parseFloat(data['iss_position']['longitude'])}`, {
                files: [`${__dirname}/../img/iss-map.png`]
            }))
            .catch(console.log);
    });
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    issLoc: issLoc
};
