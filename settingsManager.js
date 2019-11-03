'use strict'

const fs = require('fs');

class settingsManager {

   constructor(path) {
      this.path = path || "settings.json";

      this.open();
   }

   open() {
      this.settings = JSON.parse(fs.readFileSync(this.path));
   }

   get() {
      return this.settings;
   }

   update(newSettings) {
      this.settings = newSettings;

      fs.writeFile(this.path, JSON.stringify(this.settings), (err) => {
         if (err) console.log(err);
      });
   }

}

module.exports = settingsManager;