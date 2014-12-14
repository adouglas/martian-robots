'use strict';

describe('Service: worldGrid', function () {

  // load the service's module
  beforeEach(module('martianRobotsApp'));

  // instantiate service
  var worldGrid;
  beforeEach(inject(function (_worldGrid_) {
    worldGrid = _worldGrid_;
  }));

  it('should have an initial size of 0,0', function () {
    var expectedOutput = {xMax:0,yMax:0};
    expect(worldGrid.getSize()).toEqual(expectedOutput);
  });

  it('should be able to be set the size of the world grid', function () {
    var expectedOutput = {xMax:5,yMax:3};
    worldGrid.setSize(5,3);
    expect(worldGrid.getSize()).toEqual(expectedOutput);
  });

  it('should be able to get any valid grid tile', function () {
    var expectedOutput = {smells:[]};
    worldGrid.setSize(5,3);
    expect(worldGrid.getTile(1,1)).toEqual(expectedOutput);
  });

  it('should be able to set the value of any valid grid tile', function () {
    var expectedOutput = {smells:[{o:'N'}]};
    worldGrid.setSize(5,3);
    worldGrid.setTile(3,3,{o:'N'});
    expect(worldGrid.getTile(3,3)).toEqual(expectedOutput);
  });

  it('should be able to have a maximum world grid size of 50,50', function () {
    expect(worldGrid.setSize(52,60)).toBe(false);
  });


  it('should return false in the attempt to set any grid tile outside of the world bounds', function () {
    worldGrid.setSize(5,3);
    expect(worldGrid.setTile(15,8,{o:'N'})).toBe(false);
    expect(worldGrid.getTile(15,8)).toBe(false);
  });

  it('should return false in the attempt to get any grid tile outside of the world bounds', function () {
    worldGrid.setSize(5,3);
    expect(worldGrid.getTile(15,8)).toBe(false);
  });

});
