const Discord = require("discord.js");
const bot = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const config = require("../botconfig.json");
const os = require('os');
const osu = require('os-utils');
const cpuStat = require("cpu-stat")
let version = config.version;

exports.run = (bot, message, args) => {

    let users = 0;
    bot.guilds.map(g => users += g.memberCount);
    try {
        
      let botEmbed = new Discord.RichEmbed()
  
      .setDescription("ium", )
      .setColor('#000000')
      .addField('Users', + users + ' users', true)
      .setTimestamp();
  
      message.channel.send(botEmbed);
    } catch (err) {
      console.error(err);
      return message.channel.send(`An error occured: ${err}`);
    }
}

module.exports.help = {
  name: "stats"
}
