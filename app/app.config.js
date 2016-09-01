'use strict';

angular
    .module('myApp')
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$facebookProvider','$locationProvider'];
run.$inject = ['$rootScope'];

function config($routeProvider, $facebookProvider, $locationProvider) {
    $facebookProvider
        .setAppId("333688740303109");
    $facebookProvider
        .setPermissions("email,public_profile, user_posts, publish_actions, user_photos");

    $facebookProvider.setCustomInit({

        cookie: true

    });

    $routeProvider
        .when('/auth', {
            template: '<auth></auth>'
        })
        .when('/albums', {
            template: '<albums></albums>'
        })
        .when('/album/:albumId/:albumName/', {
            template: '<album></album>'
        })
        .when('/photo/:imgId/:imgCreatedTime/:albumName/:albumId/', {
            template: '<photo></photo>'
        })
        .when('/upload/', {
            template: '<upload></upload>'
        })
        .otherwise('/auth');
        }

function run($rootScope) {
    // Code from FBook JS SDK
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
