const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    if (!args[0]) return message.channel.send("**Mention a user to tickle.** `ium tickle <user>`");

neko.getSFWTickle().then(tickle => {
        let tickleEmbed = new Discord.RichEmbed()
            .setDescription(`**${message.author.username}** tickles **${member.user.username}**...`)
            .setImage(tickle.url)
            .setFooter('Powered by nekos.life')
            .setColor(message.guild.me.displayColor)
            .setTimestamp();
        message.channel.send(tickleEmbed);
  })
}