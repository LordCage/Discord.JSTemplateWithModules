const main = require('../bot.js');
exports.run = function(client, message, args) {
    if (message.author.id !== 'your ID here' /* The ID of the person who can reload commands */) return;
    let cmd = args.join(' ');
    main.reload(message, cmd);
};