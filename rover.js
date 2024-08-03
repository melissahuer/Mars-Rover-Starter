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
      for (let command of message.commands) {
         if (command.commandType === 'STATUS_CHECK') {
            results.push({ roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position } });
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            results.push({ completed: true })
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               results.push({ completed: false })
               //this.position = 0;
            } else { 
               
               this.position = command.value;
               results.push({ completed: true })

               
            }
         }
         else {
            results.push({ commandType: command.commandType, result: 'unknown' })
         }

      }
      //let results = [];
      //let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      //let message = new Message('Test message with two commands', commands);
      return { message: message.name, results: results };//: message.name, results: results};
   }
}

//this.results = results;


//unit test 8 draft code
// let message = new Message("testing message")
// if(!message){
//    throw Error ("Message required")
// }
//console.log(message);
// new Message.name;

//    let message = {
//       testMessage: "test message with two commands"
//    }
//    let response = rover.recieveMessage(message);
//    return response;
// }
module.exports = Rover;