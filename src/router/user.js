const { Checklogin } = require("../controller/user");
const { SuccessModel, ErrorModal } = require("../model/resModel");
const handleUserRouter = (req, res) => {
  const method = req.method;

  //   登入
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = Checklogin(username, password);
    return result.then((data) => {
      if (data.username) {
        return new SuccessModel();
      } else {
        return new ErrorModal("登入失敗");
      }
    });
  }
};

module.exports = handleUserRouter;
