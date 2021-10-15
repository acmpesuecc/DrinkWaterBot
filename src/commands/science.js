const Discord = require('discord.js');
const { default: axios } = require('axios');
const StaticMaps = require('staticmaps');
const scoring = require('../scoring');
require('docstring');

const nasa_key = process.env.NASA_KEY;

function docs() {
    /**
    **Space People:** Retuns the names and spacecraft of the astronauts in space
    **ISS:** Returns the current location of the International Space Station
    **APoD:** Returns NASA's astronomy picture of the day
    **SpaceX:** Returns info about the latest SpaceX launch
    */
}

function people(msg) {
    const url = "http://api.open-notify.org/astros.json";
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data;
        const embed = new Discord.MessageEmbed()
            .setColor('#f5b642')
            .setTitle('**The people currently in space🚀👨‍🚀🌍🌌**')
        for (var i = 0; i < data['people'].length; i++) {
            embed.addField(data['people'][i]['name'], data['people'][i]['craft'], true)
        }
        msg.channel.send(embed);
    });
    scoring.inc(msg.author.id, 1);
}

function issLoc(msg) {
    const url = "http://api.open-notify.org/iss-now.json";
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data;
        const lon = parseFloat(data['iss_position']['longitude']);
        const lat = parseFloat(data['iss_position']['latitude']);
        const coords = [lon, lat];
        const options = {
            width: 600,
            height: 400
        };
        const map = new StaticMaps(options);
        var Options = {
            method: 'GET',
            url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
            params: {latitude: data['iss_position']['latitude'], longitude:data['iss_position']['longitude'], range: '0'},
            headers: {
              'x-rapidapi-host': 'geocodeapi.p.rapidapi.com',
              'x-rapidapi-key': 'eec2b7d97amsh4b1d631f12ef3ecp1c887bjsnf5d1c4fd5efb'
            }
          };
          
          axios.request(Options).then((response)=> {
              Data= response.data[0];
              console.log(Data.City); //Here I get the city to display
              var city=Data.City;

          }).catch((error) => {
              console.error(error);
          });
        const marker = {
            img: `${__dirname}/../img/iss.png`,
            width: 54,
            height: 21,
            coord: coords,
        };
        map.addMarker(marker);
        map.render([0, 0], 1)
            .then(() => map.image.save(`${__dirname}/../img/iss-map.png`))
            .then(() => {
                const attachment = new Discord.MessageAttachment(`${__dirname}/../img/iss-map.png`, 'map.png');
                
                const embed = new Discord.MessageEmbed()
                    .setTitle(`The ISS is above ${city} (${lat}, ${lon})`)
                    .attachFiles(attachment)
                    .setImage('attachment://map.png');
                msg.channel.send({ embed });
            })
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
            description: data['explanation']
        };
        msg.channel.send({ embed: embed });
    });
    scoring.inc(msg.author.id, 1);
}

function spacexLaunch(msg) {
    const url = "https://api.spacexdata.com/v4/launches/latest";
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        data = response.data;
        console.log(data)
        const embed = {
            color: 0x0099ff,
            title: `**Latest SpaceX Launch**`,
            image: {
                url: data.links.patch.small,
            },
            description: data.details
        };
        msg.channel.send({ embed: embed });

    });
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    docs: docs,
    issLoc: issLoc,
    apod: apod,
    people: people,
    spacex: spacexLaunch
};