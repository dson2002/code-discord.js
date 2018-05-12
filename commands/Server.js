const Discord = require('discord.js');
module.exports.run = async (bot,msg,args) => {
if(msg.author.id === ""){
msg.channel.send(`${mag.author}Sidsfafasfas`);

}else {
    msg.channel.send(`_**${bot.user.username}vz\n\n${bot.guilds.map(g =>`${g.name}-**${g.memberCount}Memebers`).join(`\n`)}`,{split: true})
}

}
module.exports.help = {
    name: "ServrerList"
}
