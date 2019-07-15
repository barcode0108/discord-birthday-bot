const config = require('../config');
const discord = require('discord.js');

const client = new discord.Client();


let isInit = false;


module.exports = {
  init: () => {
    if (isInit) return;
    
    client.on('ready', () => {
      console.log('Bot is ready!')
    });
    
    client.login(config.discord_token);
    
    isInit = true;
  },
  bot: client
}


const message = require('./message');