const discord = require ("discord.js")

module.exports.run = async (bot,msg,args) => {
    let sicon = msg.guild.TconURL
    let donate = new discord.RichEmbed()
    .setTimestamp()
    .setThumbnail(sicon)
    .setAuthor(`Here ya go ${msg.author.username}!`)
    .setColor("#ffd700")
    .setTitle("?")
    .addField("קובצה","https://discord.gg/jM9vHf")
    .addField("קובצה","https://discord.gg/jM9vHf")

msg.delete().catch(O_o=>{})
msg.channel.send(donate);
}
module.exports.help ={
name: "Donare"
}
