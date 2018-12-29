module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У Вас нет прав для пользования данной командой!");
    if(!args[0]) return message.channel.send(config.logs);
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Удалено ${args[0]} сообщений.`).then(msg => msg.delete(5000));
    });
  }
  
  module.exports.help = {
    name: "clear"
  }