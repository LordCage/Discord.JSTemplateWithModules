const main = require('../bot.js');
exports.run = (client, message, args) => {
    let cmd = args.join(' ');
    main.unload(message, cmd);
};

exports.conf = {
    name: 'unload',
    description: 'Unload a command. Reserved to bot owner.',
    aliases: [],
    usage: '<command-name>',
    
    enabled: true,
    guildOnly: false,
    ownerOnly: false
}