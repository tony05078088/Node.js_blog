const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const serverHandle = (req, res) => {
  // 設置返回格式
  res.setHeader("Content-type", "application/json");

  // 處理path
  const url = req.url;
  req.path = url.split("?")[0];
  // 處理blog路由
  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }
  // 處理user路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }
  // 未命中,回傳404
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 Not Found\n");
  res.end();
};

module.exports = serverHandle;
// process.env.NODE_ENV
