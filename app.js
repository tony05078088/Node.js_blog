const serverHandle = (req, res) => {
  // 設置返回格式
  res.setHeader("Content-type", "application/json");

  const resData = {
    name: "林威廉",
    site: "imooc",
    env: process.env.NODE_ENV,
  };

  res.end(JSON.stringify(resData));
};

module.exports = serverHandle;
