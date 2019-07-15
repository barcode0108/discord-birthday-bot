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

    console.log(process.env.DISCORD_TOKEN)
    console.log("NjAwMTY3NzEyNTg0MzY4MTYw.XSv0Aw.mokiySSwqY4yXvp6jv493amLxdU")


    if (process.env.DISCORD_TOKEN === "NjAwMTY3NzEyNTg0MzY4MTYw.XSv0Aw.mokiySSwqY4yXvp6jv493amLxdU")
      console.log("EQUAL");
    client.login("NjAwMTY3NzEyNTg0MzY4MTYw.XSv0Aw.mokiySSwqY4yXvp6jv493amLxdU")

    global.gClient = client;


    isInit = true;
  }
}