'use strict'

function commandPayload(sys, args) {
   sys.message.channel.bulkDelete(0);
}

const bulkDelete = {
   desc: "Clears last 100 messages in channel it's executed in.",
   permissions: 10,
   payload: commandPayload,
}

module.exports = bulkDelete;