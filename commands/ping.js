// Example ping command
exports.run = (client, message, args) => {
        message.channel.send(`Pong!`).then(msg => {
            msg.edit(`Pong!\nDiscord API Latency: ${Math.round(client.ping)}ms!\mServer Latency: ${Math.round(msg.createdTimestamp - message.createdTimestamp)}ms!`)
        }).catch(err => message.channel.send(err))
};

exports.conf = {
    name: 'ping',
    description: 'Pong!',
    aliases: [],
    usage: '',

    enabled: true,
    guildOnly: false,
    ownerOnly: false
}
