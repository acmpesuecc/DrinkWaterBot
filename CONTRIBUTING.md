# Contributing to DrinkWaterBot
Contributing to DrinkWaterBot is super easy and we're so glad to have you here!

Here are a few simple steps you'll need to take to get started.

## Installation
1. Make sure you have nodejs >=14 installed. Lower versions of node _should_ work but aren't tested with this bot. You can see your node version with the command `node -v`
2. Fork the repository and clone it. Then install the dependencies using `npm i`
3. Create a file called `.env` in the repository root. 
4. In order to test the bot, you will need a Discord bot token. You can google up on how to create a new bot in the discord developers portal. Once created, add the bot's key to the .env file in the format
   ```
    DWB_DISCORD_TOKEN=<YOUR_TOKEN_HERE>
   ```
   If you do not wish to test your changes on the bot locally, you can skip this step.
5. In order to start the bot use the command `npm start`
6. [OPTIONAL] If you have nodemon installed, you can use that with `npm run dev`

### IMPORTANT
When running the bot locally, you **WILL** see multiple error messages in the console. This is expected behaviour. They are arising due to the lack of a firebase configuration file. Firebase is used to handle the database for the bot in production. These errors have no effect on the core functionality of the bot and can be ignored. Sending and replying to messages can continue to be tested normally. 
