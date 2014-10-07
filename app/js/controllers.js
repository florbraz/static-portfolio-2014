'use strict';

/* Controllers */

var portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller('WorksCtrlr', function($scope, $http) {
	if (window.location.origin == "florbraz.com") {
		var urlJsonWorks = "http://florbraz.com/drupal/node.json?type=works&limit=3&page=0";
	}
	else {
		var urlJsonWorks = "js/works.json";
	}
  //$http.get('').
  $http.get(urlJsonWorks).
    success(function(data, status, headers, config) {
      $scope.works = data.list;
    }).
    error(function(data, status, headers, config) {
      // log error
      console.log(status);
    });
});
