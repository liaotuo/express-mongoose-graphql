// 导入 mongoose 模块
const mongoose = require('mongoose');

// 定义一个模式
var Schema = mongoose.Schema;


// 设置默认 mongoose 连接
const mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));


// 测试插入数据

var SomeModelSchema = new Schema({
    name: String
});
// 使用模式“编译”模型
const SomeModel = mongoose.model('SomeModel', SomeModelSchema);

// 创建一个 SomeModel 模型的实例
const awesome_instance = new SomeModel({ name: '牛人2' });

// 传递回调以保存这个新建的模型实例
awesome_instance.save( function (err) {
    if (err) {
        return handleError(err);
    } // 已保存
});

// 测试查询数据

// SELECT name = 牛人
SomeModel.find(
    { 'name': '牛人2' },
    'name',
    function (err, some) {
        console.log(some);
        if (err) {
            return handleError(err);
        } // 'athletes' 中保存一个符合条件的运动员的列表
    }
);