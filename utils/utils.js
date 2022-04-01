// 数据库配置
const dbConfig = require('../config/db')
// 引入mysql
var mysql = require('mysql');
// 使用连接池，提升性能
var pool = mysql.createPool(dbConfig);

module.exports = {
  json(res, result, options={}) {
    let resjson = {
      code: 200,
      message: '操作成功',
      result,
      success: true,
      timestamp: new Date().getTime()
    }
    if (typeof result === 'undefined') {
      resjson = Object.assign({}, resjson, {
        code: 1,
        message: '操作失败',
        result: null,
        success: false
      })
    }
    res.json(Object.assign({}, resjson, options));
  },
  query(sql, callback) {
    pool.getConnection(function(err, connection) {
      if(err) {
        console.log('err ==>', err)
      }
      connection.query(sql, function(error, result) {
        if(error) {
          callback();
          console.log('error ==>', error)
        }else {
          callback(result);
        }
        //释放链接
        connection.release();
      });
    });
  },
  queryArgs(sql, args, callback) {
    const _this = this;
    pool.getConnection(function(err, connection) {
      if(err) {
        console.log('err ==>', err)
      }
      connection.query(sql, args, function(error, result) {
        if(error) {
          callback();
          console.log('error ==>', error)
        }else {
          callback(result);
        }
        //释放链接
        connection.release();
      });
    });
  }
}