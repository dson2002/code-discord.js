const Discord = require("discord.js");
const config = require("../console/botconfig.json");
const apikey = require("../keys.json");
const Fortnite = require("fortnite");
const client = new Fortnite('81e84f99-070d-4343-ac2a-ff72f7fc380e');
const ft = new Fortnite("81e84f99-070d-4343-ac2a-ff72f7fc380e");
const Client = require('fortnite');
const fortnite = new Client('81e84f99-070d-4343-ac2a-ff72f7fc380e');


module.exports.run = async (bot, message, args) => {

  message.delete();
  let username = args[0];
  let platform = args[1] || "pc";

  let data = ft.user(username, platform).then(data => {

    
    let stats = data.stats.lifetime;
    let kills = stats.find(s => s.stat == 'kills')
    let score = stats.find(s => s.stat == 'Score')
    let matchesPlayed = stats.find(s => s.stat == 'Matches Played')
    let wins = stats.find(s => s.stat == 'Wins')
    let winPercent = stats.find(s => s.stat == 'Win%')
    let KD = stats.find(s => s.stat == 'K/d')
    let Top5s = stats.find(s => s.stat == 'Top 5s')

    let embed = new Discord.RichEmbed()
    .setTitle("Fortnite Stats")
    .setAuthor(data.username)
    .setColor("#f6486")
    .addField('Kills', kills, true)
    .addField('Score', score, true)
    .addField('Matches Played', matchesPlayed, true)
    .addField('Wins', `${wins} (${winPercent})`, true)
    .addField('K/D Ratio', KD, true)
    .addField('Top 5s', Top5s, true)


    message.channel.send(embed);


  }).catch(e => {
    console.log(e);
    message.channel.send("Couldn't find that username in the database :thinking:");
  });


}

module.exports.help = {
  name: "fortnite"
}