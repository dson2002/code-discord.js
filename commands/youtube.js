const cheerio = require('cheerio')
const snekfetch = require('snekfetch');
const querystring = require('querystring');

module.exports.run = async (bot, message, args) => {

    let searchMessage = await  message.reply('Searching... Sec.');
    let searchUrl = `https://www.youtube.com/search?q=${encodeURIComponent(message.content)}`;
    return snekfetch.get(searchUrl)
        .then((result) => {
            let $ = cheerio.load(result.text);
            let googleData = $('.r')
                .first()
                .find('a')
                .first()
                .attr('href');
            googleData = querystring.parse(googleData.replace('/url?', ''));
            searchMessage.edit(`Result found!\n${googleData.q}`);
        })

        .catch((err) => {
            searchMessage.edit('No results found!');
        })
}
module.exports.help = {
  name: "youtube"
}