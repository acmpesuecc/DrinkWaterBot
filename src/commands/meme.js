require('docstring');
const Discord = require('discord.js');
const { default: axios } = require('axios');

const BASE_URL = "https://api.memegen.link";

function docs()
{
    /*
        * Usage: `meme <keyword> <top text (1 word)> <bottom text (1 word)>` to generate a new meme
    */
}



function getMeme(message, template, top_text, bottom_text)
{
    console.log(message)
    console.log(template)
    console.log(top_text, bottom_text);


    if (!bottom_text)
    {
        bottom_text = ""
    }

    message.reply(BASE_URL + `/${template}/${top_text}/${bottom_text}`)
        .then(response => console.log("Sent meem"))
        .catch(error => console.log("error meem"))
}


module.exports = {
    meme: getMeme,
    docs: docs
};
