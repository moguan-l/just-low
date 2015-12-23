/**
 * Created by liqingjie on 15/12/18.
 */
var users = require('../models/users');
var tools = require('./core/tools');

var _getUsersOnPages = function(query, callback) {
    var _query = tools.extendObj({
        pageIndex: 0,
        pageSize: 0
    }, query);

    users.find()
        .skip(_query.pageIndex * _query.pageSize)
        .limit(_query.pageSize)
        .exec(typeof callback == 'function' ? callback : null);
};

exports.getUsersOnPages = _getUsersOnPages;