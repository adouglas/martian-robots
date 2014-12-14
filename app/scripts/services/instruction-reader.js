'use strict';

/**
 * @ngdoc service
 * @name martianRobotsApp.instructionReader
 * @description
 * # instructionReader
 * Service in the martianRobotsApp.
 */
angular.module('martianRobotsApp')
  .service('instructionReader', function () {
    this.processInstructions = function(rawInput){
      // Guard against non string input
      if(!angular.isString(rawInput)){
        return false;
      }

      // Initialise settings object an split instructions into lines
      var output = {world:{xMax:0,yMax:0},robots:[]};
      var lines = rawInput.split('\n');


      // Extract and set the world settings
      var worldDetailLine = lines[0];
      var worldDetails = worldDetailLine.split(' ');



      // Guard against non numeric world values
      if(isNaN(worldDetails[0]) || isNaN(worldDetails[1])){
        return false;
      }

      output.world.xMax = parseInt(worldDetails[0], 10);
      output.world.yMax = parseInt(worldDetails[1], 10);


      // Loop over robot settings
      var currentRobot, currentRobotStart, currentRobotInstructions;
      for(var i = 1; i < lines.length; i++){
        // Skip blank lines
        if(lines[i] === ''){
            continue;
        }

        currentRobot = {position:{x:0,y:0,o:''},instructions:[]};

        // Split and set the start settings
        currentRobotStart = lines[i++].split(' ');
        // Guard against invalid values
        if(isNaN(currentRobotStart[0]) || isNaN(currentRobotStart[1]) || !angular.isString(currentRobotStart[2])){
          return false;
        }
        currentRobot.position.x = parseInt(currentRobotStart[0], 10);
        currentRobot.position.y = parseInt(currentRobotStart[1], 10);
        currentRobot.position.o = currentRobotStart[2];


        // Split and set the instruction settings
        // Guard against invalid values
        if(/[^RFL]/.test(lines[i])){
          return false;
        }
        currentRobotInstructions = lines[i].split('');
        currentRobot.instructions = currentRobotInstructions;


        // Append robot to end of robot list
        output.robots.push(currentRobot);
      }

      return output;
    };
  });
