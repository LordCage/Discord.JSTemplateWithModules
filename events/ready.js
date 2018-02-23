module.exports = client => {
console.log(`Logged in as ${client.user.tag}\nCurrently on ${client.guilds.size} servers with a total of ${client.users.size} users!`);
};