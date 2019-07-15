const config = require('../config');
const discord = require('discord.js');


const emojiObj = {
  check: '✅',
  cross: '❎',
}


const comfirmLoginToBlizzard = (message) => {
  message.react(emojiObj.check).then(() => message.react(emojiObj.cross));

  const filter = (reaction, user) => {
    return [emojiObj.check, emojiObj.cross].includes(reaction.emoji.name) && user.id === message.author.id;
  };

  message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === emojiObj.check) {
        message.reply('V');
      } else {
        message.reply('X');
      }
    })
    .catch(collected => {
      message.reply('NULL');
    });

}

module.exports = {
  comfirmLoginToBlizzard,
}