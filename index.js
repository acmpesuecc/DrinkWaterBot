require('dotenv').config();
const axios = require('axios');
const { Client, Intents } = require('discord.js');

let message = require('./message');

const myIntents = new Intents();
myIntents.add('DIRECT_MESSAGES', 'GUILD_MESSAGES');
// Get GIPHY API key from env
// const giphy_key = process.env.GIPHY_KEY;

// Create discord client
const client = new Client({ intents: Intents.NON_PRIVILEGED })
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_INTEGRATIONS] });


// Slash Commands
const scoreCommand = {
  name: 'score',
  description: "Display's your water score!",
};

// LISTENERS

// Event listener when a user connected to the server.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.application.commands.create(scoreCommand);
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

client.on('interaction', interaction => {
  // If the interaction isn't a slash command, return
  if (!interaction.isCommand()) return;

  // Check if it is the correct command
  if (interaction.commandName === 'score') {

    interaction.reply("Demo reply");
  }
});



// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
