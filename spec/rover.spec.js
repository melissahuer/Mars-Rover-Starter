const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

//TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let position = 10;
    let mode = 'Normal';
    let generatorWatts = 110
    const testRover = new Rover(position, mode, generatorWatts);
    expect(testRover.position).toBe(position);
    expect(testRover.generatorWatts).toBe(generatorWatts);
    expect(testRover.mode).toBe(mode);
  }); 

//TEST 8
it("response returned by recieveMessage contains the name of the message", function(){
 const testRover = new Rover();
  const message = {name: "Test message", commands: []};
  const response = testRover.recieveMessage(message);
  //let testNewMess = new Message.name;
 // recieveMessage(message);
  //let rover = new Rover.recieveMessage(message);
 // let response = rover.recieveMessage(message);
 //expect(recieveMessage(response)).toBe(message);
 expect(response.message).toBe("Test message");
});

//TEST 9
 it("response returned by recieveMessage includes two results if two commands are sent in the message", function(){
  const againRover = new Rover();
  const message = {name: "Test Message with two commands", commands: [{},{}]};
  const responseTwo = againRover.recieveMessage(message);
  expect(responseTwo.results.length).toBe(2);
 });

 //other ideas for test 9:
    //const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  //const results = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  //expect(response.message).toBe('Test message with two commands');

  //TEST 10
  it("responds correctly to the status check command", function(){
  let testRover = new Rover();
  testRover.position = 8745;
  testRover.mode = 'test_mode';
  let message = {name: "test status check", commands: [{commandType: 'STATUS_CHECK'}]};
  let response = testRover.recieveMessage(message);
  let testStatus = {mode: testRover.mode, generatorWatts: testRover.generatorWatts, position: testRover.position}; 
  expect(response.results.length).toBe(1);
  expect(response.results[0]).toBe({roverStatus:testStatus});
});
  //TEST 11


//TEST 12


//TEST 13

});
