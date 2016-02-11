angular.module( 'controllers' ).directive( 'detail', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/location-detail/location-detail.html',
		controller: ['$scope', '$http', function( $scope, $http ) {
			$scope.myRestaurant = null;
			$scope.status = {};
			$scope.status.editing = false;
			$http.get( '/api/restaurants/' + $scope.restaurant.id).then( function( res ) {
				$scope.myRestaurant = res.data;
			});

			$scope.delete = function (restaurant) {
				$http.delete('/api/restaurants/' + $scope.restaurant.id).then( res => {
					$scope.restaurants.splice($scope.restaurant.index, 1);
				});
			}
		}]
	}
});
