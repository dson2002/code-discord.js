// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js'); // Make sure you call the packages you install.
const fs = require('fs'); // But we also need to require the fs package.

// We can call the JSON file here
const commands = JSON.parse(fs.readFileSync('commands.json', 'utf8'));

// Global Settings
const prefix = '/'; // This is the prefix, you can change it to whatever you want.

// Functions
function hook(channel, title, message, color, avatar) { // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return console.log('Channel not specified.');
    if (!title) return console.log('Title not specified.');
    if (!message) return console.log('Message not specified.');
    if (!color) color = 'd9a744'; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png' // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    // This is the start of creating the webhook
    channel.fetchWebhooks() // This gets the webhooks in the channel
        .then(webhook => {

            // Fetches the webhook we will use for each hook
            let foundHook = webhook.find('name', 'Webhook'); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

            // This runs if the webhook is not found.
            if (!foundHook) {
                channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                    .then(webhook => {
                        // Finally send the webhook
                        webhook.send('', {
                            "username": title,
                            "avatarURL": avatar,
                            "embeds": [{
                                "color": parseInt(`0x${color}`),
                                "description":message
                            }]
                        })
                            .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                                console.log(error);
                                return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                            })
                    })
            } else { // That webhook was only for if it couldn't find the original webhook
                foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
                    "username": title,
                    "avatarURL": avatar,
                    "embeds": [{
                        "color": parseInt(`0x${color}`),
                        "description":message
                    }]
                })
                    .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                        console.log(error);
                        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                    })
                }

        })

}

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Ping!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }

    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Lets delete the command message, so it doesnt interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`bot-commander\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }

    // Weather Command - We're going to need a new package for this, so open up the console again.
    // Lets make a basic version of this, then make it look good.

    if (msg.startsWith(prefix + 'WEATHER')) { // This checks to see if the beginning of the message is calling the weather command.
        // You can find some of the code used here on the weather-js npm page in the description.

        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
            if (err) message.channel.send(err);

            // We also want them to know if a place they enter is invalid.
            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
                return; // This exits the code so the rest doesn't run.
            }

            // Variables
            var current = result[0].current; // This is a variable for the current part of the JSON output
            var location = result[0].location; // This is a variable for the location part of the JSON output

            // Let's use an embed for this.
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
                .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
                .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
                .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
                .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
                .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                // Now, let's display it when called
                message.channel.send({embed});
        });
    }

    // This episode will be going over the hook command.
    if (msg.startsWith(prefix + 'HOOK')) { // We are using a .startsWith because the command will have arguments.

        // Delete the message that the user sends
        message.delete();

        if (msg === prefix + 'HOOK') { // This checks if the only thing they sent was 'Hook'
            return hook(message.channel, 'Hook Usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'FC8469','https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png') // Remeber that \n means new line. This is also using a custom HEX id, and an image.
        }

        let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by 'commas'

        hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); // This is where it actually calls the hook.
    }

    // This episode will be going over the help command. We will also add a category system for the commands, for example: ~help mod (shows moderator commands), ~help admin (shows admin commands), as well as ~help <command> shows more info on the command
    if (msg.startsWith(prefix + 'HELP')) { // We're also going to use a seperate JSON file, so we need to call it.

        // Let's see if the only thing they typed in chat was ~help
        if (msg === `${prefix}HELP`) { // If they only type this, lets ONLY show the commands for regular users

            // Start of the embed
            const embed = new Discord.RichEmbed()
                .setColor(0x1D82B6) // You can set this color to whatever you want.

            // Variables
            let commandsFound = 0; // We also want to tell them how many commands there are for that specific group.

            // Lets create the for loop that loops through the commands
            for (var cmd in commands) { // We should start creating the commands json first.

                // Checks if the group is "users" - and replace type with group
                if (commands[cmd].group.toUpperCase() === 'USER') {
                    // Lets also count commandsFound + 1 every time it finds a command in the group
                    commandsFound++
                    // Lets add the command field to the embed
                    embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`); // This will output something like <commandname>[title] [newline] desc: <description> [newline] usage: <usage
                }

            }

            // Add some more to the embed - we need to move that out of the for loop.
            embed.setFooter(`Currently showing user commands. To view another group do ${prefix}help [group / command]`)
            embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

            // We can output it two ways. 1 - Send to DMs, and tell them that they sent to DMs in chat. 2 - Post commands in chat. [since commands take up a lot let's send to DMs]
            message.author.send({embed})
            // Post in chat they sent to DMs
            message.channel.send({embed: {
                color: 0x1D82B6,
                description: `**Check your DMs ${message.author}!**`
            }})

            // Let's test this! - We have a few bugs first though.
            // Turns out you can only use the word embed to define embeds.

        } else if (args.join(" ").toUpperCase() === 'GROUPS') {

            // Variables
            let groups = '';

            for (var cmd in commands) {
                if (!groups.includes(commands[cmd].group)) {
                    groups += `${commands[cmd].group}\n`
                }
            }

            message.channel.send({embed: {
                description:`**${groups}**`,
                title:"Groups",
                color: 0x1D82B6
            }})

            return; // Testing!


        } else {
            // Now, lets do something when they do ~help [cmd / group] - You can use copy and paste for a lot of this part.

            // Variables
            let groupFound = '';

            for (var cmd in commands) { // This will see if their is a group named after what the user entered.

                if (args.join(" ").trim().toUpperCase() === commands[cmd].group.toUpperCase()) {
                    groupFound = commands[cmd].group.toUpperCase(); // Lets set the ground found, then break out of the loop.
                    break;
                }

            }

            if (groupFound != '') { // If a group is found, run this statement.

                // Start of the embed
                const embed = new Discord.RichEmbed()
                    .setColor(0x1D82B6) // You can set this color to whatever you want.

                // Variables
                let commandsFound = 0; // We also want to tell them how many commands there are for that specific group.


                for (var cmd in commands) { // We can use copy and paste again

                    // Checks if the group is "users" - and replace type with group
                    if (commands[cmd].group.toUpperCase() === groupFound) {
                        // Lets also count commandsFound + 1 every time it finds a command in the group
                        commandsFound++
                        // Lets add the command field to the embed
                        embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`); // This will output something like <commandname>[title] [newline] desc: <description> [newline] usage: <usage
                    }

                }

                // Add some more to the embed - we need to move that out of the for loop.
                embed.setFooter(`Currently showing ${groupFound} commands. To view another group do ${prefix}help   `)
                embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

                // We can output it two ways. 1 - Send to DMs, and tell them that they sent to DMs in chat. 2 - Post commands in chat. [since commands take up a lot let's send to DMs]
                message.author.send({embed})
                // Post in chat they sent to DMs
                message.channel.send({embed: {
                    color: 0x1D82B6,
                    description: `**Check your DMs ${message.author}!**`
                }})

                // Make sure you copy and paste into the right place, lets test it now!
                return; // We want to make sure we return so it doesnt run the rest of the script after it finds a group! Lets test it!

                // Now lets show groups.
            }

            // Although, if a group is not found, lets see if it is a command

            // Variables
            let commandFound = '';
            let commandDesc = '';
            let commandUsage = '';
            let commandGroup = '';

            for (var cmd in commands) { // Copy and paste

                if (args.join(" ").trim().toUpperCase() === commands[cmd].name.toUpperCase()) {
                    commandFound = commands[cmd].name; // Lets change this so it doesnt make it go uppcase
                    commandDesc = commands[cmd].desc;
                    commandUsage = commands[cmd].usage;
                    commandGroup = commands[cmd].group;
                    break;
                }

            }

            // Lets post in chat if nothing is found!
            if (commandFound === '') {
                message.channel.send({embed: {
                    description:`**No group or command found titled \`${args.join(" ")}\`**`,
                    color: 0x1D82B6,
                }})

            }

            // Since this one is smaller, lets send the embed differently.
            message.channel.send({embed: {
                title:'<> means required, [] means optional',
                color: 0x1D82B6,
                fields: [{
                    name:commandFound,
                    value:`**Description:** ${commandDesc}\n**Usage:** ${commandUsage}\n**Group:** ${commandGroup}`
                }]
            }})

            return; // We want to return here so that it doesnt run the rest of the script also.

        }

    }

});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login('NDMzMjQzNDYwODIxMDU3NTM2.DdIIVw.d4ED_ipaXt33oXdN9A50GQ8RatE');