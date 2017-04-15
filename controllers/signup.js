angular.module('MyApp')
  .controller('SignupCtrl', function($scope, $location, $auth, toastr) {
    $scope.signup = function() {
        console.log($scope.user);
      $auth.signup($scope.user)
        .then(function(response) {
         // $auth.setToken(response);
          $location.path('/verification');
          toastr.info('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
  });