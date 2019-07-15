const config = require('../config');
const discord = require('discord.js');


const emojiObj = {
  check: '✅',
  cross: '❎',
}


const getLastSentMessage = async channel => {
  const messages = await channel.fetchMessages({ limit: 1 });
  const lastMessage = messages.first();

  if (!lastMessage.author.bot) {}

  return lastMessage;
}

const comfirmLoginToBlizzard = async (client, channel_id) => {
  const channel = client.channels.get(channel_id);

  let content = "Login To Blizzard?";

  channel.send(content);

  const message = await getLastSentMessage(channel);

  message.react(emojiObj.check).then(() => message.react(emojiObj.cross));

  const filter = (reaction, user) => {
    return [emojiObj.check, emojiObj.cross].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  
  message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === emojiObj.check) {
        message.channel.send('V');
      } else {
        message.channel.send('X');
      }
      message.delete();
    })
    .catch(collected => {
      message.channel.send('NULL');
      message.delete();
    });

}


module.exports = {
  comfirmLoginToBlizzard,
}