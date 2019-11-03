function findPermLevel(message, settings) {

   const usrid = message.author.id;
   
   if (settings.admins.includes(usrid)) return 999;

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

module.exports = findPermLevel;