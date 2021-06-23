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
        const center = [0, 0];
        const options = {
            width: 600,
            height: 400
        };
        const map = new StaticMaps(options);
        const marker = {
            img: `${__dirname}/../img/marker.png`, // can also be a URL,
            offsetX: 240,
            offsetY: 240,
            width: 1024,
            height: 1024,
            coord: [data['iss_position']['latitude'], data['iss_position']['longitude']],
        };
        map.addMarker(marker);
        map.render(center)
            .then(() => map.image.save('single-marker.png'))
            .then(() => { console.log('File saved!'); })
            .catch(console.log);
        msg.reply(`The ISS is currently above ${data['iss_position']['latitude']}, ${data['iss_position']['longitude']}`);
    });
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    issLoc: issLoc
};
