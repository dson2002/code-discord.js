const botconfig = require("./console/f.json");
const tokenfile = require("./console/token.json");
const Discord = require("discord.js");


const fs = require("fs");
const bot = new Discord.Client();


const swearWords = ["darn", "shucks", "frak", "shite", "arse", "ass", "asshole", "bastard", "bitch", "bollocks", "child-fucker", "Christ on a bike", "Christ on a cracker", "crap", "cunt", "damn", "frigger", "fuck", "goddamn", "godsdamn", "hell", "holy shit", "Jesus", "Jesus Christ", "Jesus H. Christ", "Jesus Harold Christ", "Jesus wept", "Jesus", "Mary and Joseph", "Judas Priest", "motherfucker", "nigga", "nigger", "shit", "shit ass", "shitass", "son of a bitch", "son of a motherless goat", "son of a whore", "sweet Jesus", "twat", "Can i suck your boobs", "Carpet muncher", "Choking your chicken", "Cock eyed Cunt.", "Cock muncher", "Cocklump", "Colder than a witches titty in a brass bra", "Creampie", "Cretinous cunting fuckhead", "Cum", "Cum Dumpster", "Cum on your face", "Cuntface", "can i fuck you from behind", "chimney sweeper", "chutney ferret", "cockeye", "coral stomper", "crotte", "cum dumpster", "cuntlapper", "cus", "Ai sat (directed at a man)", "Ain't", "Arrogant, Gum-chewing fat cunt", "As much use as a chocolate teapot", "a-hole", "arse bandit", "arvind kejriwal", "ask me bollix","זין","זונה","קוקסינל ","חרא קטין"];
var anti_spam = require("discord-anti-spam");
 const warningMessage = ["d"]


//bot.on("ready", async () => {
  //console.log(`${bot.user.username} is online!`);

  //bot.user.setActivity("bots", {type: "MAKING"});

  //bot.user.setGame("${server} Servers | /help");

bot.on("ready", async () => {
  console.log(`Bot is Online!`);
bot.user.setActivity(`${bot.guilds.size} servers `, {type: "WATCHING"});
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`${bot.guilds.size} servers `, {type: "WATCHING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(
        `${bot.guilds.size} servers `, {type: "WATCHING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

//welcome left
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`${member}, left the Server`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @user break the rules
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("/kick (@user) (time) (reason)\n** **\n**Example:**\n** **\n/kick <@!440182142207655947> break the rules\n** **\nits will kick the user for brekaing the rules");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#d83c3c")
    .addField("Kicked", `${kUser}`)
    .addField("Moderator", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
    if(!kickChannel) return message.channel.send("Can't find mod-log channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

if( swearWords.some(word => message.content.includes(word)) ) {
     message.delete();
  message.reply("Oh no you said a bad word!!!");
  //Or just do message.delete();
}

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("/ban (@user) (time) (reason)\n** **\n**Example:**\n** **\n/ban <@!440182142207655947> break the rules\n** **\nits will ban the user for one hour for brekaing the rules");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("**Banned**", `${bUser}`)
    .addField("**Moderator**", `<@${message.author.id}>`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "mod-log");
    if(!incidentchannel) return message.channel.send("Can't find mod-log channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    return;
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

  if(cmd === `${prefix}warn`){

    //!warn @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/warn (@user) (reason)\n** **\n**Example:**\n** **\n/warn <@!440182142207655947> break the rules\n** **\nits will warning the user for brekaing the rules");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#1b8fbd")
    .addField("Warned", `${rUser}`)
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

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if (cmd === `${prefix}unmute`) { // creates the command unmute
      if (!message.member.roles.some(r=>["Moderator"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
      var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
      if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
      unmutedmember.removeRole(mutedrole) //if reason, kick
          .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
      message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
  }

  if(cmd === `${prefix}membercount`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("**Member Count**")
    .setColor("#eb8f1b")
    .setThumbnail(sicon)
    .addField("Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  if (cmd === `${prefix}vote`){
 		message.delete()
  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('Invalid Format: /vote <Question>')

  const embed = new Discord.RichEmbed()
  .setTitle("A Vote Has Been Started!")
  .setColor("#5599ff")
    .setDescription(`${question}`)
    .setFooter(`Vote Started By: ${message.author.username}`, `${message.author.avatarURL}`)
  const pollTopic = await message.channel.send({embed});
  await pollTopic.react(`ג…`);
  await pollTopic.react(`ג`);
  const filter = (reaction) => reaction.emoji.name === 'ג…';
  const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
  collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
  collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}

  if (cmd === `${prefix}say`){
 		message.delete()
 		message.channel.send(args.join(" "));
}

  if (cmd === `${prefix}whitesay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.white)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}grayesay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.gray)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}blacksay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.black)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}redsay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.red)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}yellowsay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.yellow)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}lightgreensay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.light_green)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}darkgreensay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.dark_green)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}lightbluesay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.light_blue)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}bluesay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.blue)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}pinksay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.pink)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}purplesay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(color.purple)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}

  if (cmd === `${prefix}staff`){
    let botembed = new Discord.RichEmbed()
    .setDescription("Staff Members")
    .setColor("#ff9f04")
    .addField("\nCreators","<@311604263379795970>\n<@362310398864654337>")
    .addField("\nMini Creators","<@241793558737190913>")
 		 .addField("\nDevelopers","<@184706878876549131>\n<@333300250465009666>\n<@429011797291433987>")
 		 .addField("Administrators",":rolling_eyes: No one Found :mag:")
 		 .addField("Moderators",":rolling_eyes: No one Found :mag:")
 		 .addField("Helpers",":rolling_eyes: No one Found :mag:");

    return message.channel.send(botembed);
}

  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Help Commands")
    .setColor("#268ccf")
    .setThumbnail(bicon)
    .addField("Moderation","/kick (user) (reason) - Kick a User.\n/ban (user) (reason) - Ban a User.\n/unban (user) - unban a User. (Soon)\n/report (user) (reason) - report about User.\n/mute (user) (reason) - Mute a User.\n/unmute (user) (reason) - unMute a User. (Soon)\n/warn (user) (reason) - Warn a User. (Soon)\n/purge (number) - Clear the chat. (Soon)")
    .addField("Servers","/serverinfo - Server Informations.\n/botinfo - Bot Informations.\n/membercount - Member Count.\n/say (message) - say your message.\n/vote (question) - Vote about Question\n/avatar @user - Avatar of the user.\n/ping - Ping Pong")
    .addField("Economy","Soon")
    .addField("NSFW","Soon")
    .addField("Music","Soon")
    .addField("Leveling","Soon");

    return message.author.send(botembed);
  }

  if(cmd === `${prefix}mute`){

   if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);
  if (user.hasPermission('MANAGE_MESSAGES')) return errors.cannotPunish(message);

  let reason = args.slice(1).join(" ");
  if (!reason) return errors.invalidReason(message);

  let muterole = message.guild.roles.find('name', 'Muted');
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: 'Muted',
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  };

  let time = args[1];
  if (!time) return errors.invalidTime(message);

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Temporarily Muted')
  .setColor("#FF0000")
  .addField('Muted User', `${user}`, true)
  .addField('Muted By', `${message.author}`, true)
  .addField('Muted For', time)
  .addField('Time', message.createdAt)
  .addField('Reason', reason);

  let auditlogchannel = message.guild.channels.find('name', 'mod-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed)

  await(user.addRole(muterole.id));

  setTimeout(function(){
    user.removeRole(muterole.id);
    let embed = new Discord.RichEmbed()
    .setTitle('User has been Unmuted')
    .setColor(config.yellow)
    .addField('Muted User', `${user}`)
    auditlogchannel.send(embed);
  }, ms(time));
  };
});

const prefix = botconfig.prefix;
bot.on("message", (message) => {

  if(!message.content.startsWith(prefix)) return;

if(message.content.startsWith(prefix + "avatar ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = user.tag /*Nickname and Discriminator*/ +
           "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
    }
  }});

bot.on('message', msg => {
  if (msg.content === '/ping') {
    msg.reply(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms!  :ping_pong:`)
  }
});

bot.on('message', msg => {
  if (msg.content === '/help') {
    msg.reply(`Check your dms`)
  }
});

bot.on('message', msg => {
  if (msg.content === '/avatar') {
    msg.reply(`You need Mention someone`)
  }
});

bot.on('message', message => {
    if(message.author.bot) return;
    var re =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.exec(message.cleanContent);
    if(re != null){
        message.delete().then(message => {
            message.reply('Links is not allowed here!');

            if (cmd === `${prefix}moveall`){
              let isAdmin = message.member.roles.filterArray(role => {return role.name === 'Owner' || role.name === 'Move-all-er';}).length;
              if (isAdmin === 0){
                return;
              }
              if (message.content.indexOf(".moveall") > -1) {
                channelGetName = message.content.slice(9, 9999);
                findChannel = bot.channels.find('name', channelGetName);
                if (message.content.indexOf("-mute") > -1) {
                  MoveMuteUsers(findChannel);
                } else{
                  MoveUsers(findChannel);
                }
              }
             }
             
             
             function MoveUsers(findChannel){
              bot.channels.findAll('type', 'voice').forEach(channelInfo => {
                if (channelInfo.name.indexOf("AFK") > -1 ){
                  console.log("afk");
                } else {
                  channelInfo.members.array().forEach(memberNumber => {
                    memberNumber.setVoiceChannel(findChannel);
                    console.log('moving');
                    });
                }
             });
             }
             
             function MoveMuteUsers(findChannel){
              bot.channels.findAll('type', 'voice').forEach(channelInfo => {
                if (channelInfo.name.indexOf("AFK") > -1 ){
                  console.log("afk");
                } else {
                  channelInfo.members.array().forEach(memberNumber => {
                    memberNumber.setVoiceChannel(findChannel);
                    memberNumber.setMute(true, 'moveall');
                    console.log('moving');
                    });
                }
               })
             }})
    }
    
});
bot.login("NDMzMjQzNDYwODIxMDU3NTM2.DdIIVw.d4ED_ipaXt33oXdN9A50GQ8RatE");
