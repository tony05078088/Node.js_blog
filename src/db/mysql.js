const mysql = require("mysql");

const { MYSQL_CONFIG } = require("../config/db");

// 創建連接obj
const con = mysql.createConnection(MYSQL_CONFIG);

// 開始連接
con.connect();

// 統一執行sql函數
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  exec,
};
