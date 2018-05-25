// Example ping command
exports.run = (client, message, args) => {
        message.channel.send(`Pong!`).then(msg => {
            msg.edit(`Pong!\nDiscord API Latency: ${Math.round(client.ping)}ms!\nServer Latency: ${Math.round(msg.createdTimestamp - message.createdTimestamp)}ms!`)
        }).catch(err => message.channel.send(err))
};

exports.help = {
    name: 'ping',
    description: 'Pong!',
    aliases: [],
    usage: '',
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 10
}
