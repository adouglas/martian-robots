'use strict';

describe('Service: instructionReader', function () {

  // load the service's module
  beforeEach(module('martianRobotsApp'));

  // instantiate service
  var instructionReader;
  beforeEach(inject(function (_instructionReader_) {
    instructionReader = _instructionReader_;
  }));

  it('should accept string based raw input', function () {
    expect(instructionReader.processInstructions('3 3')).not.toBe(false);
  });

  it('should return an object containing a representation of the size of the world', function () {
    var input = '5 3';
    var expectedOutput = {world:{xMax:5,yMax:3},robots:[]};
    expect(instructionReader.processInstructions(input)).toEqual(expectedOutput);
  });

  it('should return an object containing instructions for a robot', function () {
    var input = '5 3\n1 1 E\nRFRFRFRF';
    var expectedOutput = {position:{x:1,y:1,o:'E'},instructions:['R','F','R','F','R','F','R','F']};
    expect(instructionReader.processInstructions(input).robots[0]).toEqual(expectedOutput);
  });

  it('should return an object containing instructions for multiple robots', function () {
    var input = '5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL';
    var expectedOutput = {position:{x:3,y:2,o:'N'},instructions:['F','R','R','F','L','L','F','F','R','R','F','L','L']};
    expect(instructionReader.processInstructions(input).robots.length).toEqual(3);
    expect(instructionReader.processInstructions(input).robots[1]).toEqual(expectedOutput);
  });

  describe('while handling invalid input',function(){
    it('should reject any input which is not string based', function () {
      expect(instructionReader.processInstructions(33)).toBe(false);
    });
    it('should reject any input where a robot has missing information', function () {
      var input = '5 3\n1 1\nRFRFRFRF';
      expect(instructionReader.processInstructions(input)).toBe(false);
    });
    it('should reject any input where a robot has extra information', function () {
      var input = '5 3\n1 1 E\nRFRFRBD3FRF';
      expect(instructionReader.processInstructions(input)).toBe(false);
    });
  });

});
