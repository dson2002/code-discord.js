// This command requires the package `strict-uri-encode`, to properly parse links.
const encode = require('strict-uri-encode');

exports.run = (client, message, args, tools) => {

 // First, we need to get the arguments. Although, if you use the command handler it will be stored in `args`, so we can just combine it.
 let question = encode(args.join(' ')); // We are combining by space, since we split by spaces before. Then, we are encoding it so we can turn it into a url.

 // Now, we can form the link.
 let link = `https://www.youtube.com/results?search_query=${question}`; // Now, this holds the link since it just adds the encoded string to the end.

 // Output to chat
 message.channel.send(`**<${link}>**`); // Enclosing in ** makes it bold, enclosing in <> hides the embed that comes from the link.

} // Let's test it!

module.exports.help = {
    name: "search"
  }
  
  
