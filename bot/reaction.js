const config = require('../config');
const discord = require('discord.js');


const emojiObj = {
  check: '✅',
  cross: '❎',
}


const getLastSentMessage = async channel => {
  const messages = await channel.fetchMessages({ limit: 1 });
  const lastMessage = messages.first();

  if (!lastMessage.author.bot) { }

  return lastMessage;
}

const comfirmLoginToBlizzard = (msg, user) => {

  const url = 'https://discord-mafia-tw-bot.herokuapp.com/blizzard/oauth' +
    '?user_id=' + user.id +
    '&channel_id=' + msg.channel.id;

  const embed = new discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Login bz')
    .setURL(url);

  msg.channel.send(embed).then(m => {
    m.delete(60000);
  })
}


const askLoginToBlizzard = async (client, channel_id) => {
  const channel = client.channels.get(channel_id);

  let content = "Login To Blizzard?";

  const message = await channel.send(content);

  const filter = (reaction, user) => {
    return [emojiObj.check, emojiObj.cross].includes(reaction.emoji.name) && user.id !== message.author.id;
  };

  try {
    await message.react(emojiObj.check)
    await message.react(emojiObj.cross)
  } catch (e) {
    console.error(e);
  }

  try {
    const collected = await message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] });
    const reaction = collected.first();

    if (reaction.emoji.name === emojiObj.check) {
      comfirmLoginToBlizzard(message, reaction.users.find(u => !u.bot));
    } else if (reaction.emoji.name === emojiObj.cross) {
      message.channel.send(emojiObj.cross);
    } else {
      message.channel.send(reaction.emoji.name);
    }

  } catch (collected) {
    message.channel.send('NULL');
  } finally {
    message.delete();
  }
}


module.exports = {
  askLoginToBlizzard,
}