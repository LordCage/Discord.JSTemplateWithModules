const main = require('../bot.js');
exports.run = (client, message, args) => {
    let cmd = args.join(' ');
    main.reload(message, cmd);
};

exports.conf = {
    name: 'reload',
    description: 'Reload a command. Reserved to bot owner.',
    aliases: [],
    usage: '<command-name>',
    
    enabled: true,
    guildOnly: false,
    ownerOnly: true
}