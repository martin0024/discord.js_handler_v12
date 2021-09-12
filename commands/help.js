// Module export for the command
module.exports.run = async (bot, message, cmd) => {
    if (!cmd) {
        // Message send
        message.channel.send({
            embed: {
                color: bot.config.colors.red,
                fields: [
                    {
                        name: "General",
                        value: bot.commands
                            .filter(
                                (e) =>
                                    e.help.category === "general" && // Name of the category
                                    e.help.status
                            )
                            .map((e) => "`-> " + bot.prefix + e.help.name + "`")
                            .join("\n"),
                        inline: true,
                    },
                ],
                timestamp: new Date(),

                footer: {
                    text: "Help page",
                },
            },
        });
    } else {
        let command = bot.commands.find(
            (e) =>
                e.help.name === cmd.toLowerCase() ||
                e.help.name.includes(cmd.toLowerCase())
        );
        if (!command)
            return bot.erreur(
                "Can not find this command !",
                message.channel.id
            );
        message.channel.send({
            embed: {
                color: bot.config.colors.red,
                description:
                    "» Command's name : `" +
                    command.help.name +
                    "`" +
                    "\n» Alias : `" +
                    (command.help.alias.length === 0
                        ? "No alias."
                        : command.help.alias.join(" ou ")) +
                    "`" +
                    "\n» Description : `" +
                    (command.help.description.length === 0
                        ? "No description."
                        : command.help.description) +
                    "`" +
                    "\n» Utilisation : `" +
                    (command.help.utilisation.length === 0
                        ? "We don't know how to use this command."
                        : command.help.utilisation) +
                    "`",
            },
        });
    }
};

// That's essential for the command help
module.exports.help = {
    name: "help", // Name of the commands, is the not thing that the command name file !
    alias: [], // Alias for the command
    description: "To help users !",
    utilisation: `help <name_of_the_command> or help`, // You can tell to users how to use the command.
    category: "general", // This is the category (help system)
    permissions: {
        // Permissions for the command
        bot: "",
        user: "",
    },
    only_for: [],
    status: true, // We can use it ? Yes = true / No = false
};
