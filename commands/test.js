// Module export for the command
module.exports.run = async (bot, message, args) => {
    // Where we send a message where the command is request
    message.channel.send("Test command !");
    // You can send with the function bot.erreur also !
    bot.erreur("Test command with function erreur", message.channel.id)
};

// That's essential for the command help
module.exports.help = {
    name: "test", // Name of the commands, is the not thing that the command name file !
    alias: ["test2"], // Alias for the command
    description: "This is a test command.", // That the description of the command.
    utilisation: "Like this: test", // You can tell to users how to use the command.
    category: "general", // This is the category (help system)
    permissions: {
        // Permissions for the command
        bot: "",
        user: "",
    },
    only_for: [],
    status: true, // We can use it ? Yes = true / No = false
};
