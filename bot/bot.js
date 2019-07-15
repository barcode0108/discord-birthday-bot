const config = require('../config');
const discord = require('discord.js');

const client = new discord.Client();
const message = require('./message');


let isInit = false;


module.exports = {
  init: () => {
    if (isInit) return;

    client.on('ready', () => {
      console.log('Bot is ready!')
    });

    client.on('message', message.messageMapping)

    client.login(config.discord_token);

    isInit = true;
  },
  bot: client
}