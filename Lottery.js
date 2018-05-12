const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./console/a.json");
const fs = require('fs');
var playerList = [];
var lotteryBool = false;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if(msg.author.bot) return;
  
  if(msg.content.indexOf(config.prefix) !== 0) return;
  
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(msg.channel.name === config.channel){
	if(command === "enter"){
		if(lotteryBool){
			if(playerList.indexOf(msg.author) >= 0){
				msg.reply("you're already in the lottery!");
			} else {
				playerList.push(msg.author);
				console.log(msg.author + " ENTERED the lottery!");
				msg.reply("entered! Good Luck!");
			}
		}
		else{
			msg.reply("sorry there is no lottery running at this moment in time :cry:");
		}
	}
	
	if(command === "lotteryhelp"){
		var line1 = "Here is a list of my commands :D \n";
		var line2 = "```?lotterystart - starts a lottery \n---Can only be used with admin permissions. \n";
		var line3 = "?lotteryend - ends current lottery \n---Can only be used with admin permissions. \n";
		var line4 = "?enter - enters current lottery if one is running\n```"
		var messageToSend = line1 + line2 + line3 + line4;
		msg.author.send(messageToSend);
	}
	if(command === "lotterystart" && msg.member.hasPermission("ADMINISTRATOR")){
		msg.channel.send("@everyone! Lottery has started!");
		console.log(msg.author + " STARTED the lottery!");
		lotteryBool = true;
	}
	if(command === "lotteryend" && msg.member.hasPermission("ADMINISTRATOR")){
		lotteryBool = false;
		if(playerList.length >= 1){
			var winner = playerList[Math.floor(Math.random()*playerList.length)];
			winner.send(":confetti_ball: YOU WON!!! :confetti_ball:");
			msg.channel.send(":confetti_ball: "+ winner + " WON THE LOTTERY! CONGRATS :confetti_ball:");
		}
		else {
			msg.reply("Nobody entered the lottery :cry:");
		}
		console.log(msg.author + " ENDED the lottery!");
		playerList = [];
	}
	if(cmd === `${prefix}report`){

    //!report @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/report (@user) (reason)\n** **\n**Example:**\n** **\n/report <@!440182142207655947> break the rules\n** **\nits will report the user for brekaing the rules");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffdc00")
    .addField("Reported", `${rUser}`)
    .addField("Moderator", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "mod-log");
    if(!reportschannel) return message.channel.send("Couldn't find mod-log channel.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
  }
});

client.login("NDMzMjQzNDYwODIxMDU3NTM2.DdIIVw.d4ED_ipaXt33oXdN9A50GQ8RatE");