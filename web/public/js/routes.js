/**
 * Created by liqingjie on 15/12/23.
 */
var JustLow = angular.module('JustLow', ['ngRoute', 'justLowServices']);
JustLow.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('users/search', {
            controller: 'testctrl'
        })
        .otherwise({redirectTo: '/'});
}]);