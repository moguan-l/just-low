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

    //-根据id获取文字墙-
    justLowServices.factory('inputArrayByWallId', function($resource) {
        return $resource('inputs/searchByWallId', {wallId: '@wallId'});
    });

    //-在文字墙添加文字-
    justLowServices.factory('addInput', function($resource) {
        return $resource('inputs/add', {text: '@text', style: '@style', wall_id: '@wall_id', create_time: '@create_time'});
    });

    //-编辑文字墙中的文字-
    justLowServices.factory('updateInput', function($resource) {
        return $resource('inputs/update', {_id: '@_id', text: '@text', style: '@style'});
    });

    //-删除文字墙中的文字-
    justLowServices.factory('deleteInput', function($resource) {
        return $resource('inputs/delete', {_id: '@_id'});
    });

    //-获取文字墙-
    justLowServices.factory('inputWallArray', function($resource) {
        return $resource('inputWalls/search');
    });

    //-删除文字墙-
    justLowServices.factory('deleteWall', function($resource) {
        return $resource('walls/delete', {_id: '@_id'});
    });
}();