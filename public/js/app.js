var app = angular.module('app', ['ui.router', 'controllers']);
angular.module('controllers', []);
app.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
		.state('home', {
			url: '/home',
      templateUrl: 'home.html'
		})
		.state('locationList', {
      url: '/locations',
			templateUrl: 'components/location-list/location-list.html',
			controller: 'ListCtrl'
		})
}]);
