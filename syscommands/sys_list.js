'use strict'

function commandPayload(sys, cmdmap) {
   
   let list = "";

   for (let val in cmdmap) {
      list += "**" + cmdmap[val].name + "**\n" + cmdmap[val].desc + "\n\n";
   }

   sys.message.channel.send(`>>> __Command List__\n\n${list}`);

}

const system_list = {
   name: "system_list",
   desc: "Lists every loaded command.",
   permissions: 1,
   payload: commandPayload,
   author: "System",
}

module.exports = system_list;