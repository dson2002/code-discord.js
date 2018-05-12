const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

   if(!args[1]) return message.channel.send("**Enter two inputs for me to choose from.** `ium choose Bread Eggs`");

   let replies = [`${args[0]}`, `${args[1]}`];
   let result = Math.floor((Math.random() * replies.length));

   let chooseEmbed = new Discord.RichEmbed()
   .setColor("#000000")
   .addField("I choose...", replies[result]);
   message.channel.send(chooseEmbed)
}


module.exports.help = {
    name: "choose"
}
