/**
 * Created by Seva on 27.07.2016.
 */

angular.module('auth', [])
    .component('auth', {
        templateUrl: 'templates/auth-template.html',
        controller: ['facebookApiSvc', '$scope',
            function authController(facebookApiSvc, $scope) {

                    $scope.login = facebookApiSvc.login;

            }]
    });

