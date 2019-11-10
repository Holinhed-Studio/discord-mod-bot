'use strict'

const CMDS_PER_PAGE = 10;

function commandPayload(sys, cmdmap, args) {
   
   const embed = new sys.discord.RichEmbed()
   .setColor('#0xff3136');
   //let list = "";

   const page = args.length == 0 ? 0 : parseInt(args[0]) - 1;

   const numCommands = Object.keys(cmdmap).length;

   let pages = numCommands / CMDS_PER_PAGE;

   if (pages < 1) pages = 1
   else {
      pages = Math.ceil(pages);
   }

   if (page < 0 || page > pages - 1) {
      sys.message.channel.send("Invalid page. Must be between 1 and " + pages);
      return;
   }

   const afterC = (page) * CMDS_PER_PAGE; 

   embed.setTitle("Command List (Page " + (page + 1) + "/" + pages + ")");

   let counter = 0;
   let tracker = 0;

   //sys.message.channel.send("AferC:" + afterC);

   for (let val in cmdmap) {
      //list += "**" + cmdmap[val].name + "**\n" + cmdmap[val].desc + "\n\n";
      if (counter == 10) break;
      if (tracker >= afterC) {
         embed.addField(cmdmap[val].name, cmdmap[val].desc);
         counter += 1;
      }
      tracker += 1;
   }

   embed.setFooter("Total Commands: " + numCommands)
   .setTimestamp();

   //sys.message.channel.send(`>>> __Command List__\n\n${list}`);
   sys.message.channel.send(embed);

}

const system_list = {
   name: "system_list",
   desc: "Lists every loaded command.",
   usuage: "<page>",
   permissions: 1,
   payload: commandPayload,
   author: "System",
}

module.exports = system_list;