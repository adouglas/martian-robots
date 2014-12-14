/* jshint -W016 */
'use strict';

/**
 * @ngdoc service
 * @name martianRobotsApp.worldGrid
 * @description
 * # worldGrid
 * Factory in the martianRobotsApp.
 */
angular.module('martianRobotsApp')
  .factory('worldGrid', function () {
    var worldYMax = 0;
    var worldXMax = 0;
    // Using a holey array as lookups are marginaly faster
    var worldGrid = [];

    var boundsTest = function(x,y){
      if(x > worldXMax || y > worldYMax){
        return false;
      }
      return true;
    };

    // Public API here
    return {
      setSize: function(xMax,yMax){
        if(xMax > 50 || yMax > 50){
          return false;
        }
        worldXMax = xMax;
        worldYMax = yMax;
        return true;
      },
      getSize: function(){
        return {xMax:worldXMax,yMax:worldYMax};
      },
      setTile: function(x,y,value){
        if(!boundsTest(x,y)){
          return false;
        }
        var hash = ( x << 16 ) ^ y;
        if(worldGrid[hash] === undefined){
          worldGrid[hash] = {smells:[]};
        }
        worldGrid[hash].smells.push(value);
        return true;
      },
      getTile: function(x,y){
        if(!boundsTest(x,y)){
          return false;
        }

        var hash = ( x << 16 ) ^ y;
        if(worldGrid[hash] === undefined){
          return {smells:[]};
        }
        return worldGrid[hash];
      }
    };
  });
