const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {
  //TEST 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  //TEST 2
  test("constructor sets command type", function(){
    let commandType = "MOVE";
    let testCommand = new Command(commandType);
    expect(testCommand.commandType).toEqual("MOVE");
  });
  
  //TEST 3
  test("constructor sets a value passed in as the 2nd argument", function(){
    let commandType = "MOVE"
    let value = 98382;
    let testValue = new Command(commandType, value);
    expect(testValue.value).toEqual(98382);
  });
});