'use strict';

describe('Service: missionControl', function () {

  // load the service's module
  beforeEach(module('martianRobotsApp'));

  // instantiate service
  var missionControl;
  beforeEach(inject(function (_missionControl_) {
    missionControl = _missionControl_;
  }));

  // instantiate worldGrid (so we can access the world size)
  var worldGrid;
  beforeEach(inject(function (_worldGrid_) {
    worldGrid = _worldGrid_;
  }));


  // Standard input (as defined in the challenge spec)
  var standardInput = '5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL';



  it('should load input', function () {
    expect(missionControl.load(standardInput)).toBe(true);
  });

  it('should initialize a world of the size instructed', function () {
    var expectedOutput = {xMax:5,yMax:3};
    missionControl.load(standardInput);
    expect(worldGrid.getSize()).toEqual(expectedOutput);
  });

  it('should fetch blank results before any mission has been executed', function () {
    var expectedOutput = {result:null,output:''};
    missionControl.load(standardInput);
    expect(missionControl.getOutcomes()).toEqual(expectedOutput);
  });

  it('should start the mission', function () {
    missionControl.load(standardInput);
    expect(missionControl.executeMission()).toBe(true);
  });

  it('should fetch a full set of results after any mission has been executed', function () {
    var expectedOutput = {result:true,output:'1 1 E\n3 3 N LOST\n2 3 S'};
    missionControl.load(standardInput);
    missionControl.executeMission();
    expect(missionControl.getOutcomes()).toEqual(expectedOutput);
  });


  describe('while handling incorrect input', function () {
    it('should return false for invalid input (invalid instruction)', function () {
      var invalidInput = '5 3\nFAIL';
      expect(missionControl.load(invalidInput)).toBe(false);
    });
  });

});
