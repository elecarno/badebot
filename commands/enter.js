const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "enter",
    description: "enters the Tanglements in a random instance",
    execute(user){
        config.client.userData[user.id] = {
            name: user.username,
            bade: 0,
            abade: 0,
            amount: 0,
            lol: 0,
            lmao: 0,
            xd: 0,
            gg: 0,
            bruh: 0
        }
        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
        })
    }
}