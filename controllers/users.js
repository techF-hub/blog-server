const mysql = require('mysql')
const { json, query, queryArgs } = require('../utils/utils')

module.exports = {
  index(req, res, next) {
    const sql = `SELECT * from user`;
    query(sql, (result) => {
      json(res, result)
    })
  },
  add(req, res, next) {
    const sql = `INSERT INTO user(username,password,name) VALUES (?,?,?)`;
    const { body, baseUrl, originalUrl, params, query } = req;
    const {username,password,name} = body
    queryArgs(sql,[username,password,name],(result) => {
      json(res, result)
    })
  },
  update(req, res, next) {
    const sql = `UPDATE user SET username=?, password=?, name=? WHERE id=?`;
    const { body, baseUrl, originalUrl, params, query } = req;
    const {id,username,password,name} = body
    queryArgs(sql,[username,password,name,id],(result) => {
      json(res, result)
    })
  },
  delete(req, res, next) {
    const sql = `DELETE FROM user WHERE id=?`;
    const { body, baseUrl, originalUrl, params, query } = req;
    const {id} = body
    queryArgs(sql,[id],(result) => {
      json(res, result)
    })
  },
}