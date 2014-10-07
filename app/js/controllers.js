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

  var gotImagesWorks = false;
  //$http.get('').
  $http.get(urlJsonWorks).
    success(function(data, status, headers, config) {
      $scope.works = data.list;
      $.each($scope.works, function(index) {
        if ($scope.works[index].field_image) {
          var url = $scope.works[index].field_image.file.uri;
          $http.get(url).success(function(data, status, headers, config) {
            $scope.works[index].field_image.url = data.url;
          });  
        }
      });
    }).
    error(function(data, status, headers, config) {
      // log error
      console.log(status);
    });
});
