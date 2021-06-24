const { default: axios } = require('axios');
const StaticMaps = require('staticmaps');
const scoring = require('../scoring');

const nasa_key = process.env.NASA_KEY;

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

function apod(msg) {
    const url = "https://api.nasa.gov/planetary/apod?api_key=" + nasa_key;
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data;
        const embed = {
            color: 0x0099ff,
            title: `**${data['title']}**`,
            image: {
                url: data['url'],
            },
            fields: [{
                name: 'Explanation',
                value: data['explanation']
            }]
        };
        msg.channel.send({ embed: embed });
    });
}

module.exports = {
    issLoc: issLoc,
    apod: apod
};
