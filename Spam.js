const Discord = require('discord.js');
const client = new Discord.Client();
client.on ("ready",()=>{
    console.log("bot started up");
    client.on ("ready",()=>{
    client.user.setActivity("help i sdadas");
    console.log(`${client.user.tag}rgfsdfdfgdgdf`);

    })
    client.on("message",async msg=>{
        if(msg.content === "@everyone"){
  msg.channel.send("@everyone")
        }
        if(msg.content === "help"){
            msg.channel.send("@everyone")

        }
        
    })
})
client.login("NDMzMjQzNDYwODIxMDU3NTM2.DcD3Iw.MVPhWhaFrddK21A4j6Ag3fnVoyg")