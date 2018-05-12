const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
    let duration = args[0];

    let sicon = message.guild.iconURL;

    let fun = "👯";
    let currency = "💱";
    let gambling = "🎰";
    let moderation = "⚡";
    let information = "💤";

    let voteEmbed = new Discord.RichEmbed()
        .setTitle("Commands | 📇")
        .setColor("#9F2C2B")
        .setThumbnail(sicon)
        .addField("Fun stuff", "Vote 👯 voor info")
        .addField("Currency", "Vote 💱 voor info")
        .addField("Gambling", "Vote 🎰 voor info")
        .addField("Moderation", "Vote ⚡ voor info")
        .addField("Information", "Vote 💤 voor info")
        .setFooter("Als je informatie wilt over een van deze onderdelen, voeg een reactie toe.");

    let funEmbed = new Discord.RichEmbed()
        .setTitle("Fun stuff 👯")
        .setColor("#9F2C2B")
        .addField("Commands:", "\`?avatar (gebruiker in de server)\` \`?weer (plek)\`");

    let currencyEmbed = new Discord.RichEmbed()
        .setTitle("Currency 💱")
        .setColor("#9F2C2B")
        .addField("Commands:", "\`?coins\` \`?pay (gebruiker in de server) (aantal OptiCoins die je wilt betalen)\`");

    let gamblingEmbed = new Discord.RichEmbed()
        .setTitle("Gambling 🎰")
        .setColor("#9F2C2B")
        .addField("Commands:", "\`?jackpot (aantal OptiCoins die je wilt inzetten)\`");

    let moderationEmbed = new Discord.RichEmbed()
        .setTitle("Moderation ⚡")
        .setColor("#9F2C2B")
        .addField("Commands:", "`?help\` \`?report (user in server) (reason)\` \`?warnlevel\`");

    let informationEmbed = new Discord.RichEmbed()
        .setTitle("nformation 💤")
        .setColor("#9F2C2B")
        .addField("Commands:", "\`?stats\`");

    let msg = await message.channel.send(voteEmbed);
    await msg.react(fun);
    await msg.react(currency);
    await msg.react(gambling);
    await msg.react(moderation);
    await msg.react(information);

    const collector = await msg.createReactionCollector(
        (reaction, user) => user.id == message.author.id, {
            time: 999999999
        }
    );

    collector.on("collect", r => {
        if (r.emoji.name === "👯") {
            message.member.send(funEmbed);
        }
        if (r.emoji.name === "💱") {
            message.member.send(currencyEmbed);
        }
        if (r.emoji.name === "🎰") {
            message.member.send(gamblingEmbed);
        }
        if (r.emoji.name === "⚡") {
            message.member.send(moderationEmbed);
        }
        if (r.emoji.name === "💤") {
            message.member.send(informationEmbed);
        }
    })
}

module.exports.help = {
    name: "vfh"
}