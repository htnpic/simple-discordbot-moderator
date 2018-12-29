const Discord = require("discord.js");
const fs = require("fs");
const config = require(`../config.json`);
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("у Вас нет разрешения на использование данной команды!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("я не могу выдать предупреждение данному пользователю.");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Выдано предупреждение пользователю:")
  .addField("Модератор: ", `<@${message.author.id}>`, true)
  .setColor("#fc6400")
  .setThumbnail("")
  .addField("Предупреждён:", `<@${wUser.id}>`, true)
  .addField("Канал:", message.channel, true)
  .addField("Количество предупреждений:", warns[wUser.id].warns, true)
  .addField("Причина:", reason, true);

  await client.channels.get(config.logs).send(warnEmbed)
  await message.channel.send(warnEmbed)
  

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("Вы должны создать роль для участников, которых желаете предупредить.");

    let mutetime = "10m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> временно заглушен за многочисленные предупреждения - [2/3]`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> был разблокирован от заглушки.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> была заблокирован за многочисленные предупреждения - [3/3].`)
  }

}

module.exports.help = {
  name: "warn"
}