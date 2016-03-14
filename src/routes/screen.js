/**
 * Created by LQJ on 2015/10/9.
 */
var express = require('express');
var router = express.Router();

//-页面路由-
//-首页-
router.get(/^\/$|^\/index/, function(req, res) {
    res.render('index', {title: 'JustLow'});
});

//-文字墙列表页面-
router.get('/walls', function(req, res) {
    res.render('inputWalls', {title: '文字墙'});
});

//-文字墙页面-
router.get('/walls/:wallName', function(req, res) {
    var wallName = req.params.wallName;
    if(!wallName) {
        res.render('index', {title: 'JustLow'});
        return false;
    }
    wallName = encodeURI(wallName);
    var inputsWalls = require('../services/inputWalls');
    inputsWalls.getInputWallByName(wallName, function(err, data) {
        if(data) {
            res.render('inputWall', {title: decodeURI(data.name), wallId: data._id});
        } else {
            var wallData = {
                name: wallName,
                create_time: new Date().getTime()
            };
            inputsWalls.addInputWall(wallData, function(err, data) {
                if(!err) {
                    res.render('inputWall', {title: decodeURI(data.name), wallId: data._id});
                }
            });
        }
    });
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

//-根据id获取文字墙-
router.get('/walls/inputs/searchByWallId', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.getInputsByWallId(req.query.wallId, function(err, data) {
        res.json(data);
    });
});

//-文字墙添加文字-
router.post('/walls/inputs/add', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.addInput(req.query, function(err, data) {
        res.json({
            ok: err ? false : true,
            data: data
        });
    });
});

//-编辑文字墙中的文字-
router.post('/walls/inputs/update', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.updateInput(req.query, function(err) {
        res.json({
            ok: err ? false : true
        });
    });
});

//-删除文字墙中的文字-
router.delete('/walls/inputs/delete', function(req, res) {
    var inputs = require('../services/inputs');
    inputs.deleteInput(req.query, function(err) {
        res.json({
            ok: err ? false : true
        });
    });
});

//-获取文字墙-
router.get('/inputWalls/search', function(req, res) {
    var inputWalls = require('../services/inputWalls');
    inputWalls.getInputWalls(function(err, data) {
        res.json(data);
    });
});

//-删除文字墙-
router.delete('/walls/delete', function(req, res) {
    var inputWalls = require('../services/inputWalls');
    inputWalls.deleteInputWall(req.query, function(err) {
        res.json({
            ok: err ? false : true
        });
    });
});

module.exports = router;