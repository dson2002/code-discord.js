const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const { Client } = require('idiotic-api');

exports.run = (bot, message, args) => {
    try {
        var avatarURL, target, { Attachment } = require('discord.js');
        if (!message.mentions.users.first()) {
            avatarURL = message.author.displayAvatarURL.replace('.gif', '.png');
            target = 'themselves';
        } else {
            avatarURL = message.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            target = message.mentions.members.first().displayName;
        }
    
        bot.IdioticAPI.batSlap(message.author.displayAvatarURL.replace('.gif', '.png'), avatarURL).then(img => {
            message.channel.send(`**${message.member.displayName}** slapped **${target}**!`, new Attachment(img, 'slap.png'));
        });
    } catch (ereeror) {
        console.error(ereeror);
        message.channel.send()
    }
}


