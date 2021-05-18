const scoring = require('../scoring');
require('docstring');
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function docs()
{
      /**
       * Usage : must start with "pwease" and contain word "wholesome"
       * Arguments : [Optional] cat , sad , poke | these can be present anywhere in the message command 
       */
}
  
function pwease(msg) {
    var no_flag = true;
    var possible = ["cat", "sad", "poke", "doggo"];
    var msgtok = msg.content.toLowerCase().split(" ");
    var i;
    var pokemon = ['https://media.tenor.com/images/4037c6f194633446d03ef31f0a676b4c/tenor.gif', 'https://media.tenor.com/images/4e1ebdc31f2e67c285b19ee7b8468150/tenor.gif', 'https://media.tenor.com/images/6f2c4f740122ce4ea72d03450d6a9642/tenor.gif'];
    var cat = ['https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif', 'https://corporatebytes.in/wp-content/uploads/challeneg-7.gif', 'https://media0.giphy.com/media/Jqzc9fbHtciNckOAgl/200w.gif'];
    var sad = ['https://i.pinimg.com/474x/c1/f7/54/c1f75411a4d91447b6c9d79e831d5ad6.jpg', 'https://i.imgur.com/8BHmsCK.gif', 'https://jessym04.github.io/finalproject/qt.gif'];
    var doggo = ['https://64.media.tumblr.com/7274ad455882ec2049c452b7ec074374/tumblr_pt0qtpABkT1vmobp0o1_400.gifv', 'https://media.tenor.com/images/92dc23b436aaf177bb044dd3a53b38f6/tenor.gif', 'https://static0.thetalkoimages.com/wordpress/wp-content/uploads/2020/03/Swimming-Above-the-Water-anim.gif?fm=gif&frame=all&q=50&fit=crop&w=740&h=740&dpr=1.5'];
    console.log(possible.includes("cat"));
    for (i = 0; i < msgtok.length; i++) {
        if (possible.includes(msgtok[i])) {
            no_flag = false;
            if (msgtok[i] == "cat") {
                var randomnumber = randomInteger(0, 2);
                msg.channel.send(cat[randomnumber]);
            }
            if (msgtok[i] == "sad") {
                var randomnumber = randomInteger(0, 2);
                msg.channel.send(sad[randomnumber]);
            }
            if (msgtok[i] == "poke") {
                var randomnumber = randomInteger(0, 2);
                msg.channel.send(pokemon[randomnumber]);
            }
            if (msgtok[i] == "doggo") {
                var randomnumber = randomInteger(0, 2);
                msg.channel.send(doggo[randomnumber]);
            }

        }
    }
    if (no_flag == true) {
        msg.channel.send("https://i.pinimg.com/originals/91/70/18/9170184088e088967d1b4c8baad5f440.gif")
    }
}


module.exports = {
    pwease: pwease,
    docs: docs
};
