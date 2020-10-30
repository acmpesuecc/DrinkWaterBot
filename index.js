// Run dotenv
require('dotenv').config();

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

  if (msg.content.toLowerCase() === 'ping') {
    // Send "pong" to the same channel
    msg.channel.send('pong');
  }
  if (msg.content.toLowerCase() === 'marco') {
    msg.channel.send('polo');
  }
  import axios from 'axios';

  const BASE_URL = 'https://type.fit/api';
  
  const getQuotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/quotes`);
      const quotes = res.data;
      var len = quotes.length;
      len=Math.floor((Math.random() * len) + 1);
      console.log(quotes[len]["text"]);
      return quotes[len]["text"];
    } catch (e) {
      console.error(e);
    }
  };
  
  if (msg.content.toLowerCase() === 'need help')
  {
    msg.channel.send(getQuotes())
  }

});

// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
