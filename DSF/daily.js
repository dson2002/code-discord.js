const Discord = require("discord.js");
ms = require(`parse-ms`)
let iumics = require("../data/money.json");

exports.run = async (bot, message, args) => {
    let cooldown = 8.64e+7
    let amount = Math.floor(Math.random() * 100) + 50;

    //let userIumics = iumics[message.author.id].iumics;
    let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);
    if(lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0){
        let timeObj = ms(cooldown - (Date.now() - lastDaily));
        message.channel.send(`You already earned todays daily, your next daily can be earned in **${timeObj.hours}h ${timeObj.minutes}m**`);
    } else {
        let userIumics = iumics[message.author.id].iumics;
        iumics[message.author.id] = {
            iumics: userIumics + amount
          };
        let moneyEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("FFFFFF")
        .setDescription(`Successfully earned ${amount} iumics 💰`)
        .addField("💰Total iumics", `You have a total of **${userIumics}** iumics`);
        message.channel.send(moneyEmbed);
        db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, 100);
    }
}

module.exports.help = {
    name: "daily"
  }