const scoring = require('../scoring');

function command(msg) {
    switch (msg.content.toLowerCase()) {
        case "please get me out of sad":
            msg.channel.send('https://tenor.com/view/slap-bear-slap-me-you-gif-17942299');
            scoring.inc(msg.author.id, 1);
            break;
        case "please get me out of happy":
            msg.channel.send('https://tenor.com/view/killed-em-hold-this-stabbed-gif-14017151');
            scoring.inc(msg.author.id, 1);
            break;
        case "please give me pats":
            msg.channel.send('https://media0.giphy.com/media/mn1cym1jiJOUg/giphy.gif');
            scoring.inc(msg.author.id, 1);
            break;
         case "please give me hugs":
            msg.channel.send('https://media.tenor.com/images/ecf4840ba6fac22be773e586493d5283/tenor.gif');
            scoring.inc(msg.author.id, 1);
            break;
         case "no tears please":
            msg.channel.send('https://i.pinimg.com/originals/3e/ce/ef/3eceefc04128c32e8a5f5173dd1bd27f.gif');
            scoring.inc(msg.author.id, 1);
            break; 
         case "good vibes only":
            msg.channel.send('https://i.pinimg.com/564x/af/e4/c6/afe4c6614ea9c631059d941ed00b4ee5.jpg');
            scoring.inc(msg.author.id, 1);
            break;
            
    }
}


module.exports = {
    command: command
};
