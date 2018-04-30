const main = require('../bot.js');
exports.run = (client, message, args) => {
    let cmd = args.join(' ');
    main.load(message, cmd);
};

exports.help = {
    name: 'load',
    description: 'Load a command. Reserved to bot owner.',
    aliases: [],
    usage: '<command-name>',
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: true,
    cooldown: 0
}