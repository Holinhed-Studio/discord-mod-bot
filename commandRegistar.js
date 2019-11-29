'use strict'

const path = require('path');
const util = require('util');
const fs = require('fs');

const readdir = util.promisify(fs.readdir);

const dirPath = path.join(__dirname, "commands");
const syscmds = path.join(__dirname, "syscommands");

async function loadCommands() {

   let commandMap = {};

   let files;

   try {
      files = await readdir(dirPath);
      const sfiles = await readdir(syscmds);
      files = [...files, ...sfiles];
   } catch (err) {
      console.log(err);
   }

   files.forEach(file => {

      let command;
      
      if (file.startsWith("sys_"))
         command = require(syscmds + path.sep + file);
      else
         command = require(dirPath + path.sep + file);

      commandMap = {...commandMap, [command.name]: command };
   });

   return commandMap;
}

module.exports = loadCommands();