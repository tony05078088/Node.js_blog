const env = process.env.NODE_ENV; // 環境變數

// 配置
let MYSQL_CONFIG;

if (env === "dev") {
  MYSQL_CONFIG = {
    hotst: "localhost",
    user: "root",
    password: "tony05078088",
    port: "3306",
    database: "myblog",
  };
}

if (env === "production") {
  MYSQL_CONFIG = {
    hotst: "localhost",
    user: "root",
    password: "tony05078088",
    port: "3306",
    database: "myblog",
  };
}

module.exports = {
  MYSQL_CONFIG,
};
