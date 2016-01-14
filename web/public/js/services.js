/**
 * Created by liqingjie on 15/12/23.
 */
!function() {
    'use strict';

    var justLowServices = angular.module('justLowServices', ['ngResource']);

    //-实验工厂-
    justLowServices.factory('userList', function($resource) {
        return $resource('users/search');
    });

    //-获取文字墙所有文字-
    justLowServices.factory('inputArray', function($resource) {
        return $resource('inputs/search');
    });

    //-在文字墙添加文字-
    justLowServices.factory('addInput', function($resource) {
        return $resource('inputs/add', {text: '@text', style: '@style', create_time: '@create_time'});
    });
}();