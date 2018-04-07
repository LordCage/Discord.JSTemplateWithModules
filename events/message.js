const config = require('../config.json');

module.exports = message => {
    const client = message.client;
    const prefix = config.prefix;

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {

      // If the command is guildOnly return;
      if (cmd.conf.guildOnly && message.channel.type === 'dm') return message.channel.send('This command can only be used in servers.')
      
      // If the command is disabled return;
      if (!cmd.conf.enabled) return message.channel.send('This command is currently disabled.')

      // If the command is ownerOnly return;
      if (cmd.conf.ownerOnly && message.author.id !== config.owner) return message.channel.send('This command can only be used by the owner.')
      
      cmd.run(client, message, args);
    }
};