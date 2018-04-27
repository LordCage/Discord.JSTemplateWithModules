module.exports = client => {

/*
Discord Bots API
Only use this if you want to transmit the guild size etc. to DiscordBotsList's API!
const dbl = require("dblposter");

const dblPoster = new dbl(`dbl api key`, client);
dblPoster.bind();

Discord Bots API
*/

console.log(`Logged in as ${client.user.tag}\nCurrently on ${client.guilds.size} servers with a total of ${client.users.size} users!`);
};