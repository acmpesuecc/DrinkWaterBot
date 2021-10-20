const scoring = require('../scoring');
const gif = require('./gif');

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
        case "im thirsty": case "i am thirsty": case "i'm thirsty":
            msg.reply("Go drink some water right now! 🥤");
        case "im bored": case "i am bored": case "i'm bored":
            msg.reply("Drink some water and go to bed!🥤😴");
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
        default:
            gif.command(msg);
            return;
    }
    scoring.inc(msg.author.id, 1);
}

module.exports = {
    command: command
};
