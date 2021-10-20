# Contributing to DrinkWaterBot
Contributing to DrinkWaterBot is super easy and we're so glad to have you here!

Here are a few simple steps you'll need to take to get started.

## Installation
1. Make sure you have nodejs >=16.6.0 installed. Lower versions of node will not work. You can see your node version with the command `node -v`
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


## Contributing
You can contribute to DrinkWaterBot in many ways.
1. Open issue to report any bugs or unexpected behaviour.
2. Open an issue to request new features or enhancements.
3. Open a Pull Request to contribute in the form of
   - Bug Fixes
   - Enhancements
   - Documentation Updates
4. When opening a PR, make sure to be as descriptive of your changes as possible. Include an example if a command is added/changed.


### First Time Contributors
[Here](https://homes.cs.washington.edu/~mernst/advice/github-pull-request.html) is a great resource to get started with contributing to GitHub repsitories.

## Final Notes
We're so happy to have you here! Feel free to contribute in any way you can, and don't worry about tiny bugs (especially if you aren't able to test locally). The maintainers will guide you on how to solve it.
