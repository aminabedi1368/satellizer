angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $location, $auth, toastr) {
    $scope.login = function() {
        console.log($scope.user);
        var payload = {
            'username': $scope.user.username,
            'password': $scope.user.password,
            'grant_type': 'password',
            'client_id': 'client_id',
            'client_secret': 'client_secret'
        };

        var loginOptions = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        $auth.login(payload, loginOptions).then(function(payload) {
          toastr.success('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data, error.status);
          //token not verify
          if(error.status==403)
          {
              $location.path('/verification');
              $scope.$broadcast('verification',$scope.user.username);
          }
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            toastr.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
  });
