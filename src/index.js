require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
let message = require('./message');


// Get GIPHY API key from env
// const giphy_key = process.env.GIPHY_KEY;

// Create discord client
const client = new Client({
  intents:
    ["GUILDS",
      "GUILD_MESSAGES"
    ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./slashCommands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// LISTENERS

// Event listener when a user connected to the server.
client.on('ready', () => {
  // Set the client user's activity
  client.user.setActivity(`Water in ${client.guilds.cache.size} servers 💦`, { type: 'LISTENING' })
  // .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  // .catch(console.error);
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener when a user sends a message in the chat.
client.on('messageCreate', msg => {

  // If the bot is the one messaging, the disregard the message.
  if (msg.author.id == '739820357300781056') {
    return
  }

  // Handle messages
  message.handle(msg);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});


// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
