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
            .setTitle('**The people 👽 currently in space 🌌**')
        for (var i = 0; i < data['people'].length; i++) {
            embed.addField(data['people'][i]['name'], data['people'][i]['craft'] + " 🛰️",true)
        }
        msg.channel.send({embeds: [embed]});
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
        var lon = parseFloat(data['iss_position']['longitude']);
        var lat = parseFloat(data['iss_position']['latitude']);
        if (lon>=0) {
            lon="+"+lon
        }
        if (lat>=0) {
            lat="+"+lat
        }
        const coords = [lon, lat];
        const options = {
            width: 600,
            height: 400
        };
        // console.log(lat, lon)
        const map = new StaticMaps(options);
        var Options = {
            method: 'GET',
            params: {location: `${lat}${lon}`, limit:'1'},
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': '4bbb0b0049msh10fae1d3901cfadp12653fjsn62e2d1a9b2df'
            }
          };
          
          axios.request(Options).then(function (response) {
              var locdata = response.data.data[0]
              var Location
              if (locdata)
            Location = `${locdata.name}, ${locdata.country}`
          else
            Location = "an unknown location"
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
                    .setTitle(`The ISS is above ${Location} at coords ${lat}, ${lon}`)
                    .setImage('attachment://map.png');
                msg.channel.send({ embeds: [embed], files: [attachment] });
            })
            .catch(console.log);
          }).catch(function (error) {
              console.error(error);
          });
          
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
        msg.channel.send({ embeds: [embed] });
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
        msg.channel.send({ embeds: [embed] });

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
