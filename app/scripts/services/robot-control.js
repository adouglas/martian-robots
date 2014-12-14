'use strict';

/**
 * @ngdoc service
 * @name martianRobotsApp.robotControl
 * @description
 * # robotControl
 * Factory in the martianRobotsApp.
 */
angular.module('martianRobotsApp')
  .factory('robotControl', function (worldGrid) {
    // Blank robot object
    var currentRobot = {id:null,instructions:[],position:{x:0,y:0,o:'N'},status:'READY'};

    // Rotates the robot left
    var rotateLeft = function(){
      switch(currentRobot.position.o){
        case 'N':
          currentRobot.position.o = 'W';
          break;
        case 'E':
          currentRobot.position.o = 'N';
          break;
        case 'S':
          currentRobot.position.o = 'E';
          break;
        case 'W':
          currentRobot.position.o = 'S';
          break;
      }
      return true;
    };

    // Rotates the robot right
    var rotateRight = function(){
      switch(currentRobot.position.o){
        case 'N':
          currentRobot.position.o = 'E';
          break;
        case 'E':
          currentRobot.position.o = 'S';
          break;
        case 'S':
          currentRobot.position.o = 'W';
          break;
        case 'W':
          currentRobot.position.o = 'N';
          break;
        }
        return true;
    };

    // Moves the robot forward by one grid tile
    // (also handles the robot moving off the grid and getting lost)
    var moveForward = function(){
      var currentTile = worldGrid.getTile(currentRobot.position.x,currentRobot.position.y);

      if(currentTile && currentTile.smells.length > 0){
        for(var i = 0; i < currentTile.smells.length; i++){
          if(currentTile.smells[i].o === currentRobot.position.o){
            // This move has cause a previous robot to be lost and so is invalid (ignore it)
            return true;
          }
        }
      }

      var worldSize = worldGrid.getSize();

      switch(currentRobot.position.o){
        case 'N':
          if((currentRobot.position.y + 1) > worldSize.yMax){
            return false;
          }
          currentRobot.position.y++;
          break;
        case 'E':
          if((currentRobot.position.x + 1) > worldSize.xMax){
            return false;
          }
          currentRobot.position.x++;
          break;
        case 'S':
          if((currentRobot.position.y - 1) < 0){
            return false;
          }
          currentRobot.position.y--;
          break;
        case 'W':
          if((currentRobot.position.x - 1) < 0){
            return false;
          }
          currentRobot.position.x--;
          break;
        }
        return true;
    };

    return{
      // Loads instructions into this robot
      loadRobot: function(robot){
        var worldSize = worldGrid.getSize();
        // Guard against robot being initialy positioned outside of the bounds of the world grid
        if(robot.position.x > worldSize.xMax || robot.position.y > worldSize.yMax){
          currentRobot = {id:null,instructions:[],position:{x:0,y:0,o:'N'},status:'READY'};
          return false;
        }

        currentRobot = robot;
        currentRobot.status = 'READY';
        return true;
      },
      getCurrentRobot: function(){
        return currentRobot;
      },
      // Reads each instruction and (simulates) the order
      executeCurrentRobot: function(){
        for(var i = 0; i < currentRobot.instructions.length; i++){
          // This switch could be extended to add new instructions
          switch(currentRobot.instructions[i]){
            case 'L':
              rotateLeft();
              break;
            case 'R':
              rotateRight();
              break;
            case 'F':
              if(!moveForward()){
                // Robot is lost
                worldGrid.setTile(currentRobot.position.x,currentRobot.position.y,{o:currentRobot.position.o});
                currentRobot.status = 'LOST';
                return currentRobot;
              }
              break;
            default:
              // Invalid instructions should not happen but if they do ignore them
              break;
          }
        }
        currentRobot.status = 'FINISHED';
        return currentRobot;
      }
    };
  });
