// Create by ϻartin#0024 / 12/09/2021
// Can be use free rights
// Enjoy 😆

//Main
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

let config = JSON.parse(fs.readFileSync("./json/config.json", "utf8"));
bot.commands = new Discord.Collection();
bot.config = config;
bot.prefix = config.prefix;
bot.erreur = erreur;

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) return console.log("Aucune commande trouvée !");
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`\x1b[32m[VALID]\x1b[33m ${f} chargé !`);
        bot.commands.set(props.help.name, props);
    });
});

// Bot start
bot.login(bot.config.token);
bot.on("ready", async function () {
    console.log("\x1b[32m[START]\x1b[33m Bot connecté !\x1b[0m");
    bot.user.setActivity(`ϻartin#0024`, { type: "WATCHING" });
});

// Handler bot with commands system
bot.on("message", async (message) => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(bot.prefix)) return;
    let args = message.content.split(" ").slice(1).join(" ");
    let cmd = message.content.split(" ")[0].slice(bot.prefix.length);

    let commandFile =
        bot.commands.find(
            (c) => c.help.name.toLowerCase() == cmd.toLowerCase()
        ) ||
        bot.commands.find((c) =>
            c.help.alias ? c.help.alias.includes(cmd.toLowerCase()) : false
        );
    if (!commandFile || !commandFile.help.status) return;

    if (!bot.config.staff.includes(message.author.id)) {
        if (
            commandFile.help.permissions.user &&
            !message.member.hasPermission(commandFile.help.permissions.user)
        )
            return erreur("Vous n'avez pas la permission.", message.channel.id);
        if (
            commandFile.help.permissions.bot &&
            !message.guild.me.hasPermission(commandFile.help.permissions.bot)
        )
            return erreur(
                "Le bot n'a pas assez de permissions.",
                message.channel.id
            );
        if (
            commandFile.help.only_for &&
            commandFile.help.only_for.length !== 0 &&
            !commandFile.help.only_for.includes(message.author.id)
        )
            return erreur("Vous n'avez pas la permission.", message.channel.id);
    }
    commandFile.run(bot, message, args);
});

// Fonction erreur, embed system
function erreur(message, channel_id, option) {
    let channel = bot.channels.cache.get(channel_id);
    if (channel)
        channel
            .send({
                embed: {
                    color: bot.config.colors.red,
                    description: message,
                },
            })
            .then((msg) => {
                if (option) msg.delete({ timeout: 5000 });
            });
}
