const Discord = require('discord.js');
const config = require('../console/s.json');
const errors = require('../s/errors.js');

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let embed = new Discord.RichEmbed()

  
  message.channel.send(embed);

  return
};

  module.exports.help = {
    name: 'avatar',
    description: 'This will display your avatar.',
    usage: 'avatar [@user]'
};
