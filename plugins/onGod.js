'use strict'

const settings = {
   doOnGod: true,
};

function payload(sys, message) {
   let str = message.content;
        str = str.toUpperCase().replace(/[^a-zA-Z1-9]/g, "").trim();

        if (str == "OHONGOD") {
            message.channel.send("On God.");
        } else if (str == "ONGOD") {
            message.channel.send("Oh, on God?");
        }
}

const onGod = {
   name: "OnGod",
   desc: "Oh, on god?",
   author: "Holinhed",
   payload,
   settings,
}

module.exports = onGod;