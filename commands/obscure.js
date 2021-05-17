const scoring = require('../scoring');

function command(msg) {
    switch (msg.content.toLowerCase()) {
        case "hello":
            msg.reply('Hi! Remember to Drink Water Today 🥤:)');
            break;
        case "hi":
            msg.reply("Hiya Partner! Drink up it's water time🥤!");
            break;
        case "im hungry": case "i am hungry": case "i'm hungry":
            msg.reply("Drink water, food is for the weak 🥤 ");
            break;
        case "im bored": case "i am bored": case "i'm bored":
            msg.reply("Drink some water and go to bed!🥤😴");
            break;
        case "water":
            msg.channel.send('https://preview.redd.it/po8ahy378nj31.jpg?auto=webp&s=49be947a9a438635c48636af09cc9934e0290a39');
            break;
        case "who made you?": case "who made you":
            msg.reply("An amazing team 😉");
            break;
        case "romeo":
            msg.reply("Juliet");
            break;
        case "antonio":
            msg.reply("Bassanio");
            break;
        case "binod":
            reply(msg.content);
            break;
        case "ping":
            msg.channel.send('pong');
            break;
        case "marco":
            msg.channel.send('polo');
            break;
        case "baa":
            msg.channel.send('moo');
            break;
        case "moo":
            replies = ["buy me a chanel shoe", "you do you boo", "my heart is broken, give me some glue"]
            num = Math.floor(Math.random() * (3 - 0) + 0);
            msg.reply(replies[num]);
            break;
        case "gif": case "want haha": case "tickle me":
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
            break;
        case "cage": case 'nicholas cage': case 'nick cage': case 'nick cage':
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
            break;
        default:
            return;
    }
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    command: command
};
