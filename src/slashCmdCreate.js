const Discord = require("discord.js")

function CommandTemplates(cmdName) {
    const basicWater = {
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
    
                  }]
              }
          ]
      }


      if (cmdName === "water") {
          return basicWater;
      }
}
module.exports = async (cmdName, client) => {
    let data = CommandTemplates(cmdName)

    //Creates global slash commands, could take upto an hour to successfully register
    const command = await client.application?.commands.create(data);

    //Creates guild specific slash commands, instantaneous creation allows for quick testing
        //const command = await client.guilds.cache.get(<guildID>)?.commands.create(data);
        
    /*Replace <guildID> with the ID of the guild. To obtain guild ID, go to user settings > advanced
    and turn on developer mode, then right click on a server from the server list and copy its guild ID*/
    console.log(command);
}