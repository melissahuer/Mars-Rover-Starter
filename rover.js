const Message = require(`./message.js`);
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode = ('Normal'), generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   recieveMessage(message) {
      this.message = message;
      let results = [];
      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         if (command.commandType === 'STATUS_CHECK') {
            results.push({
               roverStatus:{mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
            });
         } else {
            results.push({});
         }

      }
      //let results = [];
      //let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      //let message = new Message('Test message with two commands', commands);
      return {message: message.name, results: results};//: message.name, results: results};
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