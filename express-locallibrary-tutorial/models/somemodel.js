// 文件：./models/somemodel.js

// Require Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string : String,
    a_date   : Date
});

// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('SomeModel', SomeModelSchema );