module.exports = {
    name: "help",
    description: "displays all commands",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#a84931")
        .setTitle("List of Commands")
        .addFields(
            {name: "**BASIC INFO ════════════════════════════════════════**", value: "Useful to understand all of this"},
            {name: "prefix is \"`b `\"", value: "use this at the start of all your commands."},     
        )
        .setFooter("Bot by Elecarno")         
        message.channel.send(newEmbed)
    }
}