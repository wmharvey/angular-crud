angular.module( 'controllers' ).controller( 'ListCtrl', [ '$scope', '$http',
	function( $scope, $http ) {
		$http.get( '/api/restaurants' ).then( function( res ) {
			$scope.restaurants = res.data;
		});

		$scope.expand = function (restaurant, index) {
			restaurant.show = !restaurant.show;
			restaurant.index = index;
		};

		$scope.addRestaurant = function (city, name, address) {
			$http.post('/api/restaurants', {city, name, address}).then( res => {
				$scope.restaurants.push(res.data);
				$scope.city = '';
				$scope.name = '';
				$scope.address = '';
			});
		};
	}]
);
