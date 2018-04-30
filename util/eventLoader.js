const load = (event) => require(`../events/${event}`);

module.exports = client => {
    // You can add as many "events" as you want here, just remember to "create" them in the events folder too!
    client.on('ready', () => load('ready')(client));
    client.on('guildCreate', load('guildCreate'));
    client.on('guildDelete', load('guildDelete'));
    client.on('message', load('message'));
};