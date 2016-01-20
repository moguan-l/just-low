/**
 * Created by LQJ on 2015/10/9.
 */
var express = require('express');
var router = express.Router();

//-页面路由-
router.get(/^\/$|^\/index/, function(req, res) {
    res.render('index', {title: 'JustLow'});
});

//-数据请求路由-
//-test-
router.get('/users/search', function(req, res) {
    var users = require('../services/users');
    users.getUsersOnPages({
        pageIndex: 0,
        pageSize: 10
    }, function(err, data) {
        res.json(data);
    });
});

//-首页文字墙获取-
router.get('/inputs/search', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.getInputs(function(err, data) {
        res.json(data);
    });
});

//-文字墙添加文字-
router.post('/inputs/add', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.addInput(req.query, function(err, data) {
        res.json({
            ok: err ? false : true,
            data: data
        });
    });
});

//-编辑文字墙中的文字-
router.post('/inputs/update', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.updateInput(req.query, function(err) {
        res.json({
            ok: err ? false : true
        });
    });
});

//-删除文字墙中的文字-
router.delete('/inputs/delete', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.deleteInput(req.query, function(err) {
        res.json({
            ok: err ? false : true
        });
    });
});

module.exports = router;