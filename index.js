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

  if (msg.content.toLowerCase() === "im bored" || msg.content.toLowerCase() === "i'm bored" || msg.content.toLowerCase() === "i am bored") {
    msg.reply("Drink some water and go to bed!🥤😴");
  }

});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);
