const handleUserRouter = (req, res) => {
  const method = req.method;

  //   登入
  if (method === "POST" && req.path === "/api/user/login") {
    return {
      msg: "這是登入接口",
    };
  }
};

module.exports = handleUserRouter;
