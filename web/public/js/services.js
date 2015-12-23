/**
 * Created by liqingjie on 15/12/23.
 */
angular.module('justLowServices', ['ngResource'])
    .factory('userList', function($resource) {
        return $resource('users/search', {}, {
            query: {method: 'get', isArray: true}
        });
    });
