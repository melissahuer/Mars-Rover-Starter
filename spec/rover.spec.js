const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  //TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function () {
    let position = 98382;
    let mode = 'Normal';
    let generatorWatts = 110
    let testRover = new Rover(position, mode, generatorWatts);
    expect(testRover.position).toEqual(98382);
    expect(testRover.generatorWatts).toEqual(110);
    expect(testRover.mode).toEqual('Normal');
  });

  //TEST 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let testRover = new Rover();
    let message = { name: "Test message", commands: [] };
    let testEight = testRover.receiveMessage(message);
    expect(testEight.message).toEqual("Test message");
  });

  //TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command('test_one', 'test_two'), new Command('test_three', 'test_four')];
    let message = new Message("Test Message with two commands", commands);
    let testRover = new Rover([0, 0]);
    let testNine = testRover.receiveMessage(message);
    expect(testNine.results.length).toEqual(2);
  });

  //TEST 10
  test("responds correctly to the status check command", function () {
    let testRover = new Rover(98382, 'NORMAL', 110);
    let message = { name: "test status_check", commands: [{ commandType: 'STATUS_CHECK' }] };
    let testTen = testRover.receiveMessage(message);
    let testStatus = { mode: testRover.mode, generatorWatts: testRover.generatorWatts, position: testRover.position };
    expect(testTen.results.length).toEqual(1);
    expect(testTen.results[0]).toEqual({ roverStatus: testStatus });
  });

  //TEST 11
  test("responds correctly to the mode change command", function () {
    let testRover = new Rover(98382, 'NORMAL', 110);
    let message = { name: "test mode_change", commands: [{ commandType: 'MODE_CHANGE' }] };
    let testEleven = testRover.receiveMessage(message);
    let testModeStatus = { completed: true };
    expect(testEleven.results[0]).toEqual(testModeStatus);
  });

  //TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let testRover = new Rover(0, 'LOW_POWER');
    let moveCommand = new Command('MOVE', 10);
    let message = new Message('testing move mode', [moveCommand]);
    let testTwelve = testRover.receiveMessage(message);
    expect(testTwelve.results[0].completed).toEqual(false);
  });

  //TEST 13
  test('responds with the position for the move command', function () {
    let initialPosition = 0;
    let testRover = new Rover(initialPosition);
    let newPosition = 98382;
    let moveCommand = new Command('MOVE', newPosition);
    let message = new Message('testing move command and position', [moveCommand]); 
    let testThirteen = testRover.receiveMessage(message);
    expect(testThirteen.results[0]).toEqual({completed: true});
    expect(testRover.position).toEqual(98382);
  });
});
