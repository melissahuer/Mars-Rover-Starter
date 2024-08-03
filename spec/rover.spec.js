const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  //TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let position = 10;
    let mode = 'Normal';
    let generatorWatts = 110
    const testRover = new Rover(position, mode, generatorWatts);
    expect(testRover.position).toBe(position);
    expect(testRover.generatorWatts).toBe(generatorWatts);
    expect(testRover.mode).toBe(mode);
  });

  //TEST 8
  it("response returned by receiveMessage contains the name of the message", function () {
    const testRover = new Rover();
    const message = { name: "Test message", commands: [] };
    const response = testRover.receiveMessage(message);
    expect(response.message).toBe("Test message");
  });

  //TEST 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    const commands = [new Command('test_one', 'test_two'), new Command('test_three', 'test_four')];
    const message = new Message("Test Message with two commands", commands);
    const againRover = new Rover([0, 0]);
    const responseTwo = againRover.receiveMessage(message);
    expect(responseTwo.results.length).toBe(2);
  });

  //TEST 10
  it("responds correctly to the status check command", function () {
    let testingRover = new Rover(87382098, 'NORMAL', 110);
    let message = { name: "test status_check", commands: [{ commandType: 'STATUS_CHECK' }] };
    let responseThree = testingRover.receiveMessage(message);
    let testStatus = { mode: testingRover.mode, generatorWatts: testingRover.generatorWatts, position: testingRover.position };
    expect(responseThree.results.length).toBe(1);
    expect(responseThree.results[0]).toEqual({ roverStatus: testStatus });
  });

  //TEST 11
  it("responds correctly to the mode change command", function () {
    let testRover = new Rover(87382098, 'NORMAL', 110);
    let message = { name: "test mode_change", commands: [{ commandType: 'MODE_CHANGE' }] };
    let responseFour = testRover.receiveMessage(message);
    let testModeStatus = { completed: true };
    expect(responseFour.results[0]).toEqual(testModeStatus);
  });

  //TEST 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let testRover = new Rover(0, 'LOW_POWER');
    let moveCommand = new Command('MOVE', 10);
    let message = new Message('testing move mode', [moveCommand]);
    let responseFive = testRover.receiveMessage(message);
    expect(responseFive.results[0].completed).toBe(false);
  });

  //TEST 13
  it('responds with the position for the move command', function () {
    const initialPosition = 0;
    let testRover = new Rover(initialPosition);
    let newPosition = 10;
    let moveCommand = new Command('MOVE', newPosition);
    let message = new Message('testing move command and position', [moveCommand]); //{ name: "test move", commands: [{ commandType: 'MOVE'}] };
    let responseSix = testRover.receiveMessage(message);
    expect(responseSix.results[0]).toEqual({ completed: true });
    expect(testRover.position).toBe(newPosition);
  });
});
