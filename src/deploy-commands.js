require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.DWB_DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

var arg = process.argv.slice(2)[0];
var scope = -1;

if (arg === '--test' || arg === '--guild' || arg === '-t') {
    scope = 0;
}
else if (arg === '--global' || arg === '-g') {
    scope = 1;
}
else {
    console.error(`error: unknown option \'${arg}\'`)
    console.error(`usage: node src/deploy-commands.js [<option>]\n`)
    console.error("\t-t, --test \t guild level testing")
    console.error("\t-g, --global \t global deployment")
    return;
}

const commands = [];

const commandFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./slashCommands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        if (scope == 0) {
            console.log('Started refreshing guild application (/) commands.');
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
            console.log('Successfully reloaded guild application (/) commands.');
        }
        else if (scope == 1) {
            console.log('Started refreshing global application (/) commands.');
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
            console.log('Successfully reloaded global application (/) commands.');
        }
    } catch (error) {
        console.error(error);
    }
})();
