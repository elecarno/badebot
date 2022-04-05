const Discord = require("discord.js")
const config = require("./config")
const token = require("./token")
const fs = require("fs")

config.client.once("ready", () => {
    console.log("badebot is online")
})

config.client.on("message", message => { 
    if(message.author.bot) return

    let mID
    if(message.mentions.users.first() !== undefined)
        mID = message.mentions.users.first()

    let modifier = 1
    if (message.content.includes("very") || message.content.includes("really"))
        modifier = 3
    else if (message.content.includes("hyper") || message.content.includes("super") || message.content.includes("highly"))
        modifier = 5
    else if (message.content.includes("unfathomably") || message.content.includes("extremely"))
        modifier = 7

    let given = false
    if (message.content.includes("bade")){ 
        if(config.client.userData[message.author.id] === undefined)
            config.client.commands.get("enter").execute(message.author)

        if(mID !== undefined){
            if(config.client.userData[mID.id] === undefined)
                config.client.commands.get("enter").execute(mID)

            given = true
            if (message.content.includes("antibade") || message.content.includes("unbade")){
                config.client.userData[mID.id].abade += modifier
                message.channel.send(mID.username + " now has " + config.client.userData[mID.id].abade + " antibades (added " + modifier + ")")
            } else {
                config.client.userData[mID.id].bade += modifier
                message.channel.send(mID.username + " now has " + config.client.userData[mID.id].bade + " bades (added " + modifier + ")")
            }
        }

        config.client.userData[message.author.id].amount += 1

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
        })

        message.channel.messages.fetch({limit: 2}).then(messageMappings => {
            let messages = Array.from(messageMappings.values());
            let previousMessage = messages[1];
            if(previousMessage.author.id === message.author.id || given ) return

            if(config.client.userData[previousMessage.author.id] === undefined)
                config.client.commands.get("enter").execute(mID)

            if (message.content.includes("antibade") || message.content.includes("unbade")){
                config.client.userData[previousMessage.author.id].abade += modifier
                message.channel.send(previousMessage.author.username + " now has " + config.client.userData[previousMessage.author.id].abade + " antibades (added " + modifier + ")")
            } else {
                config.client.userData[previousMessage.author.id].bade += modifier
                message.channel.send(previousMessage.author.username + " now has " + config.client.userData[previousMessage.author.id].bade + " bades (added " + modifier + ")")
            }
        })
        .catch(error => console.log(error))
    }

    if (!message.content.startsWith(config.prefix)) return
    const args = message.content.slice(config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === "data"){
        let data
        let title
        if(mID !== undefined)
            data = config.client.userData[mID.id]
        else
            data = config.client.userData[message.author.id]

        let badeness = data.bade - data.abade
        for(var i in config.titles){
            if(badeness >= config.titles[i]){
                title = i
            }
        }

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#e0a73d")
        .setTitle(data.name + " (" + title + ")")
        newEmbed.addField("badeness: " + badeness, "bades: " + data.bade + "\nantibades: " + data.abade + "\nspoketh: " + data.amount)
        message.channel.send(newEmbed)
    }
    else if (command === "top"){
        let data = []
        let stat = "badeness"
        let antistat = "antibadeness"
        let threshold = 0

        for(var i in config.client.userData){
            let uData = config.client.userData[i]
            if(args[0] === "speak"){
                data.push([uData.amount, i])
                stat = "screameth"
                antistat = "shushteth"
                threshold = 30
            } else {
                let badeness = uData.bade - uData.abade
                data.push([badeness, i])
            }
        }     
        if(args[0] === "anti")
            sorted = data.sort((a, b) => a[0] - b[0]);
        else
            sorted = data.sort((a, b) => b[0] - a[0]);
        index = 1

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#e0a73d")
        .setTitle("badebot leaderboard")

        for(var i = 0; i < sorted.length; i++){
            if(sorted[i][0] >= threshold)
                newEmbed.addField( index + ". " + config.client.userData[sorted[i][1]].name, stat + ": " + sorted[i][0])
            else
                newEmbed.addField( index + ". " + config.client.userData[sorted[i][1]].name, antistat + ": " + sorted[i][0])
            index++
        }
        message.channel.send(newEmbed)
    }

    /*
    if(command === "st" || command == "stats"){
        config.client.commands.get("stats").execute(message, args, Discord)
    }
    */
})
config.client.login(token.token)
