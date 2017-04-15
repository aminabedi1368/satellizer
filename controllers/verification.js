/**
 * Created by aminabedi on 4/13/2017 AD.
 */
angular.module('MyApp')
    .controller('verificationCtrl', function($scope, $location, $auth, toastr,$http) {
        $scope.$on('verification', function (event,data) {
            $scope.verify = data;
            console.log("$scope.verify",$scope.verify);
        });

        $scope.verification = function() {

            var url='oautserver/api/verifyIdentifier';
            $http({
                url: url,
                method: "POST",
                data: {
                    'mobile' : $scope.verify,
                    'email' : $scope.mobile,
                    'token': $scope.verificationCode
                },
                headers: {

                    'Accept':'application/json'
                }
            }).then(function(response){
                console.log(response);
            }, function(error){
                console.log(error);
            });



        };


    });
