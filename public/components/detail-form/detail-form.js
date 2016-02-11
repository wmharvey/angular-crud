angular.module( 'controllers' ).directive( 'detailform', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/detail-form/detail-form.html',
		controller: ['$scope', '$http', function( $scope, $http ) {
      $scope.city = $scope.myRestaurant.city;
      $scope.name = $scope.myRestaurant.name;
      $scope.address = $scope.myRestaurant.address;
      $scope.editRestaurant = function(id, city, name, address) {
        $http.patch('/api/restaurants/' + id, {
          city: city,
          name: name,
          address: address
        }).then(res => {
          $scope.myRestaurant.city = res.data.city;
          $scope.myRestaurant.name = res.data.name;
          $scope.myRestaurant.address = res.data.address;
          $scope.restaurant.name = res.data.name;
          $scope.status.editing = false;
        });
      };
      $scope.cancelEdit = function() {
        $scope.status.editing = false;
      };
		}]
	}
});
