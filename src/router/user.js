const { login } = require("../controller/user");
const { SuccessModel, ErrorModal } = require("../model/resModel");

// 獲取cookie的過期時間
const getCookieExpire = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log(d.toGMTString());
  return d.toGMTString();
};

const handleUserRouter = (req, res) => {
  const method = req.method;

  //   登入
  if (method === "GET" && req.path === "/api/user/login") {
    // const { username, password } = req.body;
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((data) => {
      if (data.username) {
        // 操作cookie
        res.setHeader(
          "Set-Cookie",
          `username=${
            data.username
          };path=/; httpOnly; expires=${getCookieExpire()}`
        );

        return new SuccessModel();
      } else {
        return new ErrorModal("登入失敗");
      }
    });
  }

  // 登入驗證測試
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel());
    }
    return Promise.resolve(new ErrorModal("尚未登入"));
  }
};

module.exports = handleUserRouter;
