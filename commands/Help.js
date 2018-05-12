const Discord = require("discord.js");

module.exports.run = async (bot,msg,atsg) => {
    let help = new Discord.RichEmbed()
    .setAuthor()
    .setTimestamp()
    .addField(`Divertissement`, "` \n x-8ball \n x-roll`", true)
    .addField("Utilitaire", "` x-avatar \n x-profil \n x-serverinfo \n x-botinfo \n x-id \n x-ping \n x-invite`", true)
    .addField(`Modération`, "` x-ban \n x-kick \n x-clear`", true)
    .addField(`Administration`, "` x-sondage \n x-say`", true)
    .addField(`Music commands`, "` \n play \n skip`\n stop \n volume  \n pause \n resume", true)
    .addField(`New commands`, "` \n .addrole \n .ban`\n .botinfo \n .clear  \n .coins \n .kick \n .level \n .pay \n .serverinfo \n .cat \n .tempmute \n .warn \n .warnlevel \n !debug \n %weather\n .Donare\.nunmute\n.Ticket\n.fortnite\n.botinvite\n.google",true)
    .addField(`New commands 2`, "` \n ~PING \n ~FUCK`\n ~USERSTATS",true)
    .addField(`Kali Linux`, "` \n kali-linux \n פוקודת-פריצה-למחשב`\n פוקודת-פריצה-לטלפון",true)
    .addField(`בוקורב`)
    .setFooter("discord.js#0560")
    .setColor('RANDOM')
msg.author.send(help)   
 

}
module.exports.help = {
    name: "Help"
}