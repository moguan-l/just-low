/**
 * Created by liqingjie on 15/12/16.
 */
var dbConf = require('./database.json');
var mongoose = require('mongoose');
mongoose.connect(dbConf.protocol + '://' + dbConf.user + ':' + dbConf.password + '@' + dbConf.host + ':' + dbConf.port + '/' + dbConf.dbName);
var db = mongoose.connection;

db.on('error', function(error) {
    console.error('mongoDB连接失败，错误信息：' + error);
});
db.once('connected', function() {
    console.info('mongoDB打开连接');
});
db.once('disconnected', function() {
    console.info('mongoDB断开连接');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        process.exit(0);
    });
});