const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "stats",
    description: "user stats",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }

        let user
        if(message.mentions.users.first() !== undefined)
            user = message.mentions.users.first()
        else
            user = message.author

        let _name = config.client.userData[user.id].name 
        let _instance = config.client.userData[user.id].instance 
        let _age = config.client.userData[user.id].age 
        let _hp = config.client.userData[user.id].hp
        let _credits = config.client.userData[user.id].credits
        let _hydration = config.client.userData[user.id].hydration
        let _irradiation = config.client.userData[user.id].irradiation
        let _sickness = config.client.userData[user.id].sickness
        let _water = config.client.userData[user.id].water
        let _pPills = config.client.userData[user.id].pPills
        let _bPills = config.client.userData[user.id].bPills
        let _hPills = config.client.userData[user.id].hPills
        let _fuses = config.client.userData[user.id].fuses
        let _faction = config.client.userData[user.id].faction

        let _region
        _region = config.inst[_instance][2][config.client.userData[user.id].region]

        let stage
        if(_sickness > 0.3){ stage = 1
            if(_sickness > 0.5){ stage = 2
                if(_sickness > 0.7){ stage = 3
                    if(_sickness > 0.8){ stage = 4
                        if(_sickness > 0.9){ stage = 5 } } } } }
        else { stage = 0 }

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#b56b2a")
        .setTitle(_name)
        .addFields(
            {name: "Basic Info", value: "Name: " + _name + "\nAge: " + _age + "\nCredits: ₵" + _credits + "\nFaction: " + _faction},
            {name: "Status", value: "Current Instance: " + _instance + " • Region: " + _region[0] + " [Danger/Loot: " + _region[1] + "]\nHealth: " + Math.round(_hp*10000)/100 + "%\nHydration: " +  Math.round(_hydration*10000)/100 + "%\nIrradiation Level: " +  Math.round(_irradiation*10000)/100 + "%\nPerception Sickness: " +  Math.round(_sickness*10000)/100 + "% [Stage " + stage + "]"},
            {name: "Pouch", value: "Water: " +  Math.round(_water*10000)/100 + "%\nFuses: " + _fuses + "\nPerception Pills: " + _pPills + "\nNegative Bequerel Pills: " + _bPills + "\nHop Pills: " + _hPills}
        )        
        message.channel.send(newEmbed)
    }
}