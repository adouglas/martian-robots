'use strict';

/**
 * @ngdoc service
 * @name martianRobotsApp.missionControl
 * @description
 * # missionControl
 * Factory in the martianRobotsApp.
 */
angular.module('martianRobotsApp')
  .factory('missionControl', function (instructionReader,worldGrid,robotControl) {
    // A blank instructionSet object
    var instructionSet = {world:{xMax:0,yMax:0},robots:[]};
    // A blank outcome object
    var outcome = {result:null,output:''};

    // An executor for a single robot (single set of instructions)
    var robotExecuter = function(instructions){
      // Load instructions into robot
      var loaded = robotControl.loadRobot(instructions);
      if(!loaded){
        return false;
      }
      // Execute the plans in place in the current robot
      return robotControl.executeCurrentRobot();
    };

    // Transfers the output to the outcome object
    var recordOutcome = function(newOutcome){
      outcome.output = outcome.output + (outcome.output.length > 0 ? '\n' : '') + newOutcome.position.x + ' ' + newOutcome.position.y + ' ' + newOutcome.position.o + (newOutcome.status === 'LOST' ? ' LOST' : '');
      return true;
    };

    return {
      // Loads a set of instructions and sets the world grid size
      load: function(input){
        var set = instructionReader.processInstructions(input);
        if(!set){
          return false;
        }

        if(!worldGrid.setSize(set.world.xMax,set.world.yMax)){
          return false;
        }

        instructionSet = set;

        // Reset the outcome object
        outcome = {result:null,output:''};

        return true;
      },
      // Executes each robot in series
      executeMission: function(){
        var robotOutcome;
        for(var i = 0; i < instructionSet.robots.length; i++){
          robotOutcome = robotExecuter(instructionSet.robots[i]);
          if(!robotOutcome){
            outcome.result = false;
            return false;
          }
          recordOutcome(robotOutcome);
        }
        outcome.result = true;
        return true;
      },
      // Returns the current outcomes
      getOutcomes: function(){
        return outcome;
      }
    };
  });
