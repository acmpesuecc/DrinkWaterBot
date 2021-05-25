require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
let message = require('./message');


// Get GIPHY API key from env
// const giphy_key = process.env.GIPHY_KEY;

// Create discord client
const client = new Discord.Client();


// LISTENERS

// Event listener when a user connected to the server.
client.on('ready', () => {
  // Set the client user's activity
  client.user.setActivity(`Water in ${client.guilds.cache.size} servers 💦`, { type: 'LISTENING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener when a user sends a message in the chat.
client.on('message', msg => {

  // If the bot is the one messaging, the disregard the message.
  if (msg.author.id == '739820357300781056') {
    return
  }

  // Handle messages
  message.handle(msg);
});


// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
