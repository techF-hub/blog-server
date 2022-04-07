var logger = require('morgan');
const fs = require('fs');
const path = require('path');
var FileStreamRotator = require('file-stream-rotator');
var logDirectory = path.join(__dirname, '../log');

module.exports = (app) => {
  //确保存储的路径存在 
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  // 创建输出流
  var errorLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD', //日期类型
    filename: path.join(logDirectory, '%DATE%-error.log'), //文件名
    frequency: 'daily', //每天的频率
    verbose: false
  });
  // 创建输出流
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, '%DATE%-access.log'),
    frequency: 'daily',
    verbose: false
  });
  //写正常访问请求的log日志
  app.use(logger(':date :remote-addr :method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }));
  //写访问出错的log日志
  app.use(logger(':date :remote-addr :method :url :status :res[content-length] - :response-time ms', {
    skip: function (req, res) {
      return res.statusCode < 400
    },
    stream: errorLogStream
  }));
}