const querystring = require("querystring");
const { get, set } = require("./src/db/redis");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getCookieExpire = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log(d.toGMTString());
  return d.toGMTString();
};
// session數據
// const SESSION_DATA = {};

// 用於處理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  // 設置返回格式
  res.setHeader("Content-type", "application/json");

  // 處理path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    console.log(key, val);
    req.cookie[key] = val;
  });

  // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userid;
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   }
  // } else {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  // }
  // req.session = SESSION_DATA[userId];

  //  解析session (使用redis)
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    //  初始化 redis中的 session值
    set(userId, {});
  }
  //  獲取session
  req.sessionId = userId;
  get(req.sessionId)
    .then((seessionData) => {
      if (seessionData == null) {
        // 初始化 redis中的 session值
        set(req.sessionId, {});
        // 設置 session
        req.session = {};
      } else {
        req.session = seessionData;
      }
      console.log("req.session", req.session);

      // 處理postData
      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;

      // 處理blog路由
      // const blogData = handleBlogRouter(req, res);
      // if (blogData) {
      //   res.end(JSON.stringify(blogData));
      //   return;
      // }
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId};path=/; httpOnly; expires=${getCookieExpire()}`
            );
          }
          res.end(JSON.stringify(blogData));
        }),
          (errData) => {
            res.end(JSON.stringify(errData));
          };
        return;
      }

      // 處理user路由
      // const userData = handleUserRouter(req, res);
      // if (userData) {
      //   res.end(JSON.stringify(userData));
      //   return;
      // }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId};path=/; httpOnly; expires=${getCookieExpire()}`
            );
          }
          res.end(JSON.stringify(userData));
        });
        return;
      }

      // 未命中,回傳404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
    });
};

module.exports = serverHandle;
// process.env.NODE_ENV
