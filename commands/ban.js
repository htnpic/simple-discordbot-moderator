const Discord = module.require("discord.js");
const config = require(`../config.json`);

module.exports.run = async (client, message, args) =>{
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Не найден пользователь, уточните.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Вы не имеете доступа к данной команде!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Нельзя заблокировать данного пользователя!");


    let banEmbed = new Discord.RichEmbed()
    .setDescription("Блокировка пользователя")
    .setColor("#bc0000")
    .setThumbnail("")
    .addField("Пользователь:", `${bUser} ID: ${bUser.id}`)
    .addField("Выдал блокировку:", `<@${message.author.id}>`)
    .addField("Канал:", message.channel)
    .addField("Причина:", bReason)
    .setTimestamp();


    await client.channels.get(config.logs).send(banEmbed)
    message.channel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}