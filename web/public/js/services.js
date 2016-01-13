/**
 * Created by liqingjie on 15/12/23.
 */
var justLowServices = angular.module('justLowServices', ['ngResource']);

justLowServices.factory('userList', function($resource) {
    return $resource('users/search', {}, {
        query: {method: 'get', isArray: true}
    });
});

justLowServices.factory('inputArray', function($resource) {
    return $resource('inputs/search', {}, {
        search: {method: 'get', isArray: true}
    });
});
