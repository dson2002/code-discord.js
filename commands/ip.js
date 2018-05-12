const Discord = require("discord.js");
module.exports.run = async (bot,msg,args) => {
    let ipEmbed = new Discord.RichEmbed()
    .setColor("#d83c3c")
    .setFooter(`תמונה`, msg.author.displayAvatarURL)    
    .addField("Paradox Dark RP server", "123.123.123:1233");
    msg.channel.send(ipEmbed)

}
module.exports.help = {
    name: "ip"
}