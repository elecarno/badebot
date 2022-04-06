const Discord = require("discord.js")
const client = new Discord.Client()

const prefix = "b"
client.userData = require("./user-data.json")

const UBS = 1;

const fs = require("fs")
const { Z_PARTIAL_FLUSH } = require("zlib")
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

exports.titles = { "antibade blooded":-100, "greatly antibade":-50, "truly antibade": -25, "slightly antibade": -1, 
"true neutral":0, "slightly bade":1, "getting bade": 7, "truly bade":25, "greatly bade":50,
"bade blooded": 100}

exports.client = client
exports.prefix = prefix