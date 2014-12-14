'use strict';

describe('Service: robotControl', function () {

  // load the service's module
  beforeEach(module('martianRobotsApp'));

  // instantiate service
  var robotControl;
  beforeEach(inject(function (_robotControl_) {
    robotControl = _robotControl_;
  }));

  // instantiate service (worldGrid)
  var worldGrid;
  beforeEach(inject(function (_worldGrid_) {
    worldGrid = _worldGrid_;
  }));

  it('should initialise with a blank robot', function () {
    var expectedOutput = {id:null,instructions:[],position:{x:0,y:0,o:'N'},status:'READY'};
    expect(robotControl.getCurrentRobot()).toEqual(expectedOutput);
  });

  it('should be able to accept a set of robot parameters', function () {
    var validRobot = {id:1,position:{x:1,y:1,o:'E'},instructions:['R','F','R','F','R','F','R','F']};
    var expectedOutput = {id:1,position:{x:1,y:1,o:'E'},instructions:['R','F','R','F','R','F','R','F'],status:'READY'};
    worldGrid.setSize(5,3);
    expect(robotControl.loadRobot(validRobot)).toBe(true);
    expect(robotControl.getCurrentRobot()).toEqual(expectedOutput);
  });

  it('should be able to execute a robots instruction set and return the result', function () {
    var validRobot = {id:1,position:{x:1,y:1,o:'E'},instructions:['R','F','R','F','R','F','R','F']};
    var expectedOutput = {id:1,position:{x:1,y:1,o:'E'},instructions:['R','F','R','F','R','F','R','F'],status:'FINISHED'};
    worldGrid.setSize(5,3);
    expect(robotControl.loadRobot(validRobot)).toBe(true);
    expect(robotControl.executeCurrentRobot()).toEqual(expectedOutput);
  });

  it('should be able to execute a robots instruction set, even if the robot gets lost, and return the result', function () {
    var validRobot = {id:2,position:{x:3,y:2,o:'N'},instructions:['F','R','R','F','L','L','F','F','R','R','F','L','L']};
    var expectedOutput = {id:2,position:{x:3,y:3,o:'N'},instructions:['F','R','R','F','L','L','F','F','R','R','F','L','L'],status:'LOST'};
    worldGrid.setSize(5,3);
    expect(robotControl.loadRobot(validRobot)).toBe(true);
    expect(robotControl.executeCurrentRobot()).toEqual(expectedOutput);
  });

  it('should return false if the starting location of the robot is outside of the current world size', function () {
    var invalidRobot = {id:12,position:{x:50,y:6,o:'E'},instructions:['R','F','R']};
    worldGrid.setSize(5,3);
    expect(robotControl.loadRobot(invalidRobot)).toBe(false);
  });

});
