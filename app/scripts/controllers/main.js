'use strict';

/**
 * @ngdoc function
 * @name martianRobotsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the martianRobotsApp
 */
angular.module('martianRobotsApp')
  .controller('MainCtrl', function ($scope,missionControl) {

    // Start mission button
    // Simply loads the instructions, executes the mission and then returns any output
    $scope.btnStart = function(){
      if(!missionControl.load($scope.txtInput) || !missionControl.executeMission()){
        $scope.txtOutput = '===Error In Simulation===' + '\n\n' + '===Simulation Finished===';
        return false;
      }
      var result = missionControl.getOutcomes();
      $scope.txtOutput = result.output + '\n\n' + '===Simulation Finished===';
    };

    // Clear both text areas
    $scope.btnClear = function(){
      $scope.txtInput = '';
      $scope.txtOutput = '';
    };

    // Simple init
    var init = function(){
      $scope.txtInput = '';
      $scope.txtOutput = '';
    };

    init();
  });
