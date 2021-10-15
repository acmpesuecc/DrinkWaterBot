require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
let message = require('./message');
let interaction = require("./interaction")

// Get GIPHY API key from env
// const giphy_key = process.env.GIPHY_KEY;

// Create discord client
const client = new Discord.Client({intents:
  ["GUILDS",
  "GUILD_MESSAGES"
  ]});


// LISTENERS

// Event listener when a user connected to the server.
client.on('ready', async () => {
  // Set the client user's activity
  client.user.setActivity(`Water in ${client.guilds.cache.size} servers 💦`, { type: 'LISTENING' })
    // .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    // .catch(console.error);
  console.log(`Logged in as ${client.user.tag}!`);

  async function slashComCreate(){
  
    const data={
      name: "water",
      description: "Water commands",
      options: [{
              name: "cmdname",
              description: "The type of command requested",
               required: false,
              type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
              options: [{ 
                name:"cmd",
                description: "The name of the command",
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                choices: [

                        { name: "version", value: "version"},
                        { name: "feature request", value: "featreq"},
                        { name: "score", value: "score"},
                        { name: "contrib", value: "contrib"},
                        { name: "aggressive", value: "aggressive"},
                        { name: "space people", value: "spcppl"},
                        { name: "iss", value: "iss"},
                        { name: "apod", value: "apod"},
                        {name: "spacex", value: "spacex"},
                        {name: "dice", value: "dice"},

                      ]
                    },
                  ]
                },
                { name: "help", 
                description: "Provides command info",
                required: false,
                type: 1,
                options: [{
                  name: "helpcmd",
                  description: "The command category required",
                  type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                  choices: [
                    { name: "wholesome", value:"wholesome"},
                    { name: "joke", value:"joke"},
                    { name: "science", value:"science"},
                    { name: "gif", value:"gif"},
                    { name: "advice", value:"advice"},
                    { name: "game", value:"game"},
                  ]
                }
                ]
                
              }, 
              { name: "gif", 
                description: "Display gifs",
                required: false,
                type: 1,
                options: [{
                  name: "gifcmd",
                  description: "The gif query",
                  type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
  
                }
                ]
                
              }
            ]
    }
  const command = await client.guilds.cache.get('888657529553444865')?.commands.create(data);
		// console.log(command);
  }

  slashComCreate();
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

client.on("interactionCreate", intr => {
  if(!intr.isCommand())
        return
  
  interaction.handle(intr)
})


// Initialize bot by connecting to the server
client.login(process.env.DWB_DISCORD_TOKEN);
