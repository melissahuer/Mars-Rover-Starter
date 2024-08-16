const Message = require(`./message.js`);
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode = 'Normal', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      this.message = message;
      let results = [];
      let command = message.commands;
      for (let i=0; i<command.length; i++) {
         if (command.commandType === 'STATUS_CHECK') {
            results.push({ roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position } });
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            results.push({ completed: true })
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               results.push({ completed: false })
            } else {  
               this.position = command.value;
               results.push({ completed: true })   
            }
         }
         else {
            results.push({commandType: command.commandType, result: 'unknown' })
         }
      }
      return {message: message.name, results: results };
   }
}

module.exports = Rover; 