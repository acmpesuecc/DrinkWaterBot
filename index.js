// Run dotenv
require('dotenv').config();
const axios = require('axios')

// Import libraries
const Discord = require('discord.js');
const client = new Discord.Client();

// Event listener when a user connected to the server.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener when a user sends a message in the chat.
client.on('message', msg => {

  // We check the message content and looks for the word "ping", so we can have the bot respond "pong"
  if (msg.content.toLowerCase() === 'water help') {
    msg.channel.reply('Checkout help stuff at https://srujandeshpande.github.io/DrinkWaterBot/');
  }
  if (msg.content.toLowerCase() === 'hello') {
    msg.reply('Hi! Remember to Drink Water Today 🥤:)');
  }
  if (msg.content.toLowerCase() === 'hi') {
    msg.reply("Hiya Partner! Drink up it's water time🥤!");
  }
  if (msg.content.toLowerCase() === "im hungry" || msg.content.toLowerCase() === "i am hungry" || msg.content.toLowerCase() === "i'm hungry") {
    msg.reply("Drink water, food is for the weak 🥤 ");
  }
  if (msg.content.toLowerCase() === "im bored" || msg.content.toLowerCase() === "i'm bored" || msg.content.toLowerCase() === "i am bored") {
    msg.reply("Drink some water and go to bed!🥤😴");
  }
  if (msg.content.toLowerCase() === "who made you?" || msg.content.toLowerCase() === "who made you") {
    msg.reply("An amazing team 😉");
  }
  if(msg.content.toLowerCase()=="romeo")
  {
    msg.reply("Juliet");
  }
  if(msg.content.toLowerCase()=="antonio")
  {
    msg.reply("Bassanio");
  }
  if(msg.content.toLowerCase()=="binod")
  {
    msg.reply("Binod");
  }
  if (msg.content.toLowerCase() === 'ping') {
    // Send "pong" to the same channel
    msg.channel.send('pong');
  }
  if (msg.content.toLowerCase() === 'marco') {
    msg.channel.send('polo');
  }
  if (msg.content.toLowerCase() === 'baa') {
    msg.channel.send('moo');
  }
  if (msg.content.toLowerCase() === 'moo') {
    replies = ["buy me a chanel shoe", "you do you boo", "my heart is broken, give me some glue"]
    num = Math.floor(Math.random() * (3 - 0) + 0);
    msg.reply(replies[num]);
  }

  if(msg.content.toLowerCase() === 'need help' || msg.content.toLowerCase() === 'please help' || msg.content.toLowerCase() === 'pls help')
  {
    (async () => {
    // code goes here
      const BASE_URL = 'https://type.fit/api';
      try {
        const res = await axios.get(`${BASE_URL}/quotes`);
        const quotes = res.data;
        var len = quotes.length;
        len=Math.floor((Math.random() * len) + 1);
        console.log(quotes[len]["text"]);
        msg.reply(quotes[len]["text"]);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if(msg.content.toLowerCase() === 'need advice' || msg.content.toLowerCase() === 'please advice' || msg.content.toLowerCase() === 'pls advice' || msg.content.toLowerCase() === 'advice')
  {
    (async () => {
    // code goes here
      const BASE_URL = 'https://api.adviceslip.com/advice';
      try {
        const res = await axios.get(`${BASE_URL}`);
        data = res.data;
        msg.reply(data["slip"]["advice"]);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if(msg.content.toLowerCase() === 'gif' || msg.content.toLowerCase() === 'want haha' || msg.content.toLowerCase() === 'tickle me')
  {
    (async () => {
    // code goes here
      const BASE_URL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC';
      try {
        const res = await axios.get(`${BASE_URL}`);
        console.log(res['data']['data']['url']);
        msg.reply(res['data']['data']['url']);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if(msg.content.toLowerCase().split(" ")[1] === 'color')
  {
    (async () => {
    // code goes here
      const BASE_URL = 'https://api.color.pizza/v1';
      const num = msg.content.toLowerCase().split(" ")[3]
      try {
        const res = await axios.get(`${BASE_URL}/${num}`);
        msg.reply(num+": "+res['data']['colors'][0]['name']);
        return
      } catch (e) {
        console.error(e);
      }
    })();
  }

});

// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
