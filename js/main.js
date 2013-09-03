var searchApp = angular.module('searchApp', []);

searchApp.factory('resultFactory', function($http, $rootScope) {
    return {
	results: [],
	resultInfo: {},
	
	postTerms: function(terms) {
	    $http({method: 'GET', 
		   url: 'http://localhost:3000/dois',
		   params: {q: terms}})
		.success(function(data) {
		    this.results = data.message.items;
		    this.resultInfo = {
			totalResults: data.message['total-results'],
			page: data.message.query['start-page']
		    };
		    $rootScope.$broadcast('resultsUpdated');
		    $rootScope.$broadcast('resultInfoUpdated');
		});
	},
    }
});

searchApp.controller('TermsController', function($scope, resultFactory) {
    $scope.$watch('terms', function() {
	resultFactory.postTerms($scope.terms);
    });
});

searchApp.controller('ResultListController', function($scope, resultFactory) {
    $scope.$on('resultsUpdated', function() {
	$scope.results = results;
    });
});

searchApp.controller('ResultInfoController', function($scope, resultFactory) {
    $scope.$on('resultInfoUpdated', function() {
	$scope.info = resultInfo;
    });
});

