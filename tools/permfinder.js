function fromMessage(message, settings) {

   const usrid = message.author.id;
   
   if (settings.admins.includes(usrid)) return -1;

   const permLevels = settings.permlevels;
   
   let permLevel = 0;

   for (val in permLevels) {
      if (message.member.roles.find(r => r.name === val)) {
         permLevel = permLevels[val];
         break;
      }
   }

   return permLevel;
}

function fromId(usrId, settings) {

   if (settings.admins.includes(usrId)) return -1;

   return 0;
}

module.exports = { fromMessage, fromId };