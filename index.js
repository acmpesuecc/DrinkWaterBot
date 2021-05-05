require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
let scoring = require('./scoring');

// Get GIPHY API key from env
const giphy_key = process.env.GIPHY_KEY;

// Create discord client
const client = new Discord.Client();


// LISTENERS

// Event listener when a user connected to the server.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener when a user sends a message in the chat.
client.on('message', msg => {

  // If the bot is the one messaging, the disregard the message.
  if (msg.author.id == '739820357300781056') {
    return
  }
  var userid = msg.author.id;


  if (msg.content.toLowerCase() === 'water help') {
    msg.reply('Checkout help stuff at https://srujandeshpande.github.io/DrinkWaterBot/');
  }

  if (msg.content.toLowerCase() === 'water score' || msg.content.toLowerCase() === 'water points') {
    (async () => {
      let points = await scoring.get(userid);
      if (points == 0) {
        msg.reply('Damn such empty. You have no points.')
      } else {
        msg.reply(`You have ${points} points.`)
      }
    })();
  }
  if (msg.content.toLowerCase() === 'hello') {
    msg.reply('Hi! Remember to Drink Water Today 🥤:)');
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === 'hi') {
    msg.reply("Hiya Partner! Drink up it's water time🥤!");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === "im hungry" || msg.content.toLowerCase() === "i am hungry" || msg.content.toLowerCase() === "i'm hungry") {
    msg.reply("Drink water, food is for the weak 🥤 ");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === "im bored" || msg.content.toLowerCase() === "i'm bored" || msg.content.toLowerCase() === "i am bored") {
    msg.reply("Drink some water and go to bed!🥤😴");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === "who made you?" || msg.content.toLowerCase() === "who made you") {
    msg.reply("An amazing team 😉");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() == "romeo") {
    msg.reply("Juliet");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() == "antonio") {
    msg.reply("Bassanio");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() == "binod") {
    msg.reply("Binod");
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === 'ping') {
    msg.channel.send('pong');
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === 'marco') {
    msg.channel.send('polo');
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === 'baa') {
    msg.channel.send('moo');
    scoring.inc(userid, 1);
  }
  if (msg.content.toLowerCase() === 'moo') {
    replies = ["buy me a chanel shoe", "you do you boo", "my heart is broken, give me some glue"]
    num = Math.floor(Math.random() * (3 - 0) + 0);
    msg.reply(replies[num]);
    scoring.inc(userid, 1);
  }

  if (msg.content.toLowerCase() === 'need help' || msg.content.toLowerCase() === 'please help' || msg.content.toLowerCase() === 'pls help') {
    (async () => {
      // code goes here
      const BASE_URL = 'https://type.fit/api';
      try {
        const res = await axios.get(`${BASE_URL}/quotes`);
        const quotes = res.data;
        var len = quotes.length;
        len = Math.floor((Math.random() * len) + 1);
        console.log(quotes[len]["text"]);
        msg.reply(quotes[len]["text"]);
        scoring.inc(userid, 1);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if (msg.content.toLowerCase() === 'need advice' || msg.content.toLowerCase() === 'please advice' || msg.content.toLowerCase() === 'pls advice' || msg.content.toLowerCase() === 'advice') {
    (async () => {
      // code goes here
      const BASE_URL = 'https://api.adviceslip.com/advice';
      try {
        const res = await axios.get(`${BASE_URL}`);
        data = res.data;
        msg.reply(data["slip"]["advice"]);
        scoring.inc(userid, 1);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if (msg.content.toLowerCase() === 'gif' || msg.content.toLowerCase() === 'want haha' || msg.content.toLowerCase() === 'tickle me') {
    (async () => {
      // code goes here
      const BASE_URL = 'http://api.giphy.com/v1/gifs/random?api_key=' + giphy_key;
      try {
        const res = await axios.get(`${BASE_URL}`);
        console.log(res['data']['data']['url']);
        msg.reply(res['data']['data']['url']);
        scoring.inc(userid, 1);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if (msg.content.toLowerCase() === 'cage' || msg.content.toLowerCase() === 'nicholas cage' || msg.content.toLowerCase() === 'nick cage' || msg.content.toLowerCase() === 'nick cage') {
    (async () => {
      // code goes here
      const BASE_URL = 'http://api.giphy.com/v1/gifs/random?api_key=' + giphy_key + '&tag=nicholas-cage';
      try {
        const res = await axios.get(`${BASE_URL}`);
        console.log(res['data']['data']['url']);
        msg.reply(res['data']['data']['url']);
        scoring.inc(userid, 1);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if (msg.content.toLowerCase().split(" ")[1] === 'color') {
    (async () => {
      // code goes here
      const BASE_URL = 'https://api.color.pizza/v1';
      const num = msg.content.toLowerCase().split(" ")[3]
      try {
        const res = await axios.get(`${BASE_URL}/${num}`);
        msg.reply(num + ": " + res['data']['colors'][0]['name']);
        scoring.inc(userid, 1);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

});


// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
