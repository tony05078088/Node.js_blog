const env = process.env.NODE_ENV; // 環境變數

// 配置
let MYSQL_CONFIG;
let REDIS_CONFIG;

if (env === "dev") {
  MYSQL_CONFIG = {
    hotst: "localhost",
    user: "root",
    password: "tony05078088",
    port: "3306",
    database: "myblog",
  };
  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
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
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
};
