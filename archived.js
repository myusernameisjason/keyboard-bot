const Discord = require("discord.js");

const TOKEN = // redacted for security

const PREFIX = "-";

var fortunes = [
    "Yes.",
    "No."
];

var oldPing = null;
var lastUser = null;

var levels = [
    "Not really.",
    "Somewhat.",
    "Neutral.",
    "Very.",
    "Super.",
    "No Doubt."
];

var bot = new Discord.Client();

bot.on("ready", function () {
    console.log("Ready");
    // bot.user.setGame("with your fingers. Type \'-help\'"); // depreciated method of setting 'status'
    bot.user.setStatus('dnd'); // options: online, away, dnd, invisible
    bot.user.setActivity('x'), { type: 'WATCHING' }
});

bot.on('message', message => {

    // variables
    let msg = message.content.toUpperCase(); // removes case sensitivity
    let sender = message.author; 
    let cont = message.content.slice(PREFIX.length).split(" "); // removes 'prefix'
    let args = cont.slice(1); // leaves 'arguments'

    // purge
    if (msg.startsWith(PREFIX + 'PURGE')) {
        async function purge() {
            if (!message.member.hasPermissions("MANAGE_MESSAGES")) { // checks for permissions
                message.channel.send('You need \`Elevated Privileges\` to use this command.'); 
                return;
            }

            if (isNaN(args[0])) { // checks for a number
                message.channel.send('Please use a number as your arguments. \n Usage: ' + PREFIX + 'purge <amount>'); 
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // grabs the last number (args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // posts the amount of messages being deleted to console

            message.channel.bulkDelete(fetched.size + 1) // deleting...
            

        }
        purge(); 
    }
});

bot.on("guildMemberAdd", function(member)
{
 let memberRole = member.guild.roles.find("name", "Manager"); 
  member.addRole(memberRole);
});

bot.on('message', function(message){
       
      if(message.content == 'x')
      {
 let memberRole = message.member.guild.roles.find("name", "Manager");
  message.member.addRole(memberRole);
      }
});

bot.on("message", function (message) {
    if (message.author.equals(bot.use)) return;

    const bannedWords = [
        "x",
        "y",
        "z"
    ];

//if(bannedWords.some(word => message.content.includes(word)) && !(message.member.hasPermissions("MANAGE_MESSAGES"))) {
//message.delete();
//message.reply("Warning: Do not use offensive words.");
//}
  
// deletion of 'banned words'  
for (var i = 0; i < bannedWords.length; i++){
 if(message.content.includes(bannedWords[i]) && !(message.member.hasPermissions("MANAGE_MESSAGES"))){
  message.delete();
   message.reply("Warning: Do not use offensive words.");
   break;
 }
}

  if (message.content == "hello") {
        message.channel.sendMessage("Hi, there!");
    }
	if (message.content == "x") {
        message.channel.sendMessage("x response");
    }
	if (message.content == "y") {
        message.channel.sendMessage("y response");
    }
	if (message.content == "i" || message.content == "j") {
        message.channel.sendMessage("response");
    }
	if (message.content.startsWith("k")) {
	message.channel.send({files: [/*link to file*/]});
	}

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
      
    
    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.send('This message took **' + Math.round(bot.ping) + 'ms** to send! (Last ping was ' + oldPing + ' [requested by ' + lastUser + '])');
            oldPing = Math.round(bot.ping);
            lastUser = message.author.username.toString();
            break;
        case "info":
            message.channel.sendMessage(/*information*/);
            break;
        case "help":
            message.channel.sendMessage("go to this link for more info! → [link redacted for security]")
            break;
        case "yesorno":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("`Please input a yes/no question.`");
            break;
	      case "levels":
            if (args[1]) message.channel.sendMessage(levels[Math.floor(Math.random() * levels.length)]);
            else message.channel.sendMessage("`Please input something you want the degree of.`");
            break;
        case "q":
            message.channel.sendMessage(message.author.toString() + " q response");
            break;
	    case "o":
            message.channel.send({files: [/*link to image*/]});
            break;
	    case "bannedwords":
            message.channel.sendMessage(/* link to 'banned words' */);
            break;

    }
});

bot.login(); // token redacted for security