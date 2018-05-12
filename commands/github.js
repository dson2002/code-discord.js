const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    let githubEmbed = new Discord.RichEmbed()
    .setColor('#ffffff ')
    .addField("shon github", "https://github.com/dson2002/code-discord.js")

    return message.channel.send(githubEmbed);
}

module.exports.help = {
    name: "github"
  }
