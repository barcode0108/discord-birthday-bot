const config = require('../config');
const discord = require('discord.js');

const reaction = require('./reaction');

const { bot } = require('./bot')



const onLoginBlizzard = (msg, args) => {

  const embed = new discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Login bz')
    .setURL('https://discord-mafia-tw-bot.herokuapp.com/blizzard/oauth')

  msg.channel.send(embed)
}

const onTest = async (msg, args) => {
  await reaction.comfirmLoginToBlizzard(bot, msg.channel.id);
}

const commandMap = [
  {
    command: "blizzard",
    callback: onLoginBlizzard,
  },
  {
    command: "test",
    callback: onTest,
  }
];

const messageMapping = msg => {
  if (!msg.content.startsWith(config.discord_command_prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.discord_command_prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

  for (let c of commandMap) {
    if (cmd === c.command) {
      c.callback(msg, args);
      break;
    }
  }
}

bot.on('message', messageMapping);

module.exports = {
  messageMapping
}